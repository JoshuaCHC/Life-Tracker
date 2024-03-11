using FinanceService.Models;

namespace FinanceService.Data;

public class ForecastPaymentRepo : IForecastPaymentRepo
{
    private readonly AppDbContext _appDbContext;

    public ForecastPaymentRepo(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public void CreateForecastPayment(ForecastPayment forecastPayment)
    {
        if (forecastPayment is null)
        {
            throw new ArgumentNullException(nameof(forecastPayment));
        }
        _appDbContext.ForecastPayments.Add(forecastPayment);
        _appDbContext.SaveChanges();
    }

    public IEnumerable<ForecastPayment> GetAllForecastPayments()
    {
        return _appDbContext.ForecastPayments.ToList();
    }

    public ForecastPayment GetForecastPaymentById(int id)
    {
        return _appDbContext.ForecastPayments.FirstOrDefault(payment => payment.Id == id);
    }

    public void UpdateForecastPayment(ForecastPayment payment)
    {
        throw new NotImplementedException();
    }
}
