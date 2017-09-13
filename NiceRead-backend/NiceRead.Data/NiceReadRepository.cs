using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NiceRead.Data.Models;

namespace NiceRead.Data
{
    public class NiceReadRepository : INiceReadRepository
    {
        private NiceReadContext _ctx;

        public NiceReadRepository(NiceReadContext ctx)
        {
            _ctx = ctx;
        }

        public bool LoginCustomer(string username, string password)
        {
            var customer = _ctx.Customers.Where(c => c.Username == username).SingleOrDefault();

            if (customer != null)
            {
                if (customer.Password == password)
                {
                    return true;
                }
            }

            return false;
        }

        public Listing BookList(Customer customer)
        {
            Listing listing = new Listing();
            listing.Books = _ctx.Entry(customer).Collection(c => c.List).CurrentValue;
            listing.Customer = customer;

            try
            {
                _ctx.Listings.Add(listing);
                _ctx.Entry(customer).Collection(c => c.List).CurrentValue.Clear();
                return listing;
            }
            catch
            {
                return null;
            }
        }

        public IQueryable<Book> ViewList(Customer customer)
        {
            return _ctx.Entry(customer).Collection(c => c.List).CurrentValue.AsQueryable();
        }

        public bool AddBookToList(Book book, Customer customer)
        {
            _ctx.Entry(customer).Collection(c => c.List).CurrentValue.Add(book);

            return true;
        }

        public bool RemoveBookFromList(Book book, Customer customer)
        {
            _ctx.Entry(customer).Collection(c => c.List).CurrentValue.Remove(book);

            return true;
        }

        public IQueryable<Listing> GetAllListingsByCustomer(Customer customer)
        {
            return _ctx.Listings.Where(p => p.Customer == customer).AsQueryable();
        }

        public IQueryable<Customer> GetAllCustomers()
        {
            return _ctx.Customers.AsQueryable();

        }

        public Customer GetCustomerById(int customerId)
        {
            return _ctx.Customers.Where(c => c.Id == customerId).SingleOrDefault();
        }

        public Customer GetCustomerByUsername(string customerUsername)
        {
            return _ctx.Customers.Where(c => c.Username == customerUsername).SingleOrDefault();
        }

        public Customer GetCustomerByEmail(string customerEmail)
        {
            return _ctx.Customers.Where(c => c.Email == customerEmail).SingleOrDefault();
        }

        public Book GetBook(int bookId)
        {
            return _ctx.Books
                    .Include("Tags")
                    .Include("Creator")
                    .Where(b => b.Id == bookId)
                    .SingleOrDefault();
        }

        public IQueryable<Book> GetAllBooks()
        {
            return _ctx.Books
                    .Include("Tags")
                    .AsQueryable();
        }

        public IQueryable<Book> GetBooksByDescription(string bookDescription)
        {
                return _ctx.Books.Where(p => p.Description.Contains(bookDescription)).AsQueryable();
        }

        public IQueryable<Book> GetBooksByTag(int tagId)
        {
            return _ctx.Books.Where(p => p.Tags.Any(t => t.Id == tagId)).AsQueryable();
        }

        public IQueryable<Book> GetBooksByCart(int customerId)
        {
            return _ctx.Customers.Where(c => c.Id == customerId).SingleOrDefault().List.AsQueryable();
        }

        public IQueryable<Book> GetBooksByTitle(string bookTitle)
        {
            return _ctx.Books.Where(p => p.Title.Contains(bookTitle)).AsQueryable();
        }

        public IQueryable<Tag> GetAllTags()
        {
            return _ctx.Tags.AsQueryable();
        }

        public Tag GetTag(int tagId)
        {
            return _ctx.Tags.Where(t => t.Id == tagId).SingleOrDefault();
        }

        public Tag GetTagByName(string tagName)
        {
            return _ctx.Tags.Where(t => t.Name == tagName).SingleOrDefault();
        }

        public Rating Get(int customerId, int bookId)
        {
            return _ctx.Ratings.Where(t => t.Customer.Id == customerId && t.Book.Id == bookId).SingleOrDefault();
        }

        public IQueryable<Rating> GetAllRatings(int bookId) {
            return _ctx.Ratings.Where(p => p.Book.Id == bookId).AsQueryable();
        }

        public IQueryable<Rating> GetAllRatingsByCustomer(int customerId)
        {
            return _ctx.Ratings.Where(p => p.Customer.Id == customerId).AsQueryable();
        }

        public bool Insert(Customer customer)
        {
            try
            {
                _ctx.Customers.Add(customer);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool Insert(Book book)
        {
            try
            {
                _ctx.Books.Add(book);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool Insert(Tag tag)
        {
            try
            {
                _ctx.Tags.Add(tag);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool Insert(Rating rating)
        {
            try
            {
                _ctx.Ratings.Add(rating);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool Update(Book originalBook, Book updatedBook)
        {
            _ctx.Entry(originalBook).CurrentValues.SetValues(updatedBook);
            originalBook.Tags = updatedBook.Tags;

            return true;
        }

        public bool Update(Customer originalCustomer, Customer updatedCustomer)
        {
            _ctx.Entry(originalCustomer).CurrentValues.SetValues(updatedCustomer);
            originalCustomer.List = updatedCustomer.List;

            return true;
        }

        public bool Update(Tag originalTag, Tag updatedTag)
        {
            _ctx.Entry(originalTag).CurrentValues.SetValues(updatedTag);

            return true;
        }

        public bool DeleteCustomer(int id)
        {
            try
            {
                var entity = _ctx.Customers.Find(id);
                if (entity != null)
                {
                    _ctx.Customers.Remove(entity);
                    return true;
                }
            }
            catch
            { }
            return false;
        }

        public bool DeleteBook(int id)
        {
            try
            {
                var entity = _ctx.Books.Find(id);
                if (entity != null)
                {
                    _ctx.Books.Remove(entity);
                    return true;
                }
            }
            catch
            { }
            return false;
        }

        public bool DeleteTag(int id)
        {
            try
            {
                var entity = _ctx.Tags.Find(id);
                if (entity != null)
                {
                    _ctx.Tags.Remove(entity);
                    return true;
                }
            }
            catch
            { }
            return false;
        }

        public bool SaveAll()
        {
            return _ctx.SaveChanges() > 0;
        }
    }
}
