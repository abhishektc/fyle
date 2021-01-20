import { BanksDetailsServiceService } from './../banks-details-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export interface Favourite {
  ifsc?: string;
  bank_name?: string;
  city?: string;
  branch?: string;
}

@Component({
  selector: 'app-view-bank-details',
  templateUrl: './view-bank-details.component.html',
  styleUrls: ['./view-bank-details.component.css']
})
export class ViewBankDetailsComponent implements OnInit {

  saveFavourite: Favourite = {};
  totalFavourite:any;
  ifsc:any;
  bank:any = {};
  isLoading = true;

  constructor(private bankService:BanksDetailsServiceService, private _route:ActivatedRoute) { }

  ngOnInit(): void {
    this.ifsc = this._route.snapshot.paramMap.get('id');
    this.bankService.getBankByIfsc(this.ifsc).subscribe(
      data => {
        this.bank = data.body.bank;
        if (data.ok) {
          this.isLoading = false;   
        }
      },
      err =>{
        console.log(err);
      }
    );

  }

  addFavourite(ifsc:any,name:any,city:any,branch:any){    
    this.saveFavourite.ifsc = ifsc;
    this.saveFavourite.bank_name = name;
    this.saveFavourite.city = city;
    this.saveFavourite.branch = branch;
    if(this.bankService.getFavourite(ifsc) == null){
      this.bankService.addToFavourite(this.saveFavourite);
      this.totalFavourite = sessionStorage.length;
      alert("Added to Favourite list Successfully")
    }else{
      alert("Already Exist");
    }
    
  }

}
