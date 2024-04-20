import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

interface StudentData {
  Id: number;
  studentName: string;
  studentID: string;
  bookTitle: string;
  borrowDate: string;
  returnDate: string;
}

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {

  constructor(private service:ApiserviceService) { }

  listData: StudentData[] = []; // Add this line here
  successmsg:any;

  ngOnInit(): void {

    this.getAllStudent();
  }

  //get delete id
  deleteStudent(Id:any){
    console.log(Id,'deleteId==>');
    this.service.deleteStudent(Id).subscribe((res)=>{
      console.log(res,'deleteres==>');
      this.successmsg = "Delete student profile successful!";
      this.getAllStudent();

    });

  }

getAllStudent(){
  this.service.getAllStudent().subscribe((res)=>{
    console.log(res,"res==>");
    this.listData = res.data;
  });
}
}
