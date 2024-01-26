using EventsService.Models;

namespace EventsService.Data
{
    public class EventRepo : IEventRepo
    {
        private readonly AppDbContext _appDbContext;
        public EventRepo(AppDbContext dbContext) 
        {
            _appDbContext = dbContext;
        }
        public void CreateEvent(Event newEvent)
        {
            if (newEvent is null)
            {
                throw new ArgumentNullException(nameof(newEvent));
            }
            _appDbContext.Events.Add(newEvent);
            _appDbContext.SaveChanges();
        }

        public IEnumerable<Event> GetAllEvents()
        {
            return _appDbContext.Events.ToList();
        }

        public Event GetEventById(int id)
        {
            return _appDbContext.Events.FirstOrDefault(x => x.Id == id);
        }
    }
}
