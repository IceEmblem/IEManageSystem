using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CMS.DomainModel
{
    public interface ISingleData
    {
        string Name { get; set; }

        int SortIndex { get; set; }

        string Field1 { get; set; }

        string Field2 { get; set; }

        string Field3 { get; set; }

        string Field4 { get; set; }

        string Field5 { get; set; }
    }
}
