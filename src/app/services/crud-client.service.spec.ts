import { TestBed } from '@angular/core/testing';

import { CrudClientService } from './crud-client.service';

describe('CrudClientService', () => {
  let service: CrudClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
