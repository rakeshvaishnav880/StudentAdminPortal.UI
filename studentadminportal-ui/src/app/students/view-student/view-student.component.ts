import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../models/ui-models/student.model';
import { GenderService } from 'src/app/services/gender.service';
import { Gender } from '../models/ui-models/gender.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
 id : string| null | undefined;
  student : Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    genderId: '',
    profileImageUrl: '',
    gender: {
      id:'',
      discription:''
    },
    address: {
      id:'',
      physicalAddress:'',
      postalAddress:'',
      studentId:''
    }
  }

  genderList: Gender[] = [];
  constructor(private readonly studentService : StudentService,
    private readonly route:ActivatedRoute,
    private readonly genderService : GenderService,
    private snackbar: MatSnackBar
    ){}

  ngOnInit():void{
    this.route.paramMap.subscribe(
      (params)=>{
        this.id = params.get('id');
        if(this.id){
          this.studentService.getStudent(this.id)
          .subscribe(
             (successResponse)=>{
             this.student = successResponse;
            }
          );

          this.genderService.getGenderList()
          .subscribe(
            (successResponse)=>{
           this.genderList = successResponse;
           }
         );
        }
      }
      );

  }

  onUpdate():void{
    //Call Student servie to update student
    this.studentService.updateStudent(this.student.id,this.student)
    .subscribe(
      (successResponse)=>{
        console.log(successResponse);
        //Show a notification
        this.snackbar.open('Student updated successfully!',undefined,{
          duration:2000
        })
      },
      (errorResponse) => {
          //Log it
      }

    )
  }
}
