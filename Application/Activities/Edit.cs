using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest//Command wont return anything so we are not writing return type
        {
            public Activity Activity { get; set; }// getting Activity details from Client side.
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id);

               _mapper.Map(request.Activity,activity);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}