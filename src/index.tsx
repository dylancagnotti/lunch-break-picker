/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';
import { Route, Router } from '@solidjs/router';
import { createClient } from '@supabase/supabase-js';
import { SupabaseProvider } from 'solid-supabase';
import Login from './pages/Login';
import Home from './pages/Home';
import { UserProvider } from './contexts/userContext';

const root = document.getElementById('root');

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?'
  );
}

render(
  () => (
    <SupabaseProvider client={supabase}>
      <UserProvider>
        <Router root={App}>
          <Route path="/" component={Home} />
          <Route path="/login" component={Login} />
        </Router>
      </UserProvider>
    </SupabaseProvider>
  ),
  root!
);
