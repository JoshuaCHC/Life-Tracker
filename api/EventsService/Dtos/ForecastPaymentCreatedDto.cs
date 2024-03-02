namespace EventsService.Dtos
{
    public class ForecastPaymentCreatedDto
    {
        public int EventId { get; set; }
        public double Amount { get; set; }
        public DateTime Date { get; set; }
        public string Event { get; set; }
    }
}
