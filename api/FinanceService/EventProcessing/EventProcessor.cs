using AutoMapper;
using FinanceService.Data;
using FinanceService.Dtos;
using FinanceService.Models;
using System.Text.Json;

namespace FinanceService.EventProcessing
{
    public class EventProcessor : IEventProcessor
    {
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly IMapper _mapper;

        public EventProcessor(IServiceScopeFactory scopeFactory, IMapper mapper)
        {
            _scopeFactory = scopeFactory; //To generate the repository when we need it
            _mapper = mapper;
        }

        public void ProcessEvent(string message)
        {
            var eventType = DetermineEvent(message);

            //If it gets more complex, should extract handling code into separate methods
            switch (eventType)
            {
                case EventType.CreateForecastPayment:
                    AddForecastPayment(message);
                    break;
                default:
                    break;
            }
        }

        private void AddForecastPayment(string forecastPaymentCreatedMessage)
        {
            using (var scope = _scopeFactory.CreateScope())
            {
                var repo = scope.ServiceProvider.GetRequiredService<IForecastPaymentRepo>(); //To do with service lifetime of repo and event processor

                var forecastPaymentCreate = JsonSerializer.Deserialize<ForecastPaymentCreatedDto>(forecastPaymentCreatedMessage);

                try
                {
                    var forecastPayment = _mapper.Map<ForecastPayment>(forecastPaymentCreate);
                    repo.CreateForecastPayment(forecastPayment);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"--> Could not add Platform too DB {ex.Message}");
                }
            }
        }

        private EventType DetermineEvent(string notificationMessage)
        {
            Console.WriteLine("--> Determining Event");

            var eventType = JsonSerializer.Deserialize<GenericEventDto>(notificationMessage); //Just want to pull the EventDto from the notification (getting the Event property from the object)
            switch (eventType.Event)
            {
                case "Forecast_Payment_Created":
                    Console.WriteLine("--> Forecast Payment Created Event Detected");
                    return EventType.CreateForecastPayment;
                default:
                    Console.WriteLine("--> Could not determine event type");
                    return EventType.Undetermined;
            }
        }
    }

    enum EventType
    {
        CreateForecastPayment,
        Undetermined
    }
}
