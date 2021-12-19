import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
  
  userID: string ='';
  constructor(private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data =>{
    this.userID= data['id'];
    });

    if(this.userID){
       this.userService.deleteUser(this.userID).subscribe(data=>{
        this._snackBar.open("User deleted successfully");
     
       }, err=> {
        this._snackBar.open("Unable to delete the user");
       
       })


    }
  }

}
