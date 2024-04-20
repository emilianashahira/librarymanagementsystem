import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css']
})
export class StudentUpdateComponent implements OnInit {

  bookTitle: any;

  studentForm = new FormGroup({
    'Id': new FormControl('', Validators.required),
    'studentName': new FormControl('', Validators.required),
    'studentID': new FormControl('', Validators.required),
    'bookTitle': new FormControl('', Validators.required),
    'borrowDate': new FormControl('', Validators.required),
    'returnDate': new FormControl('', Validators.required)
  });

  constructor( private service:ApiserviceService, private router:ActivatedRoute) { }

  errormsg:any;
  successmsg:any;
  getparamid:any;
  message: boolean= false;

  ngOnInit(): void {
    
    forkJoin({
      bookTitle: this.service.getBookTitle(),
      student: this.service.getOneStudent(this.router.snapshot.params['Id'])
    }).subscribe(({ bookTitle, student }) => {
      // console.log('Student Data:', student.data[0]); // Add this line

      this.bookTitle = bookTitle.data;
      // console.log('Book Title:', this.bookTitle); // Add this line

      this.studentForm.patchValue({
        Id: student.data[0].Id,
        studentName: student.data[0].studentName,
        studentID: student.data[0].studentID,
        bookTitle: student.data[0].bookTitle,
        borrowDate: student.data[0].borrowDate,
        returnDate: student.data[0].returnDate
      });
    });
  }

    getbookTitle(){
    this.service.getBookTitle().subscribe((result: any)=> {
      // console.log('Service Response:', result); // Add this line
      this.bookTitle = result.data;
    })
  }

  

//to update a student
studentUpdate()
{
  console.log('Form Status:', this.studentForm.status);
  console.log('Form Value:', this.studentForm.value);
  console.log('Form Controls:', this.studentForm.controls);

  const bookTitleControl = this.studentForm.get('bookTitle');
  if (bookTitleControl) {
    console.log('Book Title Control Value:', bookTitleControl.value);
  } else {
    console.log('Book Title Control is not defined');
  }
  console.log('Form Value:', this.studentForm.value);
  this.service.updateStudent(this.router.snapshot.params['Id'], this.studentForm.value).subscribe((result:any)=>{
    this.successmsg = 'Data Has Been Updated';
    this.message = true;
    this.studentForm.reset();
  });
}
}
