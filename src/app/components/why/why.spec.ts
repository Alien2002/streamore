import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Why } from './why';

describe('Why', () => {
  let component: Why;
  let fixture: ComponentFixture<Why>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Why],
    }).compileComponents();

    fixture = TestBed.createComponent(Why);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
