using AutoMapper;
using PlatformService.Dtos;
using PlatformService.Models;

namespace PlatformService.Profiles
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
