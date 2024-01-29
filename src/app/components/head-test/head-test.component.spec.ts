import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadTestComponent } from './head-test.component';

describe('HeadTestComponent', () => {
  let component: HeadTestComponent;
  let fixture: ComponentFixture<HeadTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeadTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
