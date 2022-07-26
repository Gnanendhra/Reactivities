using Domain;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        
        private readonly DataContext _context;

        public ActivitiesController(DataContext context)//Inject datacontext here so we can query db directly here and return activities
        {
            _context = context;
        }

        [HttpGet]

        public async Task<ActionResult<List<Activity>>> GetActivities()//returning List of activities 
        {

            return await _context.Activities.ToListAsync();
        }

        [HttpGet("{id}")]//Can pass id to fetch particular activity
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await _context.Activities.FindAsync(id);
        }
    }
}