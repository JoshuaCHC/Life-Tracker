using FinanceService.Models;

namespace FinanceService.Data
{
    public class PaymentRepo : IPaymentRepo
    {
        private readonly AppDbContext _appDbContext;

        public PaymentRepo(AppDbContext appDbContext) 
        {
            _appDbContext = appDbContext;
        }

        public void CreatePayment(Payment payment)
        {
            if (payment is null)
            {
                throw new ArgumentNullException(nameof(payment));
            }
            _appDbContext.Payments.Add(payment);
            _appDbContext.SaveChanges();
        }

        public IEnumerable<Payment> GetAllPayments()
        {
            return _appDbContext.Payments.ToList();
        }

        public Payment GetPaymentById(int id) 
        {
            return _appDbContext.Payments.FirstOrDefault(payment => payment.Id == id);
        }

        public void UpdatePayment(Payment payment)
        {
            throw new NotImplementedException();
        }
    }
}
