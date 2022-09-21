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
    }
}