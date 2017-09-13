using NiceRead.Data;
using NiceRead.Data.Models;
using NiceRead.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NiceRead.Web.Controllers
{
    public class BooksController : BaseApiController
    {
        public BooksController(INiceReadRepository repo) : base(repo)
        {
        }

        [HttpGet]
        public IEnumerable<BookModel> Get()
        {
            IQueryable<Book> query;

            query = TheRepository.GetAllBooks();

            var results = query.ToList().Select(s => TheModelFactory.Create(s));

            return results;
        }

        [HttpGet]
        [Route("~/api/books/{id}")]
        public HttpResponseMessage GetBook(int id)
        {
            try
            {
                var book = TheRepository.GetBook(id);
                if (book != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, TheModelFactory.Create(book));
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
        public HttpResponseMessage Post(BookModel bookModel)
        {
            try
            {
                var entity = TheModelFactory.Parse(bookModel);

                if (entity == null) Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Could not read data from body");

                if (TheRepository.Insert(entity) && TheRepository.SaveAll())
                {
                    return Request.CreateResponse(HttpStatusCode.Created, TheModelFactory.Create(entity));
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
        }

        [HttpPatch]
        [HttpPut]
        [Route("~/api/books/{id}")]
        public HttpResponseMessage Put(int id, [FromBody] BookModel bookModel)
        {
            try
            {

                var updatedBook = TheModelFactory.Parse(bookModel);

                if (updatedBook == null) Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Could not read data from body");

                var originalBook = TheRepository.GetBook(id);

                if (originalBook == null || originalBook.Id != id)
                {
                    return Request.CreateResponse(HttpStatusCode.NotModified, "Book is not found");
                }
                else
                {
                    updatedBook.Id = id;
                }

                if (TheRepository.Update(originalBook, updatedBook) && TheRepository.SaveAll())
                {
                    return Request.CreateResponse(HttpStatusCode.OK, TheModelFactory.Create(updatedBook));
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
        }

        [HttpDelete]
        [Route("~/api/books/{id}")]
        public HttpResponseMessage Delete(int id)
        {

            try
            {
                var book = TheRepository.GetBook(id);

                if (book == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                if (TheRepository.DeleteBook(id) && TheRepository.SaveAll())
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

        [Route("~/api/tags/{tagId:int}/books")]
        [Route("~/api/books/tags/{tagId:int}")]
        [HttpGet]
        public IEnumerable<BookModel> GetBooksByTag(int tagId)
        {
            IQueryable<Book> query;

            query = TheRepository.GetBooksByTag(tagId);

            var results = query.ToList().Select(s => TheModelFactory.Create(s));

            return results;
        }
    }
}
