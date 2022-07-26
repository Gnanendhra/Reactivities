using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Persistence;
using Microsoft.Extensions.DependencyInjection;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            //Code used to start the application

           var host= CreateHostBuilder(args).Build();

           using var scope= host.Services.CreateScope();

           var services=scope.ServiceProvider;

           try{
              var context=services.GetRequiredService<DataContext>();//We are storing Datacontext service in context variable
              //So context acts as a database
             await context.Database.MigrateAsync();//Will create db if it is not exist already
              await Seed.SeedData(context);
           }
           catch(Exception ex)
           {
             var logger= services.GetRequiredService<ILogger<Program>>();
             logger.LogError(ex,"An error occured during migration");
           }

           await host.RunAsync();//used to start our application
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
