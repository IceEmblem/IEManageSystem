using IEManageSystem.Configuration;
using IEManageSystem.Web;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace IEManageSystem.EntityFrameworkCore
{
    /* This class is needed to run EF Core PMC commands. Not used anywhere else */
    public class IEManageSystemDbContextFactory : IDesignTimeDbContextFactory<IEManageSystemDbContext>
    {
        public IEManageSystemDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<IEManageSystemDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            DbContextOptionsConfigurer.Configure(
                builder,
                configuration.GetConnectionString(IEManageSystemConsts.ConnectionStringName),
                configuration.GetSection("ConnectionType").Value
            );

            return new IEManageSystemDbContext(builder.Options);
        }
    }
}