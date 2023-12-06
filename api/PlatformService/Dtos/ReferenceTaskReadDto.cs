namespace PlatformService.Dtos
{
    public class ReferenceTaskReadDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime StartDate { get; set; }

        public int RecurDays { get; set; }
    }
}
