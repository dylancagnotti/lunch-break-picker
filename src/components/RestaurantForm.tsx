import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { TextField, TextFieldLabel, TextFieldRoot } from './ui/textfield';
import { Checkbox, CheckboxControl } from './ui/checkbox';
import { TextArea } from './ui/textarea';
import { DOMElement } from 'solid-js/jsx-runtime';
import { Button } from './ui/button';
import { createStore, unwrap } from 'solid-js/store';

type FormState = {
  name: string;
  bookability: number;
  distance: number;
  food_quality: number;
  location: number;
  plentiness: number;
  price: number;
  service_quality: number;
  time_back_and_forth: number;
  variety: number;
  has_vegetarian_options: boolean;
  google_maps_link: string;
  menu_link: string;
};

export const emptyFormState: FormState = {
  name: '',
  bookability: 1,
  distance: 1,
  food_quality: 1,
  location: 1,
  plentiness: 1,
  price: 1,
  service_quality: 1,
  time_back_and_forth: 0,
  variety: 1,
  has_vegetarian_options: false,
  google_maps_link: '',
  menu_link: '',
};

interface RestaurantFormProps {
  name: string;
  onSubmit: (formState: FormState) => void;
  defaultValues?: FormState;
}

const RestaurantForm = ({
  name,
  onSubmit,
  defaultValues = emptyFormState,
}: RestaurantFormProps) => {
  const [formState, setFormState] = createStore<FormState>(defaultValues);

  const updateFormState =
    (fieldName: string) => (value: Event | number | string | boolean) => {
      if (value instanceof Event) {
        const target = value.target as HTMLInputElement;
        const casted =
          target.type === 'checkbox' ? target.checked : target.value;
        setFormState({
          [fieldName]: casted,
        });
      } else {
        setFormState({
          [fieldName]: value,
        });
      }
    };

  return (
    <>
      <h2 class="text-xl"> Create new restaurant </h2>
      <form
        class="flex sm:flex-wrap flex-col sm:flex-row gap-4"
        name={name}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(unwrap(formState));
        }}
      >
        <TextFieldRoot class="sm:w-[calc(50%-1rem)] w-full">
          <TextFieldLabel>Name</TextFieldLabel>
          <TextField
            name={`${name}-name`}
            id={`${name}-name`}
            type="text"
            required
            value={formState.name}
            onChange={updateFormState('name')}
          ></TextField>
        </TextFieldRoot>

        <TextFieldRoot class="sm:w-[calc(50%-1rem)] w-full">
          <TextFieldLabel for="bookability">Bookability</TextFieldLabel>
          <Select
            name={`${name}-bookability`}
            id={`${name}-bookability`}
            options={[1, 2, 3, 4, 5]}
            required
            value={formState.bookability}
            onChange={updateFormState('bookability')}
            itemComponent={(props) => (
              <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
            )}
          >
            <SelectTrigger>
              <SelectValue<string>>
                {(state) => state.selectedOption()}
              </SelectValue>
            </SelectTrigger>
            <SelectContent />
          </Select>
        </TextFieldRoot>

        <TextFieldRoot class="sm:w-[calc(50%-1rem)] w-full">
          <TextFieldLabel>Distance (km)</TextFieldLabel>
          <TextField
            name={`${name}-distance`}
            id={`${name}-distance`}
            value={formState.distance}
            onChange={updateFormState('distance')}
            required
          ></TextField>
        </TextFieldRoot>

        <TextFieldRoot class="sm:w-[calc(50%-1rem)] w-full">
          <TextFieldLabel>Food Quality</TextFieldLabel>
          <Select
            name={`${name}-food_quality`}
            id={`${name}-food_quality`}
            value={formState.food_quality}
            onChange={updateFormState('food_quality')}
            options={[1, 2, 3, 4, 5]}
            required
            itemComponent={(props) => (
              <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
            )}
          >
            <SelectTrigger>
              <SelectValue<string>>
                {(state) => state.selectedOption()}
              </SelectValue>
            </SelectTrigger>
            <SelectContent />
          </Select>
        </TextFieldRoot>

        <TextFieldRoot class="sm:w-[calc(50%-1rem)] w-full">
          <TextFieldLabel>Location</TextFieldLabel>
          <Select
            name={`${name}-location`}
            id={`${name}-location`}
            value={formState.location}
            onChange={updateFormState('location')}
            options={[1, 2, 3, 4, 5]}
            required
            itemComponent={(props) => (
              <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
            )}
          >
            <SelectTrigger>
              <SelectValue<string>>
                {(state) => state.selectedOption()}
              </SelectValue>
            </SelectTrigger>
            <SelectContent />
          </Select>
        </TextFieldRoot>

        <TextFieldRoot class="sm:w-[calc(50%-1rem)] w-full">
          <TextFieldLabel>Plentiness</TextFieldLabel>
          <Select
            name={`${name}-plentiness`}
            id={`${name}-plentiness`}
            value={formState.plentiness}
            onChange={updateFormState('plentiness')}
            options={[1, 2, 3, 4, 5]}
            required
            itemComponent={(props) => (
              <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
            )}
          >
            <SelectTrigger>
              <SelectValue<string>>
                {(state) => state.selectedOption()}
              </SelectValue>
            </SelectTrigger>
            <SelectContent />
          </Select>
        </TextFieldRoot>

        <TextFieldRoot class="sm:w-[calc(50%-1rem)] w-full">
          <TextFieldLabel>Price</TextFieldLabel>
          <Select
            name={`${name}-price`}
            id={`${name}-price`}
            value={formState.price}
            onChange={updateFormState('price')}
            options={[1, 2, 3, 4, 5]}
            required
            itemComponent={(props) => (
              <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
            )}
          >
            <SelectTrigger>
              <SelectValue<string>>
                {(state) => state.selectedOption()}
              </SelectValue>
            </SelectTrigger>
            <SelectContent />
          </Select>
        </TextFieldRoot>

        <TextFieldRoot class="sm:w-[calc(50%-1rem)] w-full">
          <TextFieldLabel>Service Quality</TextFieldLabel>
          <Select
            name={`${name}-service_quality`}
            id={`${name}-service_quality`}
            value={formState.service_quality}
            onChange={updateFormState('service_quality')}
            options={[1, 2, 3, 4, 5]}
            required
            itemComponent={(props) => (
              <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
            )}
          >
            <SelectTrigger>
              <SelectValue<string>>
                {(state) => state.selectedOption()}
              </SelectValue>
            </SelectTrigger>
            <SelectContent />
          </Select>
        </TextFieldRoot>

        <TextFieldRoot class="sm:w-[calc(50%-1rem)] w-full">
          <TextFieldLabel>Time Back and Forth</TextFieldLabel>
          <TextField
            name={`${name}-time_back_and_forth`}
            id={`${name}-time_back_and_forth`}
            value={formState.time_back_and_forth}
            onChange={updateFormState('time_back_and_forth')}
            type="number"
          ></TextField>
        </TextFieldRoot>

        <TextFieldRoot class="sm:w-[calc(50%-1rem)] w-full">
          <TextFieldLabel>Variety</TextFieldLabel>
          <Select
            name={`${name}-variety`}
            id={`${name}-variety`}
            value={formState.variety}
            onChange={updateFormState('variety')}
            options={[1, 2, 3, 4, 5]}
            required
            itemComponent={(props) => (
              <SelectItem item={props.item} value={props.item.rawValue}>
                {props.item.rawValue}
              </SelectItem>
            )}
          >
            <SelectTrigger>
              <SelectValue<string>>
                {(state) => state.selectedOption()}
              </SelectValue>
            </SelectTrigger>
            <SelectContent />
          </Select>
        </TextFieldRoot>

        <TextFieldRoot class="sm:w-[calc(50%-1rem)] w-full">
          <TextFieldLabel>Google Maps Link</TextFieldLabel>
          <TextArea
            name={`${name}-google_maps_link`}
            id={`${name}-google_maps_link`}
            value={formState.google_maps_link}
            onChange={updateFormState('google_maps_link')}
          ></TextArea>
        </TextFieldRoot>

        <TextFieldRoot class="sm:w-[calc(50%-1rem)] w-full">
          <TextFieldLabel>Menu Link</TextFieldLabel>
          <TextArea
            name={`${name}-menu_link`}
            id={`${name}-menu_link`}
            value={formState.menu_link}
            onChange={updateFormState('menu_link')}
          ></TextArea>
        </TextFieldRoot>

        <TextFieldRoot class="sm:w-[calc(50%-1rem)] w-full">
          <TextFieldLabel for="has_vegetarian_options-input">
            Has Vegetarian Options
          </TextFieldLabel>
          <Checkbox
            name={`${name}-has_vegetarian_options`}
            id={`${name}-has_vegetarian_options`}
            checked={formState.has_vegetarian_options}
            onChange={updateFormState('has_vegetarian_options')}
          >
            <CheckboxControl />
          </Checkbox>
        </TextFieldRoot>

        <div class="w-full">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </>
  );
};
export default RestaurantForm;
