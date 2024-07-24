import RestaurantsTable from '@/components/RestaurantsTable';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { TextFieldLabel, TextFieldRoot } from '@/components/ui/textfield';
import { useUser } from '@/contexts/userContext';
import { Button } from '@kobalte/core/button';
import { Tabs } from '@kobalte/core/tabs';
import { TextField } from '@kobalte/core/text-field';
import { useNavigate } from '@solidjs/router';
import { Component, createEffect } from 'solid-js';

const Home: Component = () => {
  return (
    <section class="w-full flex flex-col justify-start items-center min-h-full-no-header overflow-y-scroll">
      <Tabs defaultValue="findRestaurant" class="w-11/12 h-full p-4">
        <TabsList class="h-1/6">
          <TabsTrigger value="findRestaurant">Find a Restaurant</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
          <TabsIndicator />
        </TabsList>
        <TabsContent value="findRestaurant" class="h-5/6">
          <Card class="flex flex-col">
            <CardHeader>
              <CardTitle>Find Restaurant</CardTitle>
              <CardDescription>
                Use this section to find the best restaurant for today!
              </CardDescription>
            </CardHeader>
            <CardContent class="space-y-2">
              <TextFieldRoot class="space-y-1">
                <TextFieldLabel>Name</TextFieldLabel>
                <TextField />
              </TextFieldRoot>
              <TextFieldRoot class="space-y-1">
                <TextFieldLabel>Username</TextFieldLabel>
                <TextField />
              </TextFieldRoot>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="list">
          <Card class="flex flex-col">
            <CardHeader>
              <CardTitle>A list of all the restaurants.</CardTitle>
              <CardDescription>
                You can inspect the list of all the restaurants here.
              </CardDescription>
            </CardHeader>
            <CardContent class="space-y-2 flex flex-col justify-start items-center">
              <RestaurantsTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Home;
