namespace EventsService.Dtos
{
    public class EventCreateDto
    {
        public string Title { get; set; }

        public bool AllDay { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public double ExpectedCost { get; set; }
    }
}
