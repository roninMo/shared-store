import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUserFormComponent } from './AddUserForm.component';

describe('AddUserFormComponent', () => {
  let component: AddUserFormComponent;
  let fixture: ComponentFixture<AddUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
