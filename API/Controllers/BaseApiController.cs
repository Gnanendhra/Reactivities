using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
      [ApiController]
      [Route("api/[controller]")]//Actuall controller is replaced with word controller
    public class BaseApiController: ControllerBase // AllControllers are derived from ControllerBase
    {
       private IMediator _mediator;

       protected IMediator Mediator => _mediator??=HttpContext.RequestServices
       .GetService<IMediator>(); //Injecting mediator service here so all derived classes have access.

         protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (result == null) return NotFound();
            if (result.IsSuccess && result.Value != null)
                return Ok(result.Value);
            if (result.IsSuccess && result.Value == null)
                return NotFound();
            return BadRequest(result.Error);
        }
    }
}