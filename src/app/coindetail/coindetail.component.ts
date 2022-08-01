import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { ApiService } from '../service/api.service';
import { CurrencyService } from '../service/currency.service';

@Component({
  selector: 'app-coindetail',
  templateUrl: './coindetail.component.html',
  styleUrls: ['./coindetail.component.scss'],
})
export class CoindetailComponent implements OnInit {
  coinId!: string;
  coinData: any;
  days: number = 1;
  currency: string = 'thb';

  //Chart
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: `Price Trends`,
        backgroundColor: `rgba(148,159,177,0.2)`,
        borderColor: '#009688',
        pointBackgroundColor: '#009688',
        pointBorderColor: '#009688',
        pointHoverBackgroundColor: '#009688',
        pointHoverBorderColor: '#009688',
      },
    ],
    labels: [],
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1,
      },
    },
    scales: {},
    plugins: {
      legend: { display: true },
    },
  };
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) myLineChart!: BaseChartDirective;

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((value) => {
      this.coinId = value['id'];
    });

    this.currencyService.getCurrency().subscribe((value) => {
      this.currency = value;
      this.getCoinData();
      this.getGraphData(this.days);
    });
  }

  getCoinData() {
    this.api.getCurrencyById(this.coinId).subscribe((res) => {
      if (this.currency === 'usd') {
        res.market_data.current_price.thb = res.market_data.current_price.usd;
        res.market_data.market_cap.thb = res.market_data.market_cap.usd;
      }
      res.market_data.current_price.thb = res.market_data.current_price.thb;
      res.market_data.market_cap.thb = res.market_data.market_cap.thb;
      this.coinData = res;
      console.log(this.coinData);
    });
  }
  getGraphData(days: number) {
    this.days = days;
    this.api
      .getGraphicalCurrency(this.coinId, this.currency, days)
      .subscribe((res) => {
        // console.log(res);
        setTimeout(() => {
          this.myLineChart.update();
        }, 200);
        this.lineChartData.datasets[0].data = res.prices.map((a: any) => {
          return a[1];
        });
        this.lineChartData.labels = res.prices.map((a: any) => {
          let date = new Date(a[0]);
          let time =
            date.getHours() > 12
              ? `${date.getHours() - 12} : ${date.getMinutes()} PM`
              : `${date.getHours()} : ${date.getMinutes()} AM`;
          return this.days === 1 ? time : date.toLocaleDateString();
        });
      });
  }
}
