using NiceRead.Data.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NiceRead.Data
{
    public class NiceReadContext : DbContext
    {
        public NiceReadContext() :
            base("NiceReadConnection")
        {
            Configuration.ProxyCreationEnabled = false;
            Configuration.LazyLoadingEnabled = false;

            Database.SetInitializer(new NiceReadDBInitializer());
        }

        public DbSet<Tag> Tags { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Listing> Listings { get; set; }
        public DbSet<Rating> Ratings { get; set; }
    }
}

