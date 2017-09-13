export class Tag {
    Id: number;
    Name: string;
}

export class Book {
    Id: number;
    Title: string;
    Author: string = null;
    Image: string = null;
    Url: string = null;
    Creator: User = null;
    Tags: Tag[] = [];
    AvgRating: number = 0;
}

export class User {
    Id: number;
    Username: string;
    Password: string;
    Email: string;
    Location: string;
    Cart: Book[] = [];
}

export class Purchase {
    Id: number;
    Date: Date;
    User: User;
    Books: Book[];
}

export class Rating {
    Id: number;
    Value: number;
    User: User;
    Book: Book;
}