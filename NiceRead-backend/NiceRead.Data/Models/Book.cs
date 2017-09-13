using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NiceRead.Data.Models
{
    public class Book
    {
        public Book()
        {
            Tags = new List<Tag>();
        }

        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(128)]
        [MinLength(4)]
        public string Title { get; set; }

        public string Author { get; set; }

        public string Description { get; set; }

        public string Image { get; set; }

        public Customer Creator { get; set; }

        public ICollection<Tag> Tags { get; set; }
    }
}
