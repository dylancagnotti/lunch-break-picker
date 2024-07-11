import { Component, createEffect, createSignal, Show } from 'solid-js';
import { useSupabase } from 'solid-supabase';
import { useNavigate } from '@solidjs/router';
import { User } from '@supabase/supabase-js';
import UserDropdown from './UserDropdownMenu';
import { useUser } from '@/contexts/userContext';

const Header: Component = () => {
  const supabase = useSupabase(); // get the supabase client

  const { user } = useUser(); // get the user context

  return (
    <header class="bg-zinc-800 flex justify-between items-center p-2 w-full text-white">
      <h1>Supabase SolidJS</h1>

      <Show when={user() !== null} fallback={<></>}>
        <UserDropdown />
      </Show>
    </header>
  );
};

export default Header;
