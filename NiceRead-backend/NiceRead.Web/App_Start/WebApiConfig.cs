using NiceRead.Data;
using NiceRead.Web.Filters;
using Microsoft.Practices.Unity;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Http;
using System.Web.Http.Cors;

namespace NiceRead.Web
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            var cors = new EnableCorsAttribute("http://localhost:3000", "*", "GET, POST, PUT, DELETE, OPTIONS");
            config.EnableCors(cors);
            
            //var jsonFormatter = config.Formatters.OfType<JsonMediaTypeFormatter>().First();
            //jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            //config.Filters.Add(new ForceHttpsAttribute());
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "Books",
                routeTemplate: "api/books/{id}",
                defaults: new { controller = "books", id = RouteParameter.Optional }
                );

            config.Routes.MapHttpRoute(
                name: "Customers",
                routeTemplate: "api/customers/{id}",
                defaults: new { controller = "customers", id = RouteParameter.Optional, username = RouteParameter.Optional }
                );

            //config.Routes.MapHttpRoute(
            //    name: "Tags",
            //    routeTemplate: "api/tags/{id}",
            //    defaults: new { controller = "tags", id = RouteParameter.Optional }
            //    );
        }
    }
}
