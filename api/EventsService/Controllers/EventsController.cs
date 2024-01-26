using AutoMapper;
using EventsService.Data;
using EventsService.Dtos;
using EventsService.Models;
using Microsoft.AspNetCore.Mvc;

namespace EventsService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly IEventRepo _eventRepo;
        private readonly IMapper _mapper;


        public EventsController(IEventRepo eventRepo, IMapper mapper)
        {
            _eventRepo = eventRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<EventReadDto>> GetEvents()
        {
            var events = _eventRepo.GetAllEvents();

            return Ok(_mapper.Map<IEnumerable<EventReadDto>>(events));
        }

        [HttpGet("{id}", Name = "GetEventById")]
        public ActionResult<EventReadDto> GetEventById(int id)
        {
            var foundEvent = _eventRepo.GetEventById(id);

            if (foundEvent == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<EventReadDto>(foundEvent));
        }

        [HttpPost]
        public ActionResult<EventReadDto> CreateEvent(EventCreateDto dto)
        {
            var newEvent = _mapper.Map<Event>(dto);
            _eventRepo.CreateEvent(newEvent);

            var createdEvent = _mapper.Map<EventReadDto>(newEvent);

            return CreatedAtRoute(nameof(GetEventById), new { createdEvent.Id }, createdEvent);
        }
    }
}
