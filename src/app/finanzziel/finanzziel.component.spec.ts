import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanzzielComponent } from './finanzziel.component';

describe('FinanzzielComponent', () => {
  let component: FinanzzielComponent;
  let fixture: ComponentFixture<FinanzzielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinanzzielComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinanzzielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
