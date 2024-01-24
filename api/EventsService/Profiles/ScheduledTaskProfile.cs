using AutoMapper;
using EventsService.Dtos;
using EventsService.Models;

namespace EventsService.Profiles
{
    public class ScheduledTaskProfile : Profile
    {
        public ScheduledTaskProfile()
        {
            CreateMap<ScheduledTask, ScheduledTaskReadDto>();
            CreateMap<ScheduledTaskCreateDto, ScheduledTask>();
            CreateMap<ScheduledTaskCompleteDto, ScheduledTask>();
        }
    }
}
