using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Persistence;
using AutoMapper;
using MediatR;
using Application.Activities;
using Application.Core;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config )
        {
             services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });
            });

            services.AddDbContext<DataContext>(opt =>
           {
               opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
           });
           services.AddCors(opt=>{
            opt.AddPolicy("CorsPolicy",policy=>{
                policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
            });
           });

           services.AddMediatR(typeof(List.Handler).Assembly);//Telling the MediatR where the Handler present.
        services.AddAutoMapper(typeof(MappingProfiles).Assembly);//Telling the AutoMapper where the Mapping present.
          

            services.AddMvc();

            return services;
        }
    }
}