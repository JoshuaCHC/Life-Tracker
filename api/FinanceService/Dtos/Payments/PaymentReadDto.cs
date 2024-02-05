using FinanceService.Dtos.Transactions;

namespace FinanceService.Dtos.Payments
{
    public class PaymentReadDto : TransactionReadDto
    {
        public string Merchant { get; set; }
    }
}
