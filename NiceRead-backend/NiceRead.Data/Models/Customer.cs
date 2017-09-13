using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NiceRead.Data.Models
{
    public class Customer
    {
        public Customer()
        {
            List = new List<Book>();
        }

        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(64)]
        [MinLength(4)]
        public string Username { get; set; }

        [Required]
        [MaxLength(64)]
        [MinLength(4)]
        public string Password { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(64)]
        [MinLength(4)]
        public string Email { get; set; }

        [MaxLength(128)]
        [MinLength(4)]
        public string Address { get; set; }

        [MaxLength(128)]
        [MinLength(4)]
        public string Fullname { get; set; }

        public ICollection<Book> List { get; set; }
    }
}
