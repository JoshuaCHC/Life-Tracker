using PlatformService.Models;

namespace PlatformService.Data
{
    public interface IScheduledTaskRepo
    {
        IEnumerable<ScheduledTask> GetAll();

        IEnumerable<ScheduledTask> GetAllOverdue();

        void CreateScheduledTask(ScheduledTask scheduledTask);

        void CompleteScheduledTask(ScheduledTask scheduledTask);
    }
}
