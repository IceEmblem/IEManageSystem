using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes.AuthorizationNodes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Configures.ApiAuthorization
{
    public class ApiScopeNodeConfigure : IEntityTypeConfiguration<ApiScopeNode>
    {
        public void Configure(EntityTypeBuilder<ApiScopeNode> builder)
        {
            builder.HasDiscriminator().HasValue<ApiManageScope>("ApiManageScope").HasValue<ApiQueryScope>("ApiQueryScope");
        }
    }
}
