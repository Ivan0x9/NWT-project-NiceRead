using NiceRead.Data;
using NiceRead.Data.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Web;

namespace NiceRead.Web.Models
{
    public class ModelFactory
    {
        private System.Web.Http.Routing.UrlHelper _UrlHelper;
        private INiceReadRepository _repo;

        public ModelFactory(HttpRequestMessage request, INiceReadRepository repo)
        {
            _UrlHelper = new System.Web.Http.Routing.UrlHelper(request);
            _repo = repo;
        }

        //public ICollection<Tag> GetTags(TagModel[] tags)
        //{
        //    ICollection<Tag> tagCollection = null;
        //    foreach (TagModel tag in tags)
        //    {
        //        tagCollection.Add(Parse(tag));
        //    }
        //    return tagCollection;
        //}

        //public TagModel[] CreateTags(ICollection<Tag> tags)
        //{
        //    TagModel[] tagList = Array);
        //    foreach (ICollection<Tag> tag in tags)
        //    {
        //        tagList.(Create(tag));
        //    }

        //}
        public float getAvgRating(int id)
        {
            int total = 0, divider = 0;
            var ratings = _repo.GetAllRatings(id);
            foreach(Rating rating in ratings)
            {
                divider++;
                total += rating.Value;
            }
            if (divider == 0) return 0;
            return total / divider;
        }

        public BookModel Create(Book book)
        {
            if (book == null) return null;
            return new BookModel()
            {
                Url = _UrlHelper.Link("Books", new { id = book.Id }),
                Id = book.Id,
                Title = book.Title,
                Description = book.Description,
                Image = book.Image,
                Tags = book.Tags.ToList<Tag>(),
                AvgRating = getAvgRating(book.Id)
            };
        }

        public CustomerModel Create(Customer customer)
        {
            if (customer == null) return null;
            return new CustomerModel()
            {
                Id = customer.Id,
                Username = customer.Username,
                Address = customer.Address,
                Email = customer.Email,
                Fullname = customer.Fullname
            };
        }

        public TagModel Create(Tag tag)
        {
            if (tag == null) return null;
            return new TagModel()
            {
                Id = tag.Id,
                Name = tag.Name
            };
        }

        public Book Parse(BookModel model)
        {
            try
            {
                List<Tag> tags = new List<Tag>();
                foreach (Tag tag in model.Tags) tags.Add(_repo.GetTag(tag.Id));
                var book = new Book()
                {
                    Title = model.Title,
                    Description = model.Description,
                    Image = model.Image,
                    Creator = _repo.GetCustomerById(model.Creator.Id),
                    Tags = tags
                };

                return book;
            }
            catch (Exception)
            {

                return null;
            }
        }

        public Customer Parse(CustomerModel model)
        {
            try
            {
                var customer = new Customer()
                {
                    Username = model.Username,
                    Fullname = model.Fullname,
                    Address = model.Address
                };

                return customer;
            }
            catch (Exception)
            {

                return null;
            }
        }

        public Tag Parse(TagModel tag)
        {
            if (tag == null) return null;
            return new Tag()
            {
                Id = tag.Id,
                Name = tag.Name
            };
        }
    }
}