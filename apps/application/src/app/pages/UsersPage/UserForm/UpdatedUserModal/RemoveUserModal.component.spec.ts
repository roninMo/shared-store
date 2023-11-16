import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoveUserModalComponent } from './RemoveUserModal.component';

describe('RemoveUserModalComponent', () => {
  let component: RemoveUserModalComponent;
  let fixture: ComponentFixture<RemoveUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveUserModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RemoveUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
