using NiceRead.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NiceRead.Web.Models
{
    public class BookModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public string Url { get; set; }
        public CustomerModel Creator { get; set; }
        public List<Tag> Tags { get; set; }
        public float AvgRating { get; set; }
    }
}