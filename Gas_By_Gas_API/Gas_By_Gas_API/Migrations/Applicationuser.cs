using Microsoft.AspNet.Identity.EntityFramework;

public class ApplicationUser : IdentityUser
{
    // Add custom properties if needed
    public string FullName { get; set; }
}