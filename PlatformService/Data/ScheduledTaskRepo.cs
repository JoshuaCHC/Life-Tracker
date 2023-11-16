using PlatformService.Models;

namespace PlatformService.Data
{
    public class ScheduledTaskRepo : IScheduledTaskRepo
    {
        private readonly AppDbContext _appDbContext;
        public ScheduledTaskRepo(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public void CompleteScheduledTask(ScheduledTask scheduledTask)
        {
            var taskToComplete = _appDbContext.ScheduledTasks.FirstOrDefault(x => x.Id == scheduledTask.Id);
            if (taskToComplete is null)
            {
                throw new ArgumentNullException(nameof(taskToComplete));
            }

            taskToComplete.CompletedDate = scheduledTask.CompletedDate;
            taskToComplete.CompletedInMinutes = scheduledTask.CompletedInMinutes;

            _appDbContext.SaveChanges();
        }

        public void CreateScheduledTask(ScheduledTask scheduledTask)
        {
            if (scheduledTask is null)
            {
                throw new ArgumentNullException(nameof(scheduledTask));
            }
            _appDbContext.ScheduledTasks.Add(scheduledTask);
            _appDbContext.SaveChanges();
        }

        public IEnumerable<ScheduledTask> GetAll()
        {
            return _appDbContext.ScheduledTasks.ToList();
        }

        public IEnumerable<ScheduledTask> GetAllOverdue()
        {
            return _appDbContext.ScheduledTasks.Where(task => task.DueDate > DateTime.UtcNow);
        }
    }
}
