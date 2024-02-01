using AutoMapper;
using FinanceService.Data;
using FinanceService.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace FinanceService.Controllers
{
    [Route("api/c/[controller]")] //c in the route is signifying it is for the command service (for the routing)
    [ApiController]
    public class PlatformsController : ControllerBase
    {
        private readonly ICommandRepo _repo;
        private readonly IMapper _mapper;
        public PlatformsController(ICommandRepo repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<PlatformReadDto>> GetPlatforms()
        {
            var platforms = _repo.GetAllPlatforms();
            return Ok(_mapper.Map<IEnumerable<PlatformReadDto>>(platforms));
        }

        [HttpPost]
        public ActionResult TestInbounConnection()
        {
            Console.WriteLine("--> Inbound POST # Command Service");
            return Ok("Inbound test ok from platforms controller");
        }
    }
}
