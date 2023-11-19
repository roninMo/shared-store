import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormControlsComponent } from './FormControls.component';
import { ApiService, SubclassedFormBuilder } from '@shared-store/utilities';

describe('FormControlsComponent', () => {
  let component: FormControlsComponent;
  let fixture: ComponentFixture<FormControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormControlsComponent, SubclassedFormBuilder, HttpClientTestingModule],
      providers: [ApiService]
    }).compileComponents();

    fixture = TestBed.createComponent(FormControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
