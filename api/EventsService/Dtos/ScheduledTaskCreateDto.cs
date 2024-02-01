namespace EventsService.Dtos
{
    public class ScheduledTaskCreateDto
    {
        public string Name { get; set; }
        public DateTime DueDate { get; set; }
        public int ReferenceTaskId { get; set; }
    }
}
