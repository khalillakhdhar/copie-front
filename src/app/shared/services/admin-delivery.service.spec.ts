import { TestBed } from '@angular/core/testing';

import { AdminDeliveryService } from './admin-delivery.service';

describe('AdminDeliveryService', () => {
  let service: AdminDeliveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminDeliveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
