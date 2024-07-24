import { Component, createEffect, createSignal, Show } from 'solid-js';
import UserDropdown from './UserDropdownMenu';
import { useUser } from '@/contexts/userContext';

const Header: Component = () => {
  const { user } = useUser(); // get the user context

  return (
    <header class="bg-zinc-800 flex justify-between items-center p-2 w-full text-white h-[60px] sticky top-0 z-10">
      <h1>Kwantis Lunch Picker</h1>
      <UserDropdown />
    </header>
  );
};

export default Header;
