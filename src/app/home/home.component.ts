import { BanksDetailsServiceService } from './../banks-details-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface Favourite {
  ifsc?: string;
  bank_name?: string;
  city?: string;
  branch?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  cityControl = new FormControl();
  cityList: String[] = ['Bangalore', 'Mumbai', 'Pune', 'Delhi', 'Chennai', 'All'];

  result: any = {};
  displayedColumns: string[] = ['ifsc', 'bankName', 'city', 'branch', 'favourite', 'action'];
  dataSource:any = [];
  saveFavourite: Favourite = {};
  totalFavourite:any;
  isLoading = true;

  constructor(private bankService:BanksDetailsServiceService) { }

  @ViewChild(MatPaginator, {static: true}) paginators: MatPaginator;

  ngOnInit(): void {    
    this.bankService.getBankByAutoComplete('RTGS').subscribe(
      data => {
        this.result = data.body.banks;        
        this.dataSource = new MatTableDataSource(this.result)
        this.dataSource.paginator = this.paginators;
          
        if (data.ok) {
          this.isLoading = false;
        }  
      },
      err => {
        console.log(err);
      }
    );
  }

  changeCityController() {
    this.getBankByCity();
  }

  getBankByCity() {
    this.isLoading = true;
    this.bankService.getBankByCity(this.cityControl.value).subscribe(
      data => { 
        this.result = data.body.banks;
        this.dataSource = new MatTableDataSource(this.result)
        this.dataSource.paginator = this.paginators; 
        if (data.ok) {
          this.isLoading = false;
        }      
      },
      err => {
        console.log(err);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
