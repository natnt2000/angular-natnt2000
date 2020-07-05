import { Component, OnInit } from '@angular/core';
import { HotelService } from '../hotel.service';
import { Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {
  hotelData = null;
  rooms = [];
  constructor(
    private hotelService: HotelService,
    private activeRoute: ActivatedRoute,
    private route: Router
  ) { }

  ngOnInit() {
   this.activeRoute.paramMap.subscribe(params => {
      let hotelId = params.get('hotelId');
      this.hotelService.getHotelById(hotelId).subscribe(data => {
        console.log(data);
        this.hotelData = data;
      });
      
      this.hotelService.getAllRoomInHotel(hotelId).subscribe(data => {
        console.log(data);
        this.rooms = data;
      })
    });
    

  }

  removeHotel(){
    let conf = confirm('Bạn chắc chắn muốn xóa khách sạn này?');
    if(conf){
      this.hotelService.removeHotelById(this.hotelData.id).subscribe(data => {
        this.route.navigate(['']);
      });
    }
  }

}