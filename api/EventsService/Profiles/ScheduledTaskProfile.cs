using AutoMapper;
using EventsService.Dtos;
using EventsService.Models;

namespace EventsService.Profiles;

public class ScheduledTaskProfile : Profile
{
    public ScheduledTaskProfile()
    {
        CreateMap<ScheduledTask, ScheduledTaskReadDto>()
            .ForMember(dest => dest.CompletedDate, opt => opt.MapFrom(src => src.CompletedDate.ToString("o")))
            .ForMember(dest => dest.DueDate, opt => opt.MapFrom(src => src.DueDate.ToString("o")));
        CreateMap<ScheduledTaskCreateDto, ScheduledTask>()
            .ForMember(dest => dest.CompletedDate, opt => new DateTime());
        CreateMap<ScheduledTaskCompleteDto, ScheduledTask>()
            .ForMember(dest => dest.CompletedDate, opt => opt.MapFrom(src => DateTime.Parse(src.CompletedDate, null, System.Globalization.DateTimeStyles.RoundtripKind)));
    }
}
