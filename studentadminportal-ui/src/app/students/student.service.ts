import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from './models/api-models/student.model';
import { UpdateStudentRequest } from './models/api-models/update-student-request.model';
import { StudentsComponent } from './students.component';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseApiUrl = 'https://localhost:7213';

  constructor(private httpClient: HttpClient) { }

  getStudents(): Observable<Student[]>{
    return this.httpClient.get<Student[]>(this.baseApiUrl + '/Students/get-allstudents');
  }

  getStudent(id: string): Observable<Student>{
    return this.httpClient.get<Student>(this.baseApiUrl + '/Students/get-student/'+id);
  }

  updateStudent(id:string, StudentRequest : Student):Observable<Student>
  {
    const UpdateStudentRequest:UpdateStudentRequest=
    {
      firstName:StudentRequest.firstName,
      lastName:StudentRequest.lastName,
      dateOfBirth:StudentRequest.dateOfBirth,
      email:StudentRequest.email,
      mobile:StudentRequest.mobile,
      genderId:StudentRequest.genderId,
      physicalAddress:StudentRequest.address.physicalAddress,
      postalAddress:StudentRequest.address.postalAddress
    }
    return this.httpClient.put<Student>(this.baseApiUrl + '/Students/update-studentByid/'+id,UpdateStudentRequest);
  }

  deleteStudent(id:string):Observable<Student>{
    return this.httpClient.delete<Student>(this.baseApiUrl + '/Students/delete-studentByid/'+id);
  }

}
