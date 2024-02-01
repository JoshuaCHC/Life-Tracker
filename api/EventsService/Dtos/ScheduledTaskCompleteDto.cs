namespace EventsService.Dtos
{
    public class ScheduledTaskCompleteDto
    {
        public int Id { get; set; }
        public string CompletedDate { get; set; }
        public int CompletedInMinutes { get; set; }
        public int ReferenceTaskId { get; set; }
    }
}
