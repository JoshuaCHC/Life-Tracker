using EventsService.Dtos;

namespace EventsService.AsyncDataServices;

public interface IMessageBusClient
{
    void CreateForecastPayment(ForecastPaymentCreatedDto platform);
}
