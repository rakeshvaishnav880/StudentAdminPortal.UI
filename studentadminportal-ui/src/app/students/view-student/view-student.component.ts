import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
 id : string| null | undefined;

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
              console.log(successResponse);
            }
          );

        }
      }
      );

  }
}
