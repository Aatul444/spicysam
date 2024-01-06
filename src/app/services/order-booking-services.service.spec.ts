import { TestBed } from '@angular/core/testing';

import { OrderBookingServicesService } from './order-booking-services.service';

describe('OrderBookingServicesService', () => {
  let service: OrderBookingServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderBookingServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
