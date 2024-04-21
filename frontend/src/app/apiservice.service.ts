import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

const baseStudentUrl = "http://localhost:8080/student"
const addStudentUrl = "http://localhost:8080/student/add"
const deleteStudentUrl = "http://localhost:8080/student/del"
const updateStudentUrl = "http://localhost:8080/student/put"

const baseBookUrl = "http://localhost:8080/book"
const addBookUrl = "http://localhost:8080/book/add"
const deleteBookUrl = "http://localhost:8080/book/del"
const updateBookUrl = "http://localhost:8080/book/put"
const bookTitleUrl = "http://localhost:8080/bookTitle";

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
 
  constructor(private _http:HttpClient) { }

/*------------------------------------START STUDENT-----------------------------------*/  
//get all student
getAllStudent():Observable<any>{
  const url = "http://localhost:8080/allstudent"
  return this._http.get<any>(url) 
}

 // create student
 addStudent(student: any):Observable<any>{
  console.log(student,'createapi=>');
  const url = "http://localhost:8080/student/add"
  return this._http.post(url, student)
}

//deleting student

deleteStudent(Id: any): Observable<any> {
  return this._http.delete(`${deleteStudentUrl}/${Id}`);

}

//update student
updateStudent(Id: any, student: any): Observable<any> {
  console.log('Updating student with Id:', Id); 
  console.log('Student data:', student); 
  return this._http.put(`${updateStudentUrl}/${Id}`, student);

}

//get one student
getOneStudent(Id:any):Observable<any>{
  return this._http.get(`${baseStudentUrl}/${Id}`);
}
/*------------------------------------ END STUDENT-----------------------------------*/  



/*------------------------------------START BOOK-----------------------------------*/  
//get all book
getAllBook():Observable<any>{
  const url = "http://localhost:8080/allbook"
  return this._http.get<any>(url)
}

//get book title
getBookTitle():Observable<any>{
  const url = "http://localhost:8080/bookTitle"
  return this._http.get<any>(url);
}

 // create book
 addBook(book: any):Observable<any>{
  console.log(book,'createapi=>');
  return this._http.post(addBookUrl, book)
}

//deleting book

deleteBook(bookId: any): Observable<any> {
  return this._http.delete(`${deleteBookUrl}/${bookId}`);

}

//update book
updateBook(bookId: any, book: any): Observable<any> {
  return this._http.put(`${updateBookUrl}/${bookId}`, book);

}

//get one student
getOneBook(bookId:any):Observable<any>{
  return this._http.get(`${baseBookUrl}/${bookId}`);
}
/*------------------------------------END BOOK-----------------------------------*/  

}
