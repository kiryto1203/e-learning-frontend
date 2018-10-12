import { TestBed } from '@angular/core/testing';

import { QuestionResolveServiceService } from './question-resolve-service.service';

describe('QuestionResolveServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionResolveServiceService = TestBed.get(QuestionResolveServiceService);
    expect(service).toBeTruthy();
  });
});
