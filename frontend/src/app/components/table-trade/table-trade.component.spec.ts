import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTradeComponent } from './table-trade.component';
import { Order } from '@interfaces/order-book.interface';
import { DataTable, OrderHistory } from '@interfaces/portfolio.interface';

describe('CastomTableTradeComponent', () => {
  let component: TableTradeComponent<OrderHistory | DataTable>;
  let fixture: ComponentFixture<TableTradeComponent<OrderHistory | DataTable>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableTradeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      TableTradeComponent<OrderHistory | DataTable>
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
