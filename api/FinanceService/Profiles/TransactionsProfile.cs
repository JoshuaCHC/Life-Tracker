using AutoMapper;
using FinanceService.Dtos.Transactions;
using FinanceService.Models;

namespace FinanceService.Profiles
{
    public class TransactionsProfile: Profile
    {
        public TransactionsProfile() 
        {
            CreateMap<Transaction, TransactionReadDto>();
            CreateMap<TransactionCreateDto, Transaction>();
        }
    }
}
