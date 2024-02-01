using AutoMapper;
using EventsService.Dtos;
using EventsService.Models;

namespace EventsService.Profiles
{
    public class EventsProfile: Profile
    {
        public EventsProfile() 
        {
            CreateMap<Event, EventReadDto>()
                .ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.StartDate.ToString("O")))
                .ForMember(dest => dest.EndDate, opt => opt.MapFrom(src => src.EndDate.ToString("O")));
            CreateMap<EventCreateDto, Event>()
                .ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => DateTime.Parse(src.StartDate, null, System.Globalization.DateTimeStyles.RoundtripKind)))
                .ForMember(dest => dest.EndDate, opt => opt.MapFrom(src => DateTime.Parse(src.EndDate, null, System.Globalization.DateTimeStyles.RoundtripKind)));

        }
    }
}
