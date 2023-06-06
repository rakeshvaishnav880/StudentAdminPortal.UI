import { Component,OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from './models/ui-models/student.model';
import { StudentService } from './student.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students:Student[]= [];
  displayedColumns: string[] = ['edit','firstName', 'lastName', 'dateOfBirth','mobile','gender','email'];
  dataSource:MatTableDataSource<Student> = new MatTableDataSource<Student>();
  @ViewChild(MatPaginator) matPaginator!:MatPaginator;
  @ViewChild(MatSort) matSort!:MatSort;
  filterString = '';
  constructor(private studentService : StudentService){}



  ngOnInit():void{
    //Fetch Student server
    this.studentService.getStudents()
    .subscribe({
      next: (successResponse) =>{
        this.students =successResponse,
        this.dataSource= new MatTableDataSource(this.students);

        if(this.matPaginator){
          this.dataSource.paginator = this.matPaginator;
        }
        if(this.matSort){
          this.dataSource.sort = this.matSort;
        }
      } ,
      error: (errorResponse) => console.error(errorResponse),
      complete: () => console.info('complete')
    });

    }

    filterStudents(){
      this.dataSource.filter = this.filterString.trim().toLowerCase();
    }
}


