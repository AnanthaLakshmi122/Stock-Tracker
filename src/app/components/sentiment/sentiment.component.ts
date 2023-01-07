import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoryDetail } from '../../model/details.model';
import { StockQuoteService } from '../../service/stock.service';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.scss']
})
export class SentimentComponent  implements OnInit {
  public symbol: string;
  public values: HistoryDetail[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stockQuoteService: StockQuoteService) {
    this.symbol = route.snapshot.params['symbol']; }

  ngOnInit() {
    this.stockQuoteService.getStockinPeriod(this.symbol, 3).subscribe((x) => {
      if (x) {
        this.values = x;
      }
    });
  }

  onBack() {
    this.router.navigateByUrl('/');
  }
}

