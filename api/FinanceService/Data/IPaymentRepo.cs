using FinanceService.Models;

namespace FinanceService.Data;

public interface IPaymentRepo
{
    IEnumerable<Payment> GetAllPayments();

    Payment GetPaymentById(int id);

    void UpdatePayment(Payment payment);

    void CreatePayment(Payment payment);
}
