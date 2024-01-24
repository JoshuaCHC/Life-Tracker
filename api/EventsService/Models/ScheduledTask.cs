using System.ComponentModel.DataAnnotations;

namespace EventsService.Models
{
    public class ScheduledTask
    {
        [Key]
        [Required]
        public int Id { get; set; }

        public string Name { get; set; }

        public DateTime DueDate { get; set; }

        public DateTime? CompletedDate { get; set; }
        public int? CompletedInMinutes { get; set; }

        public int ReferenceTaskId { get; set; }
    }
}
