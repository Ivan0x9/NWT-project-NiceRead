﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NiceRead.Data.Models
{
    public class Rating
    {
        public Rating()
        {
            Customer = new Customer();
            Book = new Book();
        }

        [Key]
        public int Id { get; set; }

        public int Value { get; set; }

        public Customer Customer { get; set; }

        public Book Book { get; set; }
    }
}
