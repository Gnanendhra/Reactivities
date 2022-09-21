using System.Collections.Generic;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<Activity>> { } //List<Activity> is type of thing we are returning here

        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)//Handler method have access to datacontext, So we are injecting dataContext here
            {
                _context = context;

            }
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)//Handle method have access to query
            {
                return await _context.Activities.ToListAsync();
            }
        }


    }
}