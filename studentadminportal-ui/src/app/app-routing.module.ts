import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students/students.component';
import { RouterModule, Routes } from '@angular/router';
import { ViewStudentComponent } from './students/view-student/view-student.component';

const routes: Routes = [
  {
    path: '',
    component : StudentsComponent
  },
  {
    path: 'students/get-allstudents',
    component : StudentsComponent
  },
  {
    path: 'students/add-newstudent',
    component : ViewStudentComponent
  },
  {
    path: 'students/get-student/:id',
    component : ViewStudentComponent
  }
  // {
  //   path: 'genders/get-allgenders',
  //   component : ViewStudentComponent
  // }
  ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
