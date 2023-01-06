import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SentimentComponent } from './components/sentiment/sentiment.component';
import { StockComponent } from './components/stocks/stock.component';

const routes: Routes = [
  { path: 'sentiment/:symbol', component: SentimentComponent },
  { path: '**', component: StockComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
