import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../models/ui-models/student.model';

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
  constructor(private readonly studentService : StudentService,
    private readonly route:ActivatedRoute){}

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

        }
      }
      );

  }
}
