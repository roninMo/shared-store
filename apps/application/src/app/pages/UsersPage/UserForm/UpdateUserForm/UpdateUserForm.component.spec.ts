import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateUserFormComponent } from './UpdateUserForm.component';
import { ApiService, SubclassedFormBuilder, UserFormFactory, emptyUser, generateUser } from '@shared-store/utilities';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createMockUserFormFactory } from '../TestUtilities';

describe('UpdateUserFormComponent', () => {
  let component: UpdateUserFormComponent;
  let fixture: ComponentFixture<UpdateUserFormComponent>;
  const mockFormFactory: UserFormFactory = createMockUserFormFactory(generateUser(emptyUser)) as unknown as UserFormFactory;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateUserFormComponent, HttpClientTestingModule],
      providers: [SubclassedFormBuilder, ApiService]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateUserFormComponent);
    component = fixture.componentInstance;
    component.formFactory = mockFormFactory;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
