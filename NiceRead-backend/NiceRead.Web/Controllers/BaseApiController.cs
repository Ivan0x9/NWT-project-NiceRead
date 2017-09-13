using NiceRead.Data;
using NiceRead.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NiceRead.Web.Controllers
{
    public class BaseApiController : ApiController
    {
        private INiceReadRepository _repo;
        private ModelFactory _modelFactory;

        public BaseApiController(INiceReadRepository repo)
        {
            _repo = repo;
        }

        protected INiceReadRepository TheRepository
        {
            get
            {
                return _repo;
            }
        }

        protected ModelFactory TheModelFactory
        {
            get
            {
                if (_modelFactory == null)
                {
                    _modelFactory = new ModelFactory(Request, _repo);
                }
                return _modelFactory;
            }
        }
    }
}
