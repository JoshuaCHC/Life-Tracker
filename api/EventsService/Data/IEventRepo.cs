using EventsService.Models;

namespace EventsService.Data;

public interface IEventRepo
{
    IEnumerable<Event> GetAllEvents();

    Event GetEventById(int id);

    void CreateEvent(Event newEvent);

}
