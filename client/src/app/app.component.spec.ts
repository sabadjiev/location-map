import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { AppComponent } from './app.component';
import { MapComponent } from "./map/map.component";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AppComponent, MapComponent],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const formBuilder: FormBuilder = TestBed.inject(FormBuilder);
    const expectedFormValues = { top: 0, bottom: 0 };

    expect(component.options instanceof FormGroup).toBeTruthy();
    expect(component.options.value).toEqual(expectedFormValues);
  });

  // Add more tests as needed for form controls, interactions, etc.
});
