import { Component, OnInit } from '@angular/core';
import {ApiserviceService}from '../apiservice.service';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit {

  constructor(private service:ApiserviceService) { }

  listData:any;
  successmsg:any;

  ngOnInit(): void {
    this.getAllBook();
  }

  //get delete id
  deleteBook(bookId:any){
    console.log(bookId,'deleteId==>');
    this.service.deleteBook(bookId).subscribe((res)=>{
      console.log(res,'deleteres==>');
      this.successmsg = "Delete book successful!";
      this.getAllBook();

    });

  }

  //get book
  getAllBook(){

    this.service.getAllBook().subscribe((res)=>{
      console.log(res,"res==>");

      this.listData = res.data;
    });

  }

}
