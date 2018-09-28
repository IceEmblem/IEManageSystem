using Abp.Domain.Entities;
using Abp.EntityFrameworkCore;
using Abp.EntityFrameworkCore.Repositories;
using IdentityServer4.EntityFramework.DbContexts;
using IEManageSystem.EntityFrameworkCore.IdentityServiceEF;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Repositories
{
    public class RepositoryIdentityConfigBase<TEntity, TPrimaryKey> : EfCoreRepositoryBase<IEConfigurationDbContext, TEntity, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>
    {
        public RepositoryIdentityConfigBase(IDbContextProvider<IEConfigurationDbContext> dbContextProvider)
            : base(dbContextProvider)
        {
        }

        //add common methods for all repositories
    }

    //A shortcut for entities those have integer Id
    public class RepositoryIdentityConfigBase<TEntity> : EfCoreRepositoryBase<IEConfigurationDbContext, TEntity, int>
        where TEntity : class, IEntity<int>
    {
        public RepositoryIdentityConfigBase(IDbContextProvider<IEConfigurationDbContext> dbContextProvider)
            : base(dbContextProvider)
        {
        }

        //do not add any method here, add to the class above (because this class inherits it)
    }
}
