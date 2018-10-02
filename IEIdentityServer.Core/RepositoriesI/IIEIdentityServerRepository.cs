using Abp.Dependency;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace IEIdentityServer.Core.RepositoriesI
{
    public interface IIEIdentityServerRepository<TEntity>: ITransientDependency where TEntity:class
    {
        void Insert(TEntity entity);

        void Remove(TEntity entity);

        void Modify(TEntity entity);

        TEntity FirstOrDefault(object id);

        TEntity FirstOrDefault(Func<TEntity, bool> func);

        IEnumerable<TEntity> GetAll();

        IEnumerable<TEntity> GetAllInclude(Expression<Func<TEntity, object>>[] propertySelectors);

        void SaveChange();
    }
}
