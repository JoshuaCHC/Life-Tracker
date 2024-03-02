using EventsService.Dtos;
using RabbitMQ.Client;
using System.Text;
using System.Text.Json;

namespace EventsService.AsyncDataServices
{
    public class MessageBusClient : IMessageBusClient
    {
        private readonly IConfiguration _configuration;
        private readonly IConnection _connection;
        private readonly IModel _channel;

        public MessageBusClient(IConfiguration configuration)
        {
            _configuration = configuration;
            var factory = new ConnectionFactory() { HostName = _configuration["RabbitMQHost"], Port = int.Parse(_configuration["RabbitMQPort"]) };
            try
            {
                _connection = factory.CreateConnection();
                _channel = _connection.CreateModel();
                _channel.ExchangeDeclare(exchange: "trigger", type: ExchangeType.Fanout);

                _connection.ConnectionShutdown += RabbitMQ_ConnectionShutdown;

                Console.WriteLine("--> RabbitMQ Connection Created");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"--> Creating RabbitMQ Connection failed with message: {ex.Message}");
            }
        }
        public void CreateForecastPayment(ForecastPaymentCreatedDto forecastPayment)
        {
            var message = JsonSerializer.Serialize(forecastPayment);

            if (_connection.IsOpen)
            {
                Console.WriteLine($"--> RabbitMQ Connection open, sending message: {message}");
                SendMessage(message);
            }
            else
            {
                //should do retries, etc in here
                Console.WriteLine($"--> RabbitMQ Connection closed");
            }
        }


        //When class dies, calls this
        public void Dispose()
        {
            Console.WriteLine("--> Message Bus disposed");
            if (_channel.IsOpen)
            {
                _channel.Close();
                _connection.Close();
            }
        }
        private void SendMessage(string message)
        {
            var body = Encoding.UTF8.GetBytes(message);

            _channel.BasicPublish(exchange: "trigger", routingKey: "", basicProperties: null, body: body);
            Console.WriteLine("--> Message sent");
        }

        private void RabbitMQ_ConnectionShutdown(object sender, ShutdownEventArgs args)
        {
            Console.WriteLine("--> Connection shutdown");
        }
    }
}
