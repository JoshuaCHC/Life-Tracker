using EventsService.Dtos;

namespace EventsService.AsyncDataServices
{
    public interface IMessageBusClient
    {
        void PublishNewPlatform(PlatformPublishedDto platform);
    }
}
