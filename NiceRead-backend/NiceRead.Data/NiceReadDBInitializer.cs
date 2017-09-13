using NiceRead.Data.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NiceRead.Data
{
    class NiceReadDBInitializer : DropCreateDatabaseAlways<NiceReadContext>
    {
        protected override void Seed(NiceReadContext context)
        {
            Customer user1 = new Customer
            {
                Id = 1,
                Username = "NikoNikic",
                Password = "12345",
                Address = "Split",
                Fullname = "Niko Nikic",
                Email = "Dupemail@example.net"
            };
            Customer user2 = new Customer
            {
                Id = 2,
                Username = "PiroPiric",
                Password = "12345",
                Address = "Split",
                Fullname = "Piro Piric",
                Email = "Dupemail2@example.net"
            };
            context.Customers.Add(user1);
            context.Customers.Add(user2);

            Tag tag1 = new Tag { Id = 1, Name = "Fantasy" };
            Tag tag2 = new Tag { Id = 2, Name = "Drama" };
            Tag tag3 = new Tag { Id = 3, Name = "Love" };
            Tag tag4 = new Tag { Id = 4, Name = "Sci-Fi" };
            context.Tags.Add(tag1);
            context.Tags.Add(tag2);
            context.Tags.Add(tag3);
            context.Tags.Add(tag4);

            Book book1 = new Book
            {
                Id = 1,
                Title = "Do Androids Dream of Electric Sheep",
                Description = "Do they?",
                Author = "Phillip K Dick"
            };
            book1.Tags.Add(tag1);
            book1.Tags.Add(tag4);
            Book book2 = new Book
            {
                Id = 2,
                Title = "Game of Thrones",
                Description = "The bestselling book that started it all.",
                Author = "George R. R. Martin"
            };
            book2.Tags.Add(tag1);
            book2.Tags.Add(tag2);
            context.Books.Add(book1);
            context.Books.Add(book2);

            context.SaveChanges();
        }
    }
}
