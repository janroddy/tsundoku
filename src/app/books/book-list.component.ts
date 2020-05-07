import { Component, OnInit } from '@angular/core';
import { IBook } from './book';
import { BookService } from './book.service';

@Component ({
//  selector: 'lib-books',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})

export class BookListComponent implements OnInit {
  pageTitle: string = 'Book List';
  imageWidth: number = 70;
  imageMargin: number = 2;
  showImage: boolean = true;
  errorMessage: string;

  //getter and setter for private listFilter property
  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    //
    this.filteredBooks = this.listFilter ? this.performFilter(this.listFilter) : this.books;
  }

  filteredBooks: IBook[];
  books: IBook[] = [];

  constructor(private bookService: BookService) {

  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Book List: ' + message;
  }

  performFilter(filterBy: string): IBook[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.books.filter((book: IBook) => book.title.toLocaleLowerCase().indexOf(filterBy) !== -1)
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: books => {
        this.books = books;
        this.filteredBooks = this.books;
      },
      error: err => this.errorMessage = err
    });
  }
}
