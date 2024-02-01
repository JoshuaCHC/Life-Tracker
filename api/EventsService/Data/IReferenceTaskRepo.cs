using EventsService.Models;

namespace EventsService.Data
{
    public interface IReferenceTaskRepo
    {
        IEnumerable<ReferenceTask> GetAllReferenceTasks();

        ReferenceTask GetReferenceTaskById(int id);

        void CreateReferenceTask(ReferenceTask referenceTask);

        void UpdateReferenceTask(ReferenceTask referenceTask);

        void DeleteReferenceTask(int id);
    }
}
