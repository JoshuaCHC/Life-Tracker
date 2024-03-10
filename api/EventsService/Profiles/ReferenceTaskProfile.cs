using AutoMapper;
using EventsService.Dtos;
using EventsService.Models;

namespace EventsService.Profiles;

public class ReferenceTaskProfile : Profile
{
    public ReferenceTaskProfile()
    {
        CreateMap<ReferenceTask, ReferenceTaskReadDto>()
            .ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.StartDate.ToString("O")));
        CreateMap<ReferenceTaskCreateDto, ReferenceTask>()
            .ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => DateTime.Parse(src.StartDate, null, System.Globalization.DateTimeStyles.RoundtripKind)));
    }
}
