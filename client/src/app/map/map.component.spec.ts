import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MapComponent } from './map.component';
import { MapService } from '../services/map.service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { of } from 'rxjs';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let mapServiceSpy: jasmine.SpyObj<MapService>;

  beforeEach(() => {
    mapServiceSpy = jasmine.createSpyObj('MapService', ['getLayers']);

    TestBed.configureTestingModule({
      declarations: [MapComponent],
      imports: [LeafletModule],
      providers: [
        { provide: MapService, useValue: mapServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch layers from MapService', waitForAsync(() => {
    const mapLayers = [
      { title: 'Layer 1', baseUrl: 'http://example.com', options: { layer: 'layer1', format: 'image/png', opacity: 1.0 } },
      { title: 'Layer 2', baseUrl: 'http://example2.com', options: { layer: 'layer2', format: 'image/png', opacity: 0.8 } },
    ];
    mapServiceSpy.getLayers.and.returnValue(of(mapLayers));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.mapLayers).toEqual(mapLayers);
      expect(mapServiceSpy.getLayers).toHaveBeenCalledOnceWith();
    });
  }));

  it('should initialize the form with default values', () => {
    fixture.detectChanges();

    const formValues = component.options;
    expect(formValues.layers).toEqual([component.osm, component.osmFR]);
    expect(formValues.zoom).toEqual(5);
    expect(formValues.center.lat).toEqual(39.828175);
    expect(formValues.center.lng).toEqual(-98.5795);
  });

  // Add more tests for other component methods and behaviors as needed
});
