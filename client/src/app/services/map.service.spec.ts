import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MapService } from './map.service';
import { environment } from '../../environments/environment';
import { MapLayer } from '../models/map-layer';

describe('MapService', () => {
  let service: MapService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MapService]
    });
    service = TestBed.inject(MapService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve map layers', () => {
    const mockLayers: MapLayer[] = [
      { title: 'Layer 1', baseUrl: 'http://example.com', options: { layer: 'layer1', format: 'image/png', opacity: 1.0 } },
      { title: 'Layer 2', baseUrl: 'http://example2.com', options: { layer: 'layer2', format: 'image/png', opacity: 0.8 } },
    ];

    service.getLayers().subscribe(layers => {
      expect(layers).toEqual(mockLayers);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/map-layers`);
    expect(req.request.method).toBe('GET');
    req.flush(mockLayers);
  });

  // TBD: more tests as needed for error handling, edge cases, etc.
});
