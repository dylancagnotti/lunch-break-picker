import { User } from '@supabase/supabase-js';
import {
  Accessor,
  createContext,
  createEffect,
  createSignal,
  JSXElement,
  useContext,
} from 'solid-js';
import { useSupabase } from './supabaseContext';

interface UserContextProps {
  children?: JSXElement;
}

interface UserContextValue {
  user: Accessor<User | null>;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<LoginLogoutResult>;
  logout: () => Promise<LoginLogoutResult>;
}

export type LoginLogoutResult =
  | {
      result: 'success';
    }
  | {
      result: 'error';
      message: string;
    };

const UserContext = createContext<UserContextValue>({
  user: () => null,
  setUser: () => null,
  login: async () => ({ result: 'error', message: '' }),
  logout: async () => ({ result: 'error', message: '' }),
} as UserContextValue);

export const UserProvider = (props: UserContextProps) => {
  const supabase = useSupabase(); // get the supabase client

  const [user, setUser] = createSignal<User | null>(null);

  createEffect(async () => {
    const session = await supabase.auth.getUser();
    setUser(session?.data.user ?? null);
  });

  /**
   * logins the user to SUpabase
   * @param email email of the user
   * @param password password of the user
   * @returns the user object, null if error
   */
  const login = async (
    email: string,
    password: string
  ): Promise<LoginLogoutResult> => {
    console.log('login', email, password);
    console.log(user());
    if (!user()) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        alert(error.message);
        return { result: 'error', message: error.message };
      }
      if (data) {
        setUser(data.user);
        return { result: 'success' };
      }
    }
    return { result: 'error', message: 'User already logged in' };
  };

  const logout = async (): Promise<LoginLogoutResult> => {
    const res = await supabase.auth.signOut();
    if (res.error) {
      return { result: 'error', message: res.error.message };
    }
    setUser(null);
    return { result: 'success' };
  };

  const contextValue = { user, setUser, login, logout };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export function useUser() {
  return useContext(UserContext);
}
