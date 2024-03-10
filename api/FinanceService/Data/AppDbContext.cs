using FinanceService.Models;
using Microsoft.EntityFrameworkCore;

namespace FinanceService.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> opt) : base(opt)
    {

    }

    public DbSet<Payment> Payments { get; set; }
    public DbSet<ForecastPayment> ForecastPayments { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
    }
}
