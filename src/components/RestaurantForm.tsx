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

interface RestaurantFormProps {
  onSubmit: (formState: FormState) => void;
}

const RestaurantForm = (props: RestaurantFormProps) => {
  const [formState, setFormState] = createStore<FormState>({
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
  });

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
    <form
      class="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit(unwrap(formState));
      }}
    >
      <h2 class="text-xl"> Create new restaurant </h2>
      <TextFieldRoot>
        <TextFieldLabel>Name</TextFieldLabel>
        <TextField
          name="name"
          type="text"
          required
          value={formState.name}
          onChange={updateFormState('name')}
        ></TextField>
      </TextFieldRoot>

      <TextFieldRoot>
        <TextFieldLabel for="bookability">Bookability</TextFieldLabel>
        <Select
          id="bookability"
          name="bookability"
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

      <TextFieldRoot>
        <TextFieldLabel>Distance</TextFieldLabel>
        <Select
          name="distance"
          value={formState.distance}
          onChange={updateFormState('distance')}
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

      <TextFieldRoot>
        <TextFieldLabel>Food Quality</TextFieldLabel>
        <Select
          name="food_quality"
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

      <TextFieldRoot>
        <TextFieldLabel>Location</TextFieldLabel>
        <Select
          name="location"
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

      <TextFieldRoot>
        <TextFieldLabel>Plentiness</TextFieldLabel>
        <Select
          name="plentiness"
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

      <TextFieldRoot>
        <TextFieldLabel>Price</TextFieldLabel>
        <Select
          name="price"
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

      <TextFieldRoot>
        <TextFieldLabel>Service Quality</TextFieldLabel>
        <Select
          name="service_quality"
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

      <TextFieldRoot>
        <TextFieldLabel>Time Back and Forth</TextFieldLabel>
        <TextField
          name="time_back_and_forth"
          value={formState.time_back_and_forth}
          onChange={updateFormState('time_back_and_forth')}
          type="number"
        ></TextField>
      </TextFieldRoot>

      <TextFieldRoot>
        <TextFieldLabel>Variety</TextFieldLabel>
        <Select
          name="variety"
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

      <TextFieldRoot>
        <TextFieldLabel for="has_vegetarian_options-input">
          Has Vegetarian Options
        </TextFieldLabel>
        <Checkbox
          id="has_vegetarian_options"
          name="has_vegetarian_options"
          checked={formState.has_vegetarian_options}
          onChange={updateFormState('has_vegetarian_options')}
        >
          <CheckboxControl />
        </Checkbox>
      </TextFieldRoot>

      <TextFieldRoot>
        <TextFieldLabel>Google Maps Link</TextFieldLabel>
        <TextArea
          name="google_maps_link"
          value={formState.google_maps_link}
          onChange={updateFormState('google_maps_link')}
        ></TextArea>
      </TextFieldRoot>

      <TextFieldRoot>
        <TextFieldLabel>Menu Link</TextFieldLabel>
        <TextArea
          name="menu_link"
          value={formState.menu_link}
          onChange={updateFormState('menu_link')}
        ></TextArea>
      </TextFieldRoot>

      <Button type="submit">Submit</Button>
    </form>
  );
};
export default RestaurantForm;
