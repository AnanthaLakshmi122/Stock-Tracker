import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { StockQuote } from 'src/app/model/stock.model';
import { StockQuoteService } from 'src/app/service/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit, OnDestroy {
  stockValue: string = '';
  noDataFound: boolean = false;
  duplicate: boolean = false;

  selectedStock: StockQuote[] | undefined;

  private localStorageKey = 'company';
  constructor(private stockQuoteService: StockQuoteService) {}

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    this.setLocalStorage();
  }

  ngOnInit(): void {
    const setItemsinLocalstorage = localStorage.getItem(this.localStorageKey);
    if (setItemsinLocalstorage) {
      this.selectedStock = JSON.parse(setItemsinLocalstorage);
    }
  }

  ngOnDestroy(): void {
    this.setLocalStorage();
  }

  close(symbol: string): void {
    if (this.selectedStock) {
      this.selectedStock = this.selectedStock.filter(
        (x) => x.base.symbol !== symbol
      );
    }
  }

  onStockSearch(): void {
    if (this.stockValue) {
      this.noDataFound = false;
      this.duplicate = false;
      if (!this.duplicateValue()) {
        this.getSearchStock();
      } else {
        this.duplicate = true;
      }
    }
  }

  private setLocalStorage() {
    localStorage.removeItem(this.localStorageKey);
    if (this.selectedStock && this.selectedStock.length !== 0) {
      localStorage.setItem(
        this.localStorageKey,
        JSON.stringify(this.selectedStock)
      );
    }
  }

  private duplicateValue(): boolean {
    if (this.selectedStock && this.selectedStock.length !== 0) {
      let duplicate = this.selectedStock.find(
        (x) => x.base.symbol.toUpperCase() === this.stockValue.toUpperCase()
      );
      return !!duplicate;
    }
    return false;
  }

  private getSearchStock(): void {
    forkJoin({
      company: this.stockQuoteService.getCompanyName(this.stockValue),
      value: this.stockQuoteService.getCurrectData(this.stockValue),
    }).subscribe((result) => {
      if (result.company && result.value) {
        const findElement: StockQuote = {
          base: result.company,
          value: result.value,
        };
        this.selectedStock
          ? this.selectedStock.push(findElement)
          : (this.selectedStock = [findElement]);
        this.setLocalStorage();
      } else {
        this.noDataFound = true;
      }
    });
  }
}

