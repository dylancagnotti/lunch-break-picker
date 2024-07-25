import { useSupabase } from '@/contexts/supabaseContext';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { createEffect, createSignal, For, Match, Show, Switch } from 'solid-js';
import { RestaurantSchema } from '@/types/supabase';
import { A } from '@solidjs/router';
import MapsIcon from './icons/MapsIcon';
import MenuIcon from './icons/MenuIcon';
import { Checkbox, CheckboxControl } from './ui/checkbox';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import { Button } from './ui/button';
import PlusIcon from './icons/PlusIcon';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { TextFieldRoot } from './ui/textfield';
import { TextArea } from './ui/textarea';
import RestaurantForm from './RestaurantForm';
import { toaster } from '@kobalte/core';
import {
  Toast,
  ToastContent,
  ToastProgress,
  ToastTitle,
} from '@/components/ui/toast';
import TrashIcon from './icons/TrashIcon';

const RestaurantsTable = () => {
  const supabase = useSupabase();
  const [restaurants, setRestaurants] = createSignal<RestaurantSchema[]>([]);

  const fetchRestaurants = async () => {
    const { data, error } = await supabase.from('restaurants').select();

    if (error) {
      console.error(error);
      return;
    }

    setRestaurants(data);
  };

  const addRestaurant = async (restaurant: Partial<RestaurantSchema>) => {
    const { error } = await supabase
      .from('restaurants')
      .insert([restaurant] as any);

    if (error) {
      console.error(error);
      if (error.code === '42501') {
        toaster.show((props) => (
          <Toast toastId={props.toastId}>
            <ToastContent>
              <ToastTitle>
                Only authenticated users can add new restaurants
              </ToastTitle>
            </ToastContent>
            <ToastProgress />
          </Toast>
        ));
      } else {
        toaster.show((props) => (
          <Toast toastId={props.toastId}>
            <ToastContent>
              <ToastTitle>An error occured.</ToastTitle>
            </ToastContent>
            <ToastProgress />
          </Toast>
        ));
      }
    } else {
      toaster.show((props) => (
        <Toast toastId={props.toastId}>
          <ToastContent>
            <ToastTitle>Restaurant added successfully</ToastTitle>
          </ToastContent>
          <ToastProgress />
        </Toast>
      ));
    }

    fetchRestaurants();
  };

  const updateRestaurant = async (restaurant: Partial<RestaurantSchema>) => {
    const { error } = await supabase
      .from('restaurants')
      .update(restaurant)
      .match({ id: restaurant.id });

    if (error) {
      console.error(error);
      toaster.show((props) => (
        <Toast toastId={props.toastId}>
          <ToastContent>
            <ToastTitle>An error occured.</ToastTitle>
          </ToastContent>
          <ToastProgress />
        </Toast>
      ));
    } else {
      toaster.show((props) => (
        <Toast toastId={props.toastId}>
          <ToastContent>
            <ToastTitle>Restaurant updated successfully</ToastTitle>
          </ToastContent>
          <ToastProgress />
        </Toast>
      ));
    }

    fetchRestaurants();
  };

  const deleteRestaurant = (id: number) => async () => {
    const { error } = await supabase.from('restaurants').delete().match({ id });

    if (error) {
      console.error(error);
      toaster.show((props) => (
        <Toast toastId={props.toastId}>
          <ToastContent>
            <ToastTitle>An error occured.</ToastTitle>
          </ToastContent>
          <ToastProgress />
        </Toast>
      ));
    } else {
      toaster.show((props) => (
        <Toast toastId={props.toastId}>
          <ToastContent>
            <ToastTitle>Restaurant deleted successfully</ToastTitle>
          </ToastContent>
          <ToastProgress />
        </Toast>
      ));
    }

    fetchRestaurants();
  };

  createEffect(() => {
    fetchRestaurants();
  });

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="text-center w-32">Name</TableHead>
          <TableHead class="text-center w-32">Distance (km)</TableHead>
          <TableHead class="text-center w-32">Price</TableHead>
          <TableHead class="text-center w-32">Average Time (minutes)</TableHead>
          <TableHead class="text-center w-32">Has Veggie Options</TableHead>
          <TableHead class="text-center w-32">Menu</TableHead>
          <TableHead class="text-center w-32">Maps Link</TableHead>
          <TableHead class="text-center w-32">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <For each={restaurants()}>
          {(restaurant) => (
            <TableRow>
              <TableCell>
                <HoverCard>
                  <HoverCardTrigger>
                    <div class="w-full flex justify-center font-bold">
                      <Dialog>
                        <DialogTrigger>
                          <span class="cursor-default p-1 border border-black rounded-sm hover:bg-slate-200 transition">
                            {restaurant.name}
                          </span>
                        </DialogTrigger>
                        <DialogContent class="max-h-[80%] overflow-y-auto max-w-[800px]">
                          <RestaurantForm
                            name={`update-${restaurant.id}`}
                            onSubmit={(formData) => {
                              updateRestaurant({
                                id: restaurant.id,
                                name: formData.name,
                                bookability: formData.bookability,
                                distance: formData.distance,
                                food_quality: formData.food_quality,
                                location: formData.location,
                                plentiness: formData.plentiness,
                                price: formData.price,
                                service_quality: formData.service_quality,
                                time_back_and_forth:
                                  formData.time_back_and_forth,
                                variety: formData.variety,
                                has_vegetarian_options:
                                  formData.has_vegetarian_options,
                                google_maps_link: formData.google_maps_link,
                                menu_link: formData.menu_link,
                              });
                            }}
                            defaultValues={{
                              name: restaurant.name,
                              bookability: restaurant.bookability ?? 1,
                              distance: restaurant.distance ?? 0,
                              food_quality: restaurant.food_quality ?? 1,
                              location: restaurant.location ?? 1,
                              plentiness: restaurant.plentiness ?? 1,
                              price: restaurant.price ?? 1,
                              service_quality: restaurant.service_quality ?? 1,
                              time_back_and_forth:
                                restaurant.time_back_and_forth ?? 0,
                              variety: restaurant.variety ?? 1,
                              has_vegetarian_options:
                                restaurant.has_vegetarian_options ?? false,
                              google_maps_link:
                                restaurant.google_maps_link ?? '',
                              menu_link: restaurant.menu_link ?? '',
                            }}
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent class="w-[300px]">
                    {Object.entries(restaurant).map(([key, value]) => (
                      <div class="flex justify-between w-full gap-2">
                        <span class="w-1/2">{key}: </span>
                        <span class="w-1/2 whitespace-nowrap text-ellipsis text-right overflow-hidden">
                          <Switch fallback={value ?? '-'}>
                            <Match when={typeof value === 'boolean'}>
                              {value ? 'Yes' : 'No'}
                            </Match>
                            <Match when={typeof value === 'string'}>
                              <Show
                                when={(value as string).length > 20}
                                fallback={value ?? '-'}
                              >
                                <TextFieldRoot class="w-50%">
                                  <TextArea
                                    rows={1}
                                    value={value as string}
                                  ></TextArea>
                                </TextFieldRoot>
                              </Show>
                            </Match>
                          </Switch>
                        </span>
                      </div>
                    ))}
                  </HoverCardContent>
                </HoverCard>
              </TableCell>
              <TableCell>
                <span class="w-full flex justify-center">
                  {restaurant.distance ?? '-'}
                </span>
              </TableCell>
              <TableCell>
                <span class="w-full flex justify-center">
                  {restaurant.price ?? '-'}
                </span>
              </TableCell>
              <TableCell>
                <span class="w-full flex justify-center">
                  {restaurant.time_back_and_forth ?? '-'}
                </span>
              </TableCell>
              <TableCell>
                {restaurant.has_vegetarian_options !== null ? (
                  <Checkbox
                    checked={restaurant.has_vegetarian_options}
                    class="w-full flex justify-center text-3xl"
                  >
                    <CheckboxControl />
                  </Checkbox>
                ) : (
                  <span class="w-full flex justify-center text-center">-</span>
                )}
              </TableCell>
              <TableCell>
                {restaurant.menu_link ? (
                  <A
                    target="_blank"
                    href={restaurant.menu_link}
                    class="w-full flex justify-center text-3xl hover:text-gray-500 transition-all"
                  >
                    <MenuIcon />
                  </A>
                ) : (
                  <span class="w-full flex justify-center text-center">-</span>
                )}
              </TableCell>
              <TableCell>
                {restaurant.google_maps_link ? (
                  <A
                    target="_blank"
                    href={restaurant.google_maps_link}
                    class="w-full flex justify-center text-3xl hover:text-gray-500  transition-all"
                  >
                    <MapsIcon />
                  </A>
                ) : (
                  <span class="w-full flex justify-center text-center">-</span>
                )}
              </TableCell>
              <TableCell>
                <span
                  onClick={deleteRestaurant(restaurant.id)}
                  class="w-full flex justify-center text-3xl hover:text-gray-500  transition-all"
                >
                  <TrashIcon />
                </span>
              </TableCell>
            </TableRow>
          )}
        </For>
      </TableBody>
      <TableFooter>
        <TableRow class="bg-white hover:bg-white border-t-2">
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell>
            <div class="w-full flex justify-center">
              <Dialog>
                <DialogTrigger>
                  <Button variant="default" class="text-xl">
                    <PlusIcon />
                  </Button>
                </DialogTrigger>
                <DialogContent class="max-h-[80%] overflow-y-auto max-w-[800px]">
                  <RestaurantForm
                    name={`add-restaurant`}
                    onSubmit={(formData) => {
                      addRestaurant({
                        name: formData.name,
                        bookability: formData.bookability,
                        distance: formData.distance,
                        food_quality: formData.food_quality,
                        location: formData.location,
                        plentiness: formData.plentiness,
                        price: formData.price,
                        service_quality: formData.service_quality,
                        time_back_and_forth: formData.time_back_and_forth,
                        variety: formData.variety,
                        has_vegetarian_options: formData.has_vegetarian_options,
                        google_maps_link: formData.google_maps_link,
                        menu_link: formData.menu_link,
                      });
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default RestaurantsTable;
