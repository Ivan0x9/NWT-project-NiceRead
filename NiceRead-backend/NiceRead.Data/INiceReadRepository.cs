using NiceRead.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NiceRead.Data
{
    public interface INiceReadRepository
    {
        IQueryable<Book> GetAllBooks();
        IQueryable<Book> GetBooksByTag(int bookId);
        IQueryable<Book> GetBooksByCart(int customerId);
        IQueryable<Book> GetBooksByTitle(string bookTitle);
        IQueryable<Book> GetBooksByDescription(string bookDescription);
        Book GetBook(int bookId);

        IQueryable<Tag> GetAllTags();
        Tag GetTag(int tagId);
        Tag GetTagByName(string tagName);

        IQueryable<Customer> GetAllCustomers();
        Customer GetCustomerById(int customerId);
        Customer GetCustomerByUsername(string customerUsername);
        Customer GetCustomerByEmail(string customerEmail);
        bool LoginCustomer(string username, string password);

        bool AddBookToList(Book book, Customer customer);
        bool RemoveBookFromList(Book book, Customer customer);
        Listing BookList(Customer customer);
        IQueryable<Book> ViewList(Customer customer);

        IQueryable<Listing> GetAllListingsByCustomer(Customer customer);

        bool Insert(Tag tag);
        bool Update(Tag originalTag, Tag updatedTag);
        bool DeleteTag(int id);

        bool Insert(Customer customer);
        bool Update(Customer originalCustomer, Customer updatedCustomer);
        bool DeleteCustomer(int id);

        bool Insert(Book book);
        bool Update(Book originalBook, Book updatedBook);
        bool DeleteBook(int id);

        Rating Get(int customerId, int bookId);
        IQueryable<Rating> GetAllRatings(int bookId);
        IQueryable<Rating> GetAllRatingsByCustomer(int customerId);
        bool Insert(Rating rating);

        bool SaveAll();
    }
}
