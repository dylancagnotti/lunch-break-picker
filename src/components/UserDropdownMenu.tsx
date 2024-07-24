import type { DropdownMenuSubTriggerProps } from '@kobalte/core/dropdown-menu';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import UserIcon from './icons/UserIcon';
import { useNavigate } from '@solidjs/router';
import { useUser } from '@/contexts/userContext';
import { Show } from 'solid-js';

const UserDropdown = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const logOut = async () => {
    const logoutRes = await logout();

    if (logoutRes.result === 'success') {
      navigate('/login', { replace: true });
    }
  };

  return (
    <DropdownMenu placement="bottom">
      <DropdownMenuTrigger
        as={(props: DropdownMenuSubTriggerProps) => (
          <Button variant="outline" class="text-black text-xl" {...props}>
            <UserIcon />
          </Button>
        )}
      />
      <DropdownMenuContent class="w-72">
        <DropdownMenuGroup>
          <DropdownMenuGroupLabel>My Account</DropdownMenuGroupLabel>
          <DropdownMenuSeparator />
          <Show
            when={user() !== null}
            fallback={
              <DropdownMenuItem>
                <Button
                  class="w-full"
                  onClick={() => {
                    navigate('/login', { replace: true });
                  }}
                >
                  Login
                </Button>
              </DropdownMenuItem>
            }
          >
            <DropdownMenuItem>
              <span>{user()?.email}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button class="w-full" onClick={logOut}>
                Logout
              </Button>
            </DropdownMenuItem>
          </Show>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
