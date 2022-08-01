import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-coindetail',
  templateUrl: './coindetail.component.html',
  styleUrls: ['./coindetail.component.scss'],
})
export class CoindetailComponent implements OnInit {
  coinId!: string;
  coinData: any;
  days: number = 1;
  currency: string = 'USD';

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((value) => {
      this.coinId = value['id'];
    });
    this.getCoinData();
  }

  getCoinData() {
    this.api.getCurrencyById(this.coinId).subscribe((res) => {
      this.coinData = res;
      console.log(this.coinData);
    });
  }
}
