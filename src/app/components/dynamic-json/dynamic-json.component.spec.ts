import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicJsonComponent } from './dynamic-json.component';

describe('DynamicJsonComponent', () => {
  let component: DynamicJsonComponent;
  let fixture: ComponentFixture<DynamicJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicJsonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
