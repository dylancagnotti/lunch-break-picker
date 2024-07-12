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
  const { user } = useUser();
  const navigate = useNavigate();

  createEffect(() => {
    if (!user()) {
      navigate('/login', { replace: true });
    }
  });

  return (
    <section class="w-full flex justify-center items-center h-no-header">
      <Tabs defaultValue="findRestaurant" class="w-11/12">
        <TabsList>
          <TabsTrigger value="findRestaurant">Find a Restaurant</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
          <TabsIndicator />
        </TabsList>
        <TabsContent value="findRestaurant">
          <Card class="h-[600px] flex flex-col justify-between">
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
          <Card class="h-[600px] flex flex-col justify-center">
            <CardHeader>
              <CardTitle>A list of all the restaurants.</CardTitle>
              <CardDescription>
                You can inspect the list of all the restaurants here.
              </CardDescription>
            </CardHeader>
            <CardContent class="space-y-2">
              <RestaurantsTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Home;
