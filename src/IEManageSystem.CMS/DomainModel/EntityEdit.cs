using Abp.Domain.Values;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CMS.DomainModel
{
    public class EntityEdit : ValueObject
    {
        protected EntityEdit() { 
        }

        public EntityEdit(int editorId, string name, string headSculpture) {
            EditorId = editorId;
            Name = name;
            HeadSculpture = headSculpture;
            Time = DateTime.Now;
        }

        public int EditorId { get; protected set; }

        public string Name { get; protected set; }

        public string HeadSculpture { get; protected set; }

        public DateTime Time { get; protected set; }

        protected override IEnumerable<object> GetAtomicValues()
        {
            return new List<object>()
            {
                EditorId,Name,HeadSculpture,Time
            };
        }
    }
}
