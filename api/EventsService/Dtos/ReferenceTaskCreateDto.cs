namespace EventsService.Dtos;

public class ReferenceTaskCreateDto
{
    public string Name { get; set; }

    public string Description { get; set; }

    public string StartDate { get; set; }

    public int RecurDays { get; set; }
}
