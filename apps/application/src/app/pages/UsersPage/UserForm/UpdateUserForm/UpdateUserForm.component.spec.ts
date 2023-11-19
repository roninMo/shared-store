import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateUserFormComponent } from './UpdateUserForm.component';
import { UserFormFactory } from '@shared-store/utilities';

describe('UpdateUserFormComponent', () => {
  let component: UpdateUserFormComponent;
  let fixture: ComponentFixture<UpdateUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateUserFormComponent, UserFormFactory],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
