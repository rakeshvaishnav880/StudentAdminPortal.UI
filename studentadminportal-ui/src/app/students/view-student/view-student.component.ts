import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  studentid : string | null | undefined;
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
  };

  isNewStudent = false;
  header = '';
  genderList: Gender[] = [];
  constructor(private readonly studentService : StudentService,
    private readonly route:ActivatedRoute,
    private readonly genderService : GenderService,
    private snackbar: MatSnackBar,
    private router: Router
    ){}

  ngOnInit():void{
    this.route.paramMap.subscribe(
      (params)=>{
        this.studentid = params.get('id');
        if(this.router.routerState.snapshot.url  == '/students/add-newstudent')
        {

          this.isNewStudent = true;
          this.header = 'Add New Student';
        }
        else{
          // -> Exiting student functionality
          this.isNewStudent = false;
          this.header = 'Update Student';
        }
        this.genderService.getGenderList()
          .subscribe(
            (successResponse)=>{
           this.genderList = successResponse;
           }
         );
        if(this.studentid){
          this.studentService.getStudent(this.studentid)
          .subscribe(
             (successResponse)=>{
             this.student = successResponse;
            }
          );
        }
      }
      );
  }

  onUpdate():void{
    //Call Student service to update student
    this.studentService.updateStudent(this.student.id,this.student)
    .subscribe(
      (successResponse)=>{
        //console.log(successResponse);
        //Show a notification
        this.snackbar.open('Student updated successfully!',undefined,{
          duration:2000
        })
      },
      (errorResponse) => {
          //Log it
      }

    );
  }

  onDelete():void{
    //Call student service to delete student
    this.studentService.deleteStudent(this.student.id)
    .subscribe(
      (successResponse)=>{
        //console.log(successResponse);
        //Show a notification
        this.snackbar.open('Student deleted successfully!',undefined,{
          duration:2000
        });

        setTimeout(() => {
          this.router.navigateByUrl('students/get-allstudents');
        }, 2000);
      },
      (errorResponse) => {
          //Log it
      }
    );
  }

  onAdd():void{
 //Call student service to delete student
 this.studentService.addStudent(this.student)
 .subscribe(
  (successResponse)=>{
    //console.log(successResponse);
    //Show a notification
    this.snackbar.open('Student Added successfully!',undefined,{
      duration:2000
    });

    setTimeout(() => {
      this.router.navigateByUrl(`students/get-student/${successResponse.id}`);
    }, 2000);
  },
   (errorResponse) => {
       //Log it
   }
 );
}
}
