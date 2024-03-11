using AutoMapper;
using EventsService.AsyncDataServices;
using EventsService.Data;
using EventsService.Dtos;
using EventsService.Models;
using Microsoft.AspNetCore.Mvc;

namespace EventsService.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EventsController : ControllerBase
{
    private readonly IEventRepo _eventRepo;
    private readonly IMapper _mapper;
    private readonly IMessageBusClient _messageBusClient;


    public EventsController(IEventRepo eventRepo, IMapper mapper, IMessageBusClient messageBusClient)
    {
        _eventRepo = eventRepo;
        _mapper = mapper;
        _messageBusClient = messageBusClient;
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

        try
        {
            var forecastPayment = _mapper.Map<ForecastPaymentCreatedDto>(createdEvent);
            forecastPayment.Event = "Forecast_Payment_Created"; //Have a documented library of Events, with associated payloads so everyone can access 
            _messageBusClient.CreateForecastPayment(forecastPayment);
        }
        catch (Exception ex)
        {
            Console.WriteLine("--> Could not send asynchronous update", ex.Message);
        }


        return CreatedAtRoute(nameof(GetEventById), new { createdEvent.Id }, createdEvent);
    }
}
