using AutoMapper;
using EventsService.Dtos;
using EventsService.Models;

namespace EventsService.Profiles
{
    public class ReferenceTaskProfile : Profile
    {
        public ReferenceTaskProfile()
        {
            CreateMap<ReferenceTask, ReferenceTaskReadDto>();
            CreateMap<ReferenceTaskCreateDto, ReferenceTask>();
        }
    }
}
