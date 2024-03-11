using EventsService.Models;

namespace EventsService.Data;

public class ReferenceTaskRepo : IReferenceTaskRepo
{
    private readonly AppDbContext _appDbContext;
    public ReferenceTaskRepo(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public void CreateReferenceTask(ReferenceTask referenceTask)
    {
        if (referenceTask is null)
        {
            throw new ArgumentNullException(nameof(referenceTask));
        }
        _appDbContext.ReferenceTasks.Add(referenceTask);
        _appDbContext.SaveChanges();
    }

    public void DeleteReferenceTask(int id)
    {
        var taskToRemove = _appDbContext.ReferenceTasks.FirstOrDefault(x => x.Id == id);
        if (taskToRemove is null)
        {
            throw new ArgumentNullException(nameof(taskToRemove));
        }
        _appDbContext.Remove(taskToRemove);
        _appDbContext.SaveChanges();
    }

    public IEnumerable<ReferenceTask> GetAllReferenceTasks()
    {
        return _appDbContext.ReferenceTasks.ToList();
    }

    public ReferenceTask GetReferenceTaskById(int id)
    {
        return _appDbContext.ReferenceTasks.FirstOrDefault(x => x.Id == id);
    }

    public void UpdateReferenceTask(ReferenceTask referenceTask)
    {
        var taskToUpdate = _appDbContext.ReferenceTasks.FirstOrDefault(x => x.Id == referenceTask.Id);
        if (taskToUpdate is null)
        {
            throw new ArgumentNullException(nameof(taskToUpdate));
        }

        taskToUpdate.RecurDays = referenceTask.RecurDays;
        taskToUpdate.Description = referenceTask.Description;

        _appDbContext.SaveChanges();
    }
}
