using AutoMapper;
using FinanceService.Dtos;
using FinanceService.Dtos.Payments;
using FinanceService.Dtos.Transactions;
using FinanceService.Models;

namespace FinanceService.Profiles
{
    public class PaymentsProfile : Profile
    {
        public PaymentsProfile()
        {
            CreateMap<Payment, PaymentReadDto>().IncludeBase<Transaction, TransactionReadDto>();
            CreateMap<PaymentCreateDto, Payment>().IncludeBase<TransactionCreateDto, Transaction>();
            CreateMap<ForecastPaymentCreatedDto, ForecastPayment>()
                .ForMember(dest => dest.Debit, opt => opt.MapFrom(src => true))
                .ForMember(dest => dest.Amount, opt => opt.MapFrom(src => src.Amount))
                .ForMember(dest => dest.EventId, opt => opt.MapFrom(src => src.EventId))
                .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date));
        }
    }
}
