import { useNavigate } from '@solidjs/router';
import { createEffect } from 'solid-js';
import { useSupabase } from 'solid-supabase';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import {
  TextField,
  TextFieldDescription,
  TextFieldRoot,
} from '../components/ui/textfield';
import { Button } from '../components/ui/button';
import { useUser } from '@/contexts/userContext';

const Login = () => {
  const navigate = useNavigate(); // navigate to different routes

  const { user, login } = useUser(); // get the user context

  createEffect(() => {
    checkIfLogged();
  });

  const checkIfLogged = async () => {
    console.log(user());
    if (user()) {
      navigate('/', { replace: true });
    }
  };

  const loginUser = async (e: Event) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const loginRes = await login(email, password);
    console.log(loginRes);
    if (loginRes.result === 'success') {
      navigate('/', { replace: true });
    }
  };

  return (
    <div class="w-full h-full flex justify-center items-center">
      <Card class="w-[380px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => loginUser(e)} class="flex flex-col gap-4">
            <TextFieldRoot>
              <TextFieldDescription>Email</TextFieldDescription>
              <TextField type="email" required name="email" />
            </TextFieldRoot>
            <TextFieldRoot>
              <TextFieldDescription>Password</TextFieldDescription>
              <TextField type="password" required name="password" />
            </TextFieldRoot>
            <Button type="submit">Login</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
