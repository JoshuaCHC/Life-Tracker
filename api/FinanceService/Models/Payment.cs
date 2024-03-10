using System.ComponentModel.DataAnnotations;

namespace FinanceService.Models;

public class Payment : Transaction
{
    [Required]
    public string Merchant { get; set; }
}
