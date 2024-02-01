using EventsService.Models;
using Microsoft.EntityFrameworkCore;

namespace EventsService.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> opt) : base(opt)
        {

        }

        public DbSet<Platform> Platforms { get; set; }

        public DbSet<ReferenceTask> ReferenceTasks { get; set; }

        public DbSet<ScheduledTask> ScheduledTasks { get; set; }

        public DbSet<Event> Events { get; set; }
    }
}
