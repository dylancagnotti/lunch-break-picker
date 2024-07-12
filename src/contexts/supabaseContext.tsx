import { SupabaseClient, User } from '@supabase/supabase-js';
import {
  Accessor,
  createContext,
  createEffect,
  createSignal,
  JSXElement,
  useContext,
} from 'solid-js';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const SupabaseContext = createContext<SupabaseClient<Database>>(supabase);

export const SupabaseProvider = (props: { children?: JSXElement }) => {
  return (
    <SupabaseContext.Provider value={supabase}>
      {props.children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = (): SupabaseClient<Database> => {
  return useContext(SupabaseContext);
};
