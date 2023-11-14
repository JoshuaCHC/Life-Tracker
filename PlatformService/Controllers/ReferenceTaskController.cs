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
    public class ReferenceTaskController : ControllerBase
    {
        private readonly IReferenceTaskRepo _referenceTaskRepo;
        private readonly IMapper _mapper;


        public ReferenceTaskController(IReferenceTaskRepo repo, IMapper mapper)
        {
            _referenceTaskRepo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<ReferenceTaskReadDto>> GetReferenceTasks()
        {
            var platforms = _referenceTaskRepo.GetAllReferenceTasks();
            
            return Ok(_mapper.Map<IEnumerable<ReferenceTaskReadDto>>(platforms)); 
        }

        [HttpGet("{id}", Name= "GetReferenceTaskById")]
        public ActionResult<ReferenceTaskReadDto> GetReferenceTaskById(int id)
        {
            var platform = _referenceTaskRepo.GetReferenceTaskById(id);

            if(platform == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<ReferenceTaskReadDto>(platform));
        }

        [HttpPost]
        public ActionResult<ReferenceTaskReadDto> CreateReferenceTask(ReferenceTaskCreateDto dto)
        {
            var referenceTask = _mapper.Map<ReferenceTask>(dto);
            _referenceTaskRepo.CreateReferenceTask(referenceTask);

            var referenceTaskReadDto = _mapper.Map<ReferenceTaskReadDto>(referenceTask);

            return CreatedAtRoute(nameof(GetReferenceTaskById), new { Id = referenceTaskReadDto.Id }, referenceTaskReadDto);
        }
    }
}
