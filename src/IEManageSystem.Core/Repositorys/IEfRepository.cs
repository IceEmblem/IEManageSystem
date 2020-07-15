using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace IEManageSystem.Repositorys
{
    public interface IEfRepository<TEntity, TPrimaryKey> : IRepository<TEntity, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>
    {
        IQueryable<TEntity> ThenInclude<ThenType>(
            Expression<Func<TEntity, IEnumerable<ThenType>>> includePath,
            Expression<Func<ThenType, object>> thenIncludePath);

        IQueryable<TEntity> ThenInclude<ThenType, ThenThenType>(
            Expression<Func<TEntity, IEnumerable<ThenType>>> includePath,
            Expression<Func<ThenType, IEnumerable<ThenThenType>>> thenIncludePath,
            Expression<Func<ThenThenType, object>> thenThenIncludePath
            );

        void NoTracking();

        void Tracking();
    }
}
