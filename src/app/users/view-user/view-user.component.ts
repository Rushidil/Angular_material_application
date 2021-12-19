import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  userID: string = '';
  userDetails: any;
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
       this.activatedRoute.params.subscribe(data =>{
        this.userID = data['id'];
        
       } )

       this.userService.viewuser(this.userID).subscribe(data => {
         this.userDetails= data;
       })
  }

}
