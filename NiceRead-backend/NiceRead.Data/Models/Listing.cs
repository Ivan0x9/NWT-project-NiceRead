using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NiceRead.Data.Models
{
    public class Listing
    {
        public Listing()
        {
            Customer = new Customer();
            Books = new List<Book>();
        }

        [Key]
        public int Id { get; set; }

        public int ListingCategory { get; set; }

        public Customer Customer { get; set; }

        public ICollection<Book> Books { get; set; }
    }
}
