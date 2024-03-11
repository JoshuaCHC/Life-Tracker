using System.ComponentModel.DataAnnotations;

namespace EventsService.Models;

public class ReferenceTask
{
    [Key]
    [Required]
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public string Description { get; set; }

    [Required]
    public DateTime StartDate { get; set; }

    public int RecurDays { get; set; }
}
