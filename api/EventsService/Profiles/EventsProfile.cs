using AutoMapper;
using EventsService.Dtos;
using EventsService.Models;

namespace EventsService.Profiles
{
    public class EventsProfile: Profile
    {
        public EventsProfile() 
        {
            CreateMap<Event, EventReadDto>();
            CreateMap<EventCreateDto, Event>();
        }
    }
}
