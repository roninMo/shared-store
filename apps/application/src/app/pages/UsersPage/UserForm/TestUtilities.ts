/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AbstractControlOptions, FormControl } from "@angular/forms";
import { AddressForm, SubclassedFormControl, SubclassedFormGroup, User, UserForm, UserFormFactory, generateUser } from "@shared-store/utilities";



export const createMockUserFormFactory = (userFormData: Partial<User> = {}) => {
  const mockUserForm: SubclassedFormGroup<UserForm> = createMockUserForm(userFormData);
  return {
    onSave: () => {},
    updateAndRunBackendValidations: (control: SubclassedFormControl) => {},
    form: mockUserForm,
    buildForm: (values: any, c: AbstractControlOptions, g: AbstractControlOptions) => {},
    subclassedForm: mockUserForm,
    formValid: true
  };
}

export const createMockUserForm = (userFormData: Partial<User> = {}) => {
  const userData: User = generateUser(userFormData);

  return new SubclassedFormGroup<UserForm>({
    id: new FormControl(userData.id, { nonNullable: true }),
    name: new FormControl(userData.name, { nonNullable: true }),
    username: new FormControl(userData.username, { nonNullable: true }),
    email: new FormControl(userData.email, { nonNullable: true }),
    address: new SubclassedFormGroup<AddressForm>({
      street: new FormControl(userData.address.street, { nonNullable: true }),
      suite: new FormControl(userData.address.suite, { nonNullable: true }),
      city: new FormControl(userData.address.city, { nonNullable: true }),
      zipcode: new FormControl(userData.address.zipcode, { nonNullable: true }),
      geo: new SubclassedFormGroup<{lat: FormControl<string>; lng: FormControl<string>; }>({ 
        lat: new FormControl(userData.address.geo.lat, { nonNullable: true }), 
        lng: new FormControl(userData.address.geo.lng, { nonNullable: true }), 
      }),
    }),
    phone: new FormControl(userData.phone, { nonNullable: true }),
    website: new FormControl(userData.website, { nonNullable: true }),
    company: new SubclassedFormGroup<{ name: FormControl<string>; catchPhrase: FormControl<string>; bs: FormControl<string>; }>({ 
      name: new FormControl(userData.company.name, { nonNullable: true }), 
      catchPhrase: new FormControl(userData.company.catchPhrase, { nonNullable: true }), 
      bs: new FormControl(userData.company.bs, { nonNullable: true }), 
    }),
  });
}