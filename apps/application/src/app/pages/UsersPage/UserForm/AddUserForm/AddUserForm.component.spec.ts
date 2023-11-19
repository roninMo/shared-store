import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUserFormComponent } from './AddUserForm.component';
import { ApiService, SubclassedFormBuilder, UserFormFactory, emptyUser, generateUser } from '@shared-store/utilities';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createMockUserFormFactory } from '../TestUtilities';

describe('AddUserFormComponent', () => {
  let component: AddUserFormComponent;
  let fixture: ComponentFixture<AddUserFormComponent>;
  const mockFormFactory: UserFormFactory = createMockUserFormFactory(generateUser(emptyUser)) as unknown as UserFormFactory;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserFormComponent, HttpClientTestingModule],
      providers: [SubclassedFormBuilder, ApiService]
    }).compileComponents();

    fixture = TestBed.createComponent(AddUserFormComponent);
    component = fixture.componentInstance;
    component.formFactory = mockFormFactory;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
