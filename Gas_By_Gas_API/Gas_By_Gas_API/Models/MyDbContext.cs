using Gas_By_Gas_API.Models;
using System.Data.Entity;

public class MyDbContext : DbContext
{
    public MyDbContext() : base("DefaultConnection") // Replace with your connection string name
    {
    }

    // Define DbSets for your entities
    public DbSet<MyEntity> MyEntities { get; set; }


    public static MyDbContext Create()
    {
        return new MyDbContext();
    }
}