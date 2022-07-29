import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoindetailComponent } from './coindetail.component';

describe('CoindetailComponent', () => {
  let component: CoindetailComponent;
  let fixture: ComponentFixture<CoindetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoindetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoindetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
