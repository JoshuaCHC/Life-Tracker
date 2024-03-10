using AutoMapper;
using EventsService.Data;
using EventsService.Dtos;
using EventsService.Models;
using Microsoft.AspNetCore.Mvc;

namespace EventsService.Controllers
{

    [Route("api/events/[controller]")]
    [ApiController]
    public class ReferenceTaskController : ControllerBase
    {
        private readonly IReferenceTaskRepo _referenceTaskRepo;
        private readonly IScheduledTaskRepo _scheduledTaskRepo;
        private readonly IMapper _mapper;


        public ReferenceTaskController(IReferenceTaskRepo repo, IScheduledTaskRepo scheduledTaskRepo, IMapper mapper)
        {
            _referenceTaskRepo = repo;
            _scheduledTaskRepo = scheduledTaskRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<ReferenceTaskReadDto>> GetReferenceTasks()
        {
            var referenceTasks = _referenceTaskRepo.GetAllReferenceTasks();

            return Ok(_mapper.Map<IEnumerable<ReferenceTaskReadDto>>(referenceTasks));
        }

        [HttpGet("{id}", Name = "GetReferenceTaskById")]
        public ActionResult<ReferenceTaskReadDto> GetReferenceTaskById(int id)
        {
            var referenceTask = _referenceTaskRepo.GetReferenceTaskById(id);

            if (referenceTask == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<ReferenceTaskReadDto>(referenceTask));
        }

        [HttpPost]
        public ActionResult<ReferenceTaskReadDto> CreateReferenceTask(ReferenceTaskCreateDto dto)
        {
            var referenceTask = _mapper.Map<ReferenceTask>(dto);
            _referenceTaskRepo.CreateReferenceTask(referenceTask);

            var referenceTaskReadDto = _mapper.Map<ReferenceTaskReadDto>(referenceTask);

            var reschedulingTask = new ScheduledTaskCreateDto()
            {
                ReferenceTaskId = referenceTask.Id,
                Name = referenceTask.Name,
                DueDate = referenceTask.StartDate
            };

            var rescheduledTask = _mapper.Map<ScheduledTask>(reschedulingTask);
            _scheduledTaskRepo.CreateScheduledTask(rescheduledTask);

            return CreatedAtRoute(nameof(GetReferenceTaskById), new { referenceTaskReadDto.Id }, referenceTaskReadDto);
        }
    }
}