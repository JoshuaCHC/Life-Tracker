using FinanceService.AsyncDataServices;
using FinanceService.Data;
using FinanceService.EventProcessing;
using Microsoft.EntityFrameworkCore;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("InMem"));
        builder.Services.AddScoped<IForecastPaymentRepo, ForecastPaymentRepo>();
        builder.Services.AddScoped<IPaymentRepo, PaymentRepo>();
        builder.Services.AddControllers();

        builder.Services.AddHostedService<MessageBusSubscriber>();
        builder.Services.AddSingleton<IEventProcessor, EventProcessor>();
        builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}