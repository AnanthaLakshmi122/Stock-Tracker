import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { StockQuote } from '../../../../model/stock.model';

@Component({
  selector: 'app-stockvalue',
  templateUrl: './stockvalue.component.html',
  styleUrls: ['./stockvalue.component.scss']
})
export class StockvalueComponent {
  @Input() public stockQuote: StockQuote | undefined;
  @Output() public onDeleteClicked: EventEmitter<string> = new EventEmitter();

  constructor(private router: Router) {}

  clear() {
    if (this.stockQuote) {
      this.onDeleteClicked.emit(this.stockQuote.base.symbol);
    }
  }
  onMove() {
    this.router.navigateByUrl('sentiment/' + this.stockQuote?.base.symbol);
  }
}

