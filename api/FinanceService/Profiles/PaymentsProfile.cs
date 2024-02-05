using AutoMapper;
using FinanceService.Dtos.Payments;
using FinanceService.Dtos.Transactions;
using FinanceService.Models;
using PlatformService;

namespace FinanceService.Profiles
{
    public class PaymentsProfile : Profile
    {
        public PaymentsProfile()
        {
            CreateMap<Payment, PaymentReadDto>().IncludeBase<Transaction, TransactionReadDto>();
            CreateMap<PaymentCreateDto, Payment>().IncludeBase<TransactionCreateDto, Transaction>();
        }
    }
}
