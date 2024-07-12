/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';
import { Route, Router } from '@solidjs/router';
import Login from './pages/Login';
import Home from './pages/Home';
import { UserProvider } from './contexts/userContext';
import { SupabaseProvider } from './contexts/supabaseContext';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?'
  );
}

render(
  () => (
    <SupabaseProvider>
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
