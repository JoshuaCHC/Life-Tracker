using AutoMapper;
using PlatformService.Dtos;
using PlatformService.Models;

namespace PlatformService.Profiles
{
    public class ReferenceTaskProfile : Profile
    {
        public ReferenceTaskProfile()
        {
            CreateMap<ReferenceTask, ReferenceTaskReadDto>();
            CreateMap<ReferenceTaskCreateDto, ReferenceTask>();
        }
    }
}
