import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  
  userID: any;
  userDetails: any;
  editUserForm: FormGroup= new FormGroup({});
  dataLoaded: boolean=false;
  

  constructor(private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.dataLoaded=false;
    this.activatedRoute.params.subscribe(data=>{
      this.userID=data['id'];
    });

    if(this.userID !== ''){
      //view user details
      this.userService.viewuser(this.userID)
      .toPromise()
      .then(data =>{
        this.userDetails=data;
        //Object.assign(this.userDetails,data);
        console.log(this.userDetails);

        //Build edit form
       this.editUserForm=this.formBuilder.group({
        'username': new FormControl(this.userDetails.name),
        'email': new FormControl(this.userDetails.email)
        //'phone': new FormControl(this.userDetails.name)
       })

       this.dataLoaded=true;

      })
      .catch(err=>{
        console.log(err);
      })
    }
  }

  updateUser(){
    this.userService.updateUser(this.userID,this.editUserForm.value).subscribe(data=>{
      this._snackBar.open("User Updated successfully");
    },  err=> {
      this._snackBar.open("Unable to update user");
    })


    
  }

}
