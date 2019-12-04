using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace UtilityAction.Web
{
    public class WebModelBinding
    {
        /// <summary>  
        /// 将form表单的值反射到Model中  
        /// </summary>  
        /// <typeparam name="T"></typeparam>  
        /// <param name="form"></param>  
        /// <returns></returns>  
        public static T FormToModel<T>(NameValueCollection form)
        {
            Type t = typeof(T);
            PropertyInfo[] properties = t.GetProperties();
            T obj = Activator.CreateInstance<T>();
            //遍历T里面的字段获得属性  
            foreach (PropertyInfo pro in properties)
            {
                Type convertsionType = pro.PropertyType;
                //获取T的每个字段转换为大写  
                string pi = pro.Name.ToUpper();
                //遍历Form表单里面的控件得到控件的Name  
                foreach (var item in form.Keys)
                {
                    //获取Form表单的控件Name转为大写  
                    string name = item.ToString().ToUpper();
                    //得到表单元素的Value值  
                    var data = form[name];
                    //对比Form中的Name与Model中的字段名，若一样就写入，程序跳出内循环  
                    if (pi == name)
                    {
                        //为T的字段赋值，若数据类型不一致，则进行转换  
                        object value = null;
                        try
                        {
                            //if (convertsionType.Name == "Nullable") {
                            //    convertsionType = convertsionType.
                            //}
                            value = Convert.ChangeType(data, convertsionType);
                            pro.SetValue(obj, value, null);
                            break;
                        }
                        catch
                        {

                        }
                    }
                }
            }
            return obj;
        }
    }
}
