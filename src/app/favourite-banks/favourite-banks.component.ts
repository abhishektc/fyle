import { BanksDetailsServiceService } from './../banks-details-service.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-favourite-banks',
  templateUrl: './favourite-banks.component.html',
  styleUrls: ['./favourite-banks.component.css']
})
export class FavouriteBanksComponent implements OnInit {
  displayedColumns: string[] = ['ifsc', 'bankName', 'city', 'branch', 'favourite', 'action'];
  dataSource;
  favourites: any = [];

  constructor(private bankService: BanksDetailsServiceService) { }

  ngOnInit(): void {
    for (let i = 0; i < sessionStorage.length; i++) {
      this.favourites.push(this.bankService.getFavourite(sessionStorage.key(i)));
    }
    this.dataSource = new MatTableDataSource(this.favourites)
  }

  deletefromFavourites(ifsc: any) {
    sessionStorage.removeItem(ifsc);
    for (let i = 0; i < this.favourites.length; i++) {
      if (ifsc === this.favourites[i].ifsc) {
        this.favourites.splice(i, 1);
      }
    }
    alert("Removed Successfully");
    this.dataSource = new MatTableDataSource(this.favourites)
  }

}
