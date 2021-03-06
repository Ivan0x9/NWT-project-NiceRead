﻿using NiceRead.Data;
using NiceRead.Data.Models;
using NiceRead.Web.Filters;
using NiceRead.Web.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NiceRead.Web.Controllers
{
    public class CustomersController : BaseApiController
    {
        public CustomersController(INiceReadRepository repo) : base(repo)
        {
        }
        
        [HttpGet]
        [Route("~/api/customers")]
        public IEnumerable<CustomerModel> Get()
        {
            IQueryable<Customer> query;

            query = TheRepository.GetAllCustomers();

            var results = query.ToList().Select(s => TheModelFactory.Create(s));

            return results;
        }

        [DramazonAuthorizeAttribute]
        [HttpGet]
        [Route("~/api/customers/{username}")]
        public HttpResponseMessage GetCustomer(string username)
        {
            try
            {
                var customer = TheRepository.GetCustomerByUsername(username);
                if (customer != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, TheModelFactory.Create(customer));
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpPost]
        [Route("~/api/customers")]
        public HttpResponseMessage Post([FromBody] Customer customer)
        {
            try
            {
                Trace.TraceWarning("TinTest 1 " + customer);
                if (customer == null) Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Could not read data from body");
                
                // Validation
                var duplicateCostumer = TheRepository.GetCustomerByUsername(customer.Username);
                duplicateCostumer = TheRepository.GetCustomerByEmail(customer.Email);
                if (duplicateCostumer != null) return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Email/Username already exists.");

                if (TheRepository.Insert(customer) && TheRepository.SaveAll())
                {
                    return Request.CreateResponse(HttpStatusCode.Created, TheModelFactory.Create(customer));
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Could not save to the database.");
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
            //throw new NotImplementedException();
        }

        [DramazonAuthorizeAttribute]
        [HttpPatch]
        [HttpPut]
        public HttpResponseMessage Put(string username, [FromBody] CustomerModel customerModel)
        {
            try
            {

                var updatedCustomer = TheModelFactory.Parse(customerModel);

                if (updatedCustomer == null) Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Could not read data from body");

                var originalCustomer = TheRepository.GetCustomerByUsername(username);

                if (originalCustomer == null || originalCustomer.Username != username)
                {
                    return Request.CreateResponse(HttpStatusCode.NotModified, "Customer is not found");
                }
                else
                {
                    updatedCustomer.Id = originalCustomer.Id;
                    updatedCustomer.Password = originalCustomer.Password;
                    updatedCustomer.Email = originalCustomer.Email;
                }

                if (TheRepository.Update(originalCustomer, updatedCustomer) && TheRepository.SaveAll())
                {
                    return Request.CreateResponse(HttpStatusCode.OK, TheModelFactory.Create(updatedCustomer));
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.NotModified);
                }

            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
            throw new NotImplementedException();
        }

        [DramazonAuthorizeAttribute]
        [HttpDelete]
        public HttpResponseMessage Delete(string username)
        {
            try
            {
                var customer = TheRepository.GetCustomerByUsername(username);

                if (customer == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                if (TheRepository.DeleteCustomer(customer.Id) && TheRepository.SaveAll())
                {
                    return Request.CreateResponse(HttpStatusCode.OK);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest);
                }

            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [DramazonAuthorizeAttribute]
        [HttpPost]
        [Route("~/api/customers/{username}/book/{bookId}")]
        public HttpResponseMessage AddToList(string username, int bookId)
        {
            try
            {
                Customer customer = TheRepository.GetCustomerByUsername(username);
                Book book = TheRepository.GetBook(bookId);

                TheRepository.AddBookToList(book, customer);
                TheRepository.SaveAll();

                return Request.CreateResponse(HttpStatusCode.Accepted);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
            //throw new NotImplementedException();
        }

        [DramazonAuthorizeAttribute]
        [HttpDelete]
        [Route("~/api/customers/{username}/book/{bookId}")]
        public HttpResponseMessage RemoveFromList(string username, int bookId)
        {
            try
            {
                Customer customer = TheRepository.GetCustomerByUsername(username);
                Book book = TheRepository.GetBook(bookId);

                TheRepository.RemoveBookFromList(book, customer);
                TheRepository.SaveAll();

                return Request.CreateResponse(HttpStatusCode.Accepted);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
            //throw new NotImplementedException();
        }

        [DramazonAuthorizeAttribute]
        [HttpPost]
        [Route("~/api/customers/{username}/checkout")]
        public HttpResponseMessage Checkout(string username)
        {
            try
            {
                Customer customer = TheRepository.GetCustomerByUsername(username);
                Listing purchase = TheRepository.BookList(customer);
                TheRepository.SaveAll();

                return Request.CreateResponse(HttpStatusCode.Accepted, purchase);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
            //throw new NotImplementedException();
        }

        [DramazonAuthorizeAttribute]
        [HttpGet]
        [Route("~/api/customers/{username}/book/{bookId}/rate")]
        public HttpResponseMessage GetRating(string username, int bookId)
        {
            try
            {
                Customer customer = TheRepository.GetCustomerByUsername(username);
                Book book = TheRepository.GetBook(bookId);

                Rating previousRating = TheRepository.Get(customer.Id, book.Id);
                if (previousRating == null)
                    return Request.CreateResponse(HttpStatusCode.OK);
                return Request.CreateResponse(HttpStatusCode.OK, previousRating);

            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
            //throw new NotImplementedException();
        }

        [DramazonAuthorizeAttribute]
        [HttpGet]
        [Route("~/api/customers/{username}/book/rates")]
        public HttpResponseMessage GetRatings(string username)
        {
            try
            {
                Customer customer = TheRepository.GetCustomerByUsername(username);
                var ratings = TheRepository.GetAllRatingsByCustomer(customer.Id);

                List<int> ratedIDs = new List<int>();

                foreach(Rating rating in ratings)
                {
                    ratedIDs.Add(rating.Book.Id);
                }

                return Request.CreateResponse(HttpStatusCode.OK, ratedIDs);

            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
            //throw new NotImplementedException();
        }

        [DramazonAuthorizeAttribute]
        [HttpPost]
        [Route("~/api/customers/{username}/book/{bookId}/rate/{rating}")]
        public HttpResponseMessage RateBook(string username, int bookId, int rating)
        {
            try
            {
                Customer customer = TheRepository.GetCustomerByUsername(username);
                Book book = TheRepository.GetBook(bookId);

                Rating previousRating = TheRepository.Get(customer.Id, book.Id);
                if (previousRating != null)
                    return Request.CreateErrorResponse(HttpStatusCode.NotModified, "Already rated: " + previousRating.Value);

                if (rating > 5) rating = 5;
                if (rating < 1) rating = 1;

                Rating ratingObj = new Rating()
                {
                    Customer = customer,
                    Book = book,
                    Value = rating
                };

                TheRepository.Insert(ratingObj);
                TheRepository.SaveAll();

                return Request.CreateResponse(HttpStatusCode.Accepted);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
            //throw new NotImplementedException();
        }
    }
}
