import { TestBed, async, inject } from '@angular/core/testing';

import { CourseMemberGuard } from './course-member.guard';

describe('CourseMemberGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseMemberGuard]
    });
  });

  it('should ...', inject([CourseMemberGuard], (guard: CourseMemberGuard) => {
    expect(guard).toBeTruthy();
  }));
});
