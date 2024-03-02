using System.ComponentModel.DataAnnotations;

namespace FinanceService.Models
{
    public class ForecastPayment: Transaction
    {
        [Required]
        public int EventId { get; set; }
        public int? PaymentId { get; set; }
        public Payment? Payment { get; set; }
    }
}
