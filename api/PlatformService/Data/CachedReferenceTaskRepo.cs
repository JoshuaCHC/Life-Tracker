using Microsoft.Extensions.Caching.Memory;
using PlatformService.Models;

namespace PlatformService.Data
{
    public class CachedReferenceTaskRepo : IReferenceTaskRepo
    {
        private readonly ReferenceTaskRepo _referenceTaskRepo;
        private readonly IMemoryCache _cache;

        public CachedReferenceTaskRepo(ReferenceTaskRepo referenceTaskRepo, IMemoryCache memoryCache)
        {
            _referenceTaskRepo = referenceTaskRepo;
            _cache = memoryCache;
        }

        public void CreateReferenceTask(ReferenceTask referenceTask)
        {
            _referenceTaskRepo.CreateReferenceTask(referenceTask);
            _cache.Remove($"referenceTasks");
        }

        public void DeleteReferenceTask(int id)
        {
            _referenceTaskRepo.DeleteReferenceTask(id);
            _cache.Remove($"referenceTask-{id}");
            _cache.Remove($"referenceTasks");
        }

        public IEnumerable<ReferenceTask> GetAllReferenceTasks()
        {
            string key = $"referenceTasks";
            return _cache.GetOrCreate(key, entry =>
            {
                entry.SetAbsoluteExpiration(TimeSpan.FromMinutes(2));

                return _referenceTaskRepo.GetAllReferenceTasks();
            });
        }

        public ReferenceTask GetReferenceTaskById(int id)
        {
            string key = $"referenceTask-{id}";
            return _cache.GetOrCreate(key, entry =>
            {
                entry.SetAbsoluteExpiration(TimeSpan.FromMinutes(2));

                return _referenceTaskRepo.GetReferenceTaskById(id);
            });
        }

        public void UpdateReferenceTask(ReferenceTask referenceTask)
        {
            _referenceTaskRepo.UpdateReferenceTask(referenceTask);
            _cache.Remove($"referenceTask-{referenceTask.Id}");
            _cache.Remove($"referenceTasks");
        }
    }
}
