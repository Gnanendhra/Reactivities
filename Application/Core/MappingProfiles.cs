using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile// derving from profile class
    {
        public MappingProfiles()
        {
            CreateMap<Activity,Activity>();//Mapping from Activity to Activity
        }
    }
}