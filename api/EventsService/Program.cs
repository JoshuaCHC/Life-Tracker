using EventsService.AsyncDataServices;
using EventsService.Data;
using Microsoft.EntityFrameworkCore;
internal class Program
{
    private static void Main(string[] args)
    {
        //TODO Cleanup
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        if (builder.Configuration["UseInMemory"] == "y")
        {
            builder.Services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("InMem"));
        }
        else
        {
            builder.Services.AddDbContext<AppDbContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("EventsConn")));
        }

        builder.Services.AddScoped<IScheduledTaskRepo, ScheduledTaskRepo>();
        builder.Services.AddScoped<IEventRepo, EventRepo>();
        builder.Services.AddScoped<ReferenceTaskRepo>();
        builder.Services.AddScoped<IReferenceTaskRepo, CachedReferenceTaskRepo>(); //Injecting the IReferenceTaskRepo into the cached version

        builder.Services.AddSingleton<IMessageBusClient, MessageBusClient>();

        builder.Services.AddControllers();
        builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        builder.Services.AddCors(c => { c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin()); });
        builder.Services.AddMemoryCache();
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

        app.UseRouting();
        app.UseCors(cors => cors.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            //Get protos from different service
        }
        );
        app.MapControllers();

        app.Run();
    }
}