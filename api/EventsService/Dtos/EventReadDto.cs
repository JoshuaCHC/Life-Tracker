namespace EventsService.Dtos;

public class EventReadDto
{
    public int Id { get; set; }

    public string Title { get; set; }

    public string Location { get; set; }

    public bool AllDay { get; set; }

    public string StartDate { get; set; }

    public string EndDate { get; set; }

    public double ExpectedCost { get; set; }
}
