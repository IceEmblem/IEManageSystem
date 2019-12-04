using System;
using System.Threading.Tasks;
using Abp.TestBase;
using IEManageSystem.EntityFrameworkCore;
using IEManageSystem.Tests.TestDatas;

namespace IEManageSystem.Tests
{
    public class IEManageSystemTestBase : AbpIntegratedTestBase<IEManageSystemTestModule>
    {
        public IEManageSystemTestBase()
        {
            UsingDbContext(context => new TestDataBuilder(context).Build());
        }

        protected virtual void UsingDbContext(Action<IEManageSystemDbContext> action)
        {
            using (var context = LocalIocManager.Resolve<IEManageSystemDbContext>())
            {
                action(context);
                context.SaveChanges();
            }
        }

        protected virtual T UsingDbContext<T>(Func<IEManageSystemDbContext, T> func)
        {
            T result;

            using (var context = LocalIocManager.Resolve<IEManageSystemDbContext>())
            {
                result = func(context);
                context.SaveChanges();
            }

            return result;
        }

        protected virtual async Task UsingDbContextAsync(Func<IEManageSystemDbContext, Task> action)
        {
            using (var context = LocalIocManager.Resolve<IEManageSystemDbContext>())
            {
                await action(context);
                await context.SaveChangesAsync(true);
            }
        }

        protected virtual async Task<T> UsingDbContextAsync<T>(Func<IEManageSystemDbContext, Task<T>> func)
        {
            T result;

            using (var context = LocalIocManager.Resolve<IEManageSystemDbContext>())
            {
                result = await func(context);
                context.SaveChanges();
            }

            return result;
        }
    }
}
