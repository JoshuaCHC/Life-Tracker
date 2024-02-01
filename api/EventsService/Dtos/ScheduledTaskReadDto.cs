using System.ComponentModel.DataAnnotations;

namespace EventsService.Dtos
{
    public class ScheduledTaskReadDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string DueDate { get; set; }

        public string CompletedDate { get; set; }
        public int CompletedInMinutes { get; set; }

        public int ReferenceTaskId { get; set; }
    }
}
