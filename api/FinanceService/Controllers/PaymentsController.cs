using AutoMapper;
using FinanceService.Data;
using FinanceService.Dtos;
using FinanceService.Dtos.Payments;
using FinanceService.Models;
using Microsoft.AspNetCore.Mvc;

namespace FinanceService.Controllers
{
    [Route("api/c/payments")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentRepo _repo;
        private readonly IForecastPaymentRepo _forecastPaymentRepo;
        private readonly IMapper _mapper;
        public PaymentsController(IPaymentRepo repo, IForecastPaymentRepo forecastPaymentRepo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
            _forecastPaymentRepo = forecastPaymentRepo;
        }

        [HttpGet]
        public ActionResult<IEnumerable<PaymentReadDto>> GetPayments()
        {
            var payments = _repo.GetAllPayments();
            return Ok(_mapper.Map<IEnumerable<PaymentReadDto>>(payments));
        }

        [HttpGet("forcastPayment")]
        public ActionResult<IEnumerable<ForecastPayment>> GetForecastPayments()
        {
            var payments = _forecastPaymentRepo.GetAllForecastPayments();
            return Ok(payments);
        }

        [HttpPost]
        public ActionResult<PaymentReadDto> CreatePayment(PaymentCreateDto dto)
        {
            var payment = _mapper.Map<Payment>(dto);

            _repo.CreatePayment(payment);

            var paymentReadDto = _mapper.Map<PaymentReadDto>(payment);
            return CreatedAtRoute(nameof(GetPaymentById), new { id = payment.Id }, paymentReadDto);
        }

        [HttpGet("{id}", Name = "GetPaymentById")]
        public ActionResult<PaymentReadDto> GetPaymentById(int id)
        {
            var payment = _repo.GetPaymentById(id);

            if (payment == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<PaymentReadDto>(payment));
        }
    }
}
