using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Activities;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {


        [HttpGet]

        public async Task<ActionResult<List<Activity>>> GetActivities()//returning List of activities 
        {

            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]//Can pass id to fetch particular activity
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id=id});
        }

        [HttpPost]
        public async  Task<IActionResult> CreateActivity (Activity activity)
        //API Controller Attribute checks the properties of data we send and Activity properties, if matches it passes as a parameter
        // Here we are not returing anything
        // IActionResult means response return like ok bad request
        {
            return Ok(await Mediator.Send(new Create.Command {Activity=activity}));
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> Edit (Guid id,Activity activity)
        {
            activity.Id=id;
            return Ok(await Mediator.Send(new Edit.Command {Activity=activity}));
        }

      [HttpDelete("{id}")]
       public async Task<IActionResult> Delete (Guid id)
      {
        return Ok(await Mediator.Send(new Delete.Command {Id=id}));
      }

    }
}