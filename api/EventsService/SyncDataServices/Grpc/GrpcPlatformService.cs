using AutoMapper;
using Grpc.Core;
using PlatformService.Data;
using static PlatformService.GrpcPlatform;

namespace PlatformService.SyncDataServices.Grpc
{
    public class GrpcPlatformService : GrpcPlatformBase
    {
        private readonly IPlatformRepo _repsitory;
        private readonly IMapper _mapper;

        public GrpcPlatformService(IPlatformRepo repo, IMapper mapper)
        {
            _repsitory = repo;
            _mapper = mapper;
        }

        public override Task<PlatformResponse> GetAllPlatforms(GetAllRequest request, ServerCallContext context)
        {
            var response = new PlatformResponse();
            var platforms = _repsitory.GetAllPlatforms();
            
            foreach(var platform in platforms)
            {
                response.Platform.Add(_mapper.Map<GrpcPlatformModel>(platform));
            }

            return Task.FromResult(response);
        }
    }
}
