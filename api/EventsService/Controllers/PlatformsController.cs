using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PlatformService.AsyncDataServices;
using PlatformService.Data;
using PlatformService.Dtos;
using PlatformService.Models;
using PlatformService.SyncDataServices.Http;

namespace PlatformService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlatformsController: ControllerBase
    {
        private readonly IPlatformRepo _platformRepo;
        private readonly IMapper _mapper;
        private readonly ICommandDataClient _commandDataClient;
        private readonly IMessageBusClient _messageBusClient;

        public PlatformsController(IPlatformRepo repo, IMapper mapper, ICommandDataClient dataClient, IMessageBusClient messageBusClient)
        {
            _platformRepo = repo;
            _mapper = mapper;
            _commandDataClient = dataClient;
            _messageBusClient = messageBusClient;
        }

        [HttpGet]
        public ActionResult<IEnumerable<PlatformReadDto>> GetPlatforms()
        {
            var platforms = _platformRepo.GetAllPlatforms();
            
            return Ok(_mapper.Map<IEnumerable<PlatformReadDto>>(platforms)); 
        }

        [HttpGet("{id}", Name= "GetPlatformById")]
        public ActionResult<PlatformReadDto> GetPlatformById(int id)
        {
            var platform = _platformRepo.GetPlatformById(id);

            if(platform == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<PlatformReadDto>(platform));
        }

        [HttpPost]
        public async Task<ActionResult<PlatformReadDto>> CreatePlatform(PlatformCreateDto dto)
        {
            var platform = _mapper.Map<Platform>(dto);
            _platformRepo.CreatePlatform(platform); //When it runs, it adds the above platform object to DB, which adds ID to object, which we can then reference

            var platformReadDto = _mapper.Map<PlatformReadDto>(platform);

            try
            {
                await _commandDataClient.SendPlatformToCommand(platformReadDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine("--> Could not send synchronous update", ex.Message);
            }

            try
            {
                var publishPlatform = _mapper.Map<PlatformPublishedDto>(platformReadDto);
                publishPlatform.Event = "Platform_Published"; //Have a documented library of Events, with associated payloads so everyone can access 
                _messageBusClient.PublishNewPlatform(publishPlatform);
            }
            catch (Exception ex)
            {
                Console.WriteLine("--> Could not send asynchronous update", ex.Message);
            }

            return CreatedAtRoute(nameof(GetPlatformById), new { Id = platformReadDto.Id }, platformReadDto);
        }
    }
}
