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
    public class ScheduledTaskController : ControllerBase
    {
        private readonly IScheduledTaskRepo _scheduledTaskRepo;
        private readonly IReferenceTaskRepo _referenceTaskRepo;
        private readonly IMapper _mapper;


        public ScheduledTaskController(IScheduledTaskRepo repo, IReferenceTaskRepo referenceTaskRepo, IMapper mapper)
        {
            _scheduledTaskRepo = repo;
            _referenceTaskRepo = referenceTaskRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<ScheduledTaskReadDto>> GetScheduledTasks()
        {
            var scheduledTasks = _scheduledTaskRepo.GetAll();
            
            return Ok(_mapper.Map<IEnumerable<ScheduledTaskReadDto>>(scheduledTasks)); 
        }

        [HttpPost]
        public ActionResult CompleteScheduledTask(ScheduledTaskCompleteDto dto)
        {
            var scheduledTask = _mapper.Map<ScheduledTask>(dto);
            _scheduledTaskRepo.CompleteScheduledTask(scheduledTask);
            
            var referenceTask = _referenceTaskRepo.GetReferenceTaskById(dto.ReferenceTaskId);

            var reschedulingTask = new ScheduledTaskCreateDto()
            {
                ReferenceTaskId = referenceTask.Id,
                Name = referenceTask.Name,
                DueDate = dto.CompletedDate.AddDays(referenceTask.RecurDays)
            };
            var rescheduledTask = _mapper.Map<ScheduledTask>(reschedulingTask);
            _scheduledTaskRepo.CreateScheduledTask(rescheduledTask);

            return Ok();
        }

    }
}
