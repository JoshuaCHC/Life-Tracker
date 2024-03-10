using System.ComponentModel.DataAnnotations;

namespace FinanceService.Models;

public class Transaction
{
    [Key]
    [Required]
    public int Id { get; set; }

    [Required]
    public double Amount { get; set; }

    public string? Category { get; set; }

    [Required]
    public DateTime Date { get; set; }

    [Required]
    public bool Debit { get; set; }
}
