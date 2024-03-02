using FinanceService.Models;

namespace FinanceService.Data
{
    public interface IForecastPaymentRepo
    {
        IEnumerable<ForecastPayment> GetAllForecastPayments();

        ForecastPayment GetForecastPaymentById(int id);

        void UpdateForecastPayment(ForecastPayment payment);

        void CreateForecastPayment(ForecastPayment payment);
    }
}
