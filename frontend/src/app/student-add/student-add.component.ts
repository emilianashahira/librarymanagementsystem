import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ApiserviceService} from '../apiservice.service';
import { ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {

  bookTitle: any;

  constructor(private service:ApiserviceService, private router:ActivatedRoute, private http: HttpClient) { }

  errormsg:any;
  successmsg:any;
  getparamid:any;

  ngOnInit(): void {

    this.getbookTitle();

        //id for update
        this.getparamid = this.router.snapshot.paramMap.get('Id');
        if (this.getparamid){
        this.service.getOneStudent(this.getparamid).subscribe((res)=>{
    
          console.log(res,'res==>');
          this.studentForm.patchValue({
            studentName:res.data[0].studentName,
            studentID:res.data[0].studentID,
            bookTitle:res.data[0].bookTitle,
            borrowDate:res.data[0].borrowDate,
            returnDate:res.data[0].returnDate,
          });
        });
      }
  }

  getbookTitle(){
    this.service.getBookTitle().subscribe((result: any)=> {
      this.bookTitle = result.data;
      console.log('Book Title:', this.bookTitle); 
    })
  }

  studentForm = new FormGroup({
    'studentName':new FormControl('',Validators.required),
    'studentID':new FormControl('',Validators.required),
    'bookTitle':new FormControl('',Validators.required),
    'borrowDate':new FormControl('',Validators.required),
    'returnDate':new FormControl('',Validators.required)
  });

    //Create New Student
    studentSubmit(){
      if(this.studentForm.valid){

        console.log('Form Status:', this.studentForm.status);
        console.log('Form Value:', this.studentForm.value);
        console.log('Form Errors:', this.studentForm.errors);
        
        this.service.addStudent( this.studentForm.value ).subscribe((res)=>{
          console.log('Response:', res); 
          this.studentForm.reset();
          this.successmsg = 'Successfully Add New Student';
        },
        (error) => {
          console.error('Error:', error); 
          this.errormsg = 'Add New Student Unsuccessful';
        });
      }
      else{
        console.error('Form is invalid');
    Object.keys(this.studentForm.controls).forEach(key => {
      let control = this.studentForm.get(key);
      if (control) {
        let controlErrors: any = control.errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.error('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          });
        }
      }
    });
  }
}
}
