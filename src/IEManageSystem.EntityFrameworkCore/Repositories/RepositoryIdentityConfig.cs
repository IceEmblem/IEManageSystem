using Abp.Domain.Entities;
using Abp.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using IEManageSystem.EntityFrameworkCore.IdentityServiceEF;
using IEManageSystem.CustomRepositoryI;
using IdentityServer4.EntityFramework.DbContexts;

namespace IEManageSystem.Repositories
{
    public class RepositoryIdentityConfig<TEntity, TPrimaryKey> : RepositoryIdentityConfigBase<TEntity, TPrimaryKey>, IRepositoryIdentityConfig<TEntity, TPrimaryKey> where TEntity: class, IEntity<TPrimaryKey>
    {
        public RepositoryIdentityConfig(IDbContextProvider<IEConfigurationDbContext> dbContextProvider)
        : base(dbContextProvider)
        {
        }

        public IEnumerable<TEntity> GetAllListIncluding(Expression<Func<TEntity, bool>> wheres, Expression<Func<TEntity, object>> propertySelectors)
        {
            return Context.Set<TEntity>().Include(propertySelectors).Where(wheres);
        }
    }

    public class RepositoryIdentityConfig<TEntity> : RepositoryIdentityConfigBase<TEntity>, IRepositoryIdentityConfig<TEntity> where TEntity : class, IEntity<int>
    {
        public RepositoryIdentityConfig(IDbContextProvider<IEConfigurationDbContext> dbContextProvider)
        : base(dbContextProvider)
        {
        }

        public IQueryable<TEntity> AsNoTracking(Expression<Func<TEntity, object>>[] includes)
        {
            IQueryable<TEntity> list = Context.Set<TEntity>();
            foreach (var item in includes) {
                list = list.Include(item);
            }

            return list.AsNoTracking();
        }

        public void IncludeLoadCollection(TEntity obj)
        {
            var entityEntry = Context.Entry(obj);
            foreach (var collection in entityEntry.Collections)
            {
                if (collection.IsLoaded)
                {
                    continue;
                }

                collection.Load();
            }
        }
    }
}
