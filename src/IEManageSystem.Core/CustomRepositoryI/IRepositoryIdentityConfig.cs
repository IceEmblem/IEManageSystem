using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace IEManageSystem.CustomRepositoryI
{
    public interface IRepositoryIdentityConfig<TEntity, TPrimaryKey> : IRepository<TEntity, TPrimaryKey> where TEntity : class, IEntity<TPrimaryKey>
    {
        IEnumerable<TEntity> GetAllListIncluding(Expression<Func<TEntity, bool>> wheres, Expression<Func<TEntity, object>> propertySelectors);
    }

    public interface IRepositoryIdentityConfig<TEntity> : IRepository<TEntity, int> where TEntity : class, IEntity<int>
    {
        IQueryable<TEntity> AsNoTracking(Expression<Func<TEntity, object>>[] includes);

        void IncludeLoadCollection(TEntity entity);
    }
}
