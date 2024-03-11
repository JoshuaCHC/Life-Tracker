using FinanceService.Dtos.Transactions;

namespace FinanceService.Dtos.Payments;

public class PaymentCreateDto : TransactionCreateDto
{
    public string Merchant { get; set; }
}
