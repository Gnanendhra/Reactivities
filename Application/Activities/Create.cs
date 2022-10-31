using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>> //Command wont return anything
        {
            public Activity Activity { get; set; }
        }


//using fluent validator as middleware for validation
//Need to inject fluent validator service in startup.cs file
           public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            //Here unit is type of what we returing but 
            //it doesnt return anything, it just tells to API request is completed.
            {
                 _context.Activities.Add(request.Activity); //need to use AddAsync if we are hitting db but we are inserting data into memory at this point, so use Add only
                 var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create activity");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}