using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Abp.EntityFrameworkCore;
using Abp.EntityFrameworkCore.Repositories;
using IEManageSystem.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace IEManageSystem.Repositorys
{
    public abstract class EfRepositoryBase<TEntity, TPrimaryKey> : EfCoreRepositoryBase<IEManageSystemDbContext, TEntity, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>
    {
        protected EfRepositoryBase(IDbContextProvider<IEManageSystemDbContext> dbContextProvider)
            : base(dbContextProvider)
        {
        }
    }

    public abstract class EfRepositoryBase<TEntity> : EfRepositoryBase<TEntity, int> where TEntity : class, IEntity<int>
    {
        protected EfRepositoryBase(IDbContextProvider<IEManageSystemDbContext> dbContextProvider)
            : base(dbContextProvider)
        {
        }
    }
}
