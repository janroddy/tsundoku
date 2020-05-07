import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

import { IBook } from "./book";
import { BookService } from './book.service';

@Component({
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  pageTitle: string = 'Book Details';
  book: IBook ;
  errorMessage: '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private bookService: BookService) { }


  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('isbn');
    if (param) {
      const isbn = +param;
      this.getBook(isbn);
    }
  }


  getBook(isbn: number) {
    this.bookService.getBook(isbn).subscribe({
      next: book => this.book = book,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/books']);
  }

}
