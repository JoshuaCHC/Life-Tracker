using System.ComponentModel.DataAnnotations;

namespace FinanceService.Dtos.Transactions
{
    public class TransactionReadDto
    {
        public int Id { get; set; }

        public double Amount { get; set; }

        public string Category { get; set; }

        public DateTime Date { get; set; }

        public bool Debit { get; set; }
    }
}
