using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest //Command wont return anything
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            //Here unit is type of what we returing but 
            //it doesnt return anything, it just tells to API request is completed.
            {
                 _context.Activities.Add(request.Activity); //need to use AddAsync if we are hitting db but we are inserting data into memory at this point, so use Add only
                 await _context.SaveChangesAsync();

                 return Unit.Value;
            }
        }
    }
}