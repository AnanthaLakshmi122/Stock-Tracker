import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockvalueComponent } from './stockvalue.component';

describe('StockvalueComponent', () => {
  let component: StockvalueComponent;
  let fixture: ComponentFixture<StockvalueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockvalueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockvalueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
