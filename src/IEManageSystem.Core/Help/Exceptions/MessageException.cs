using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Help.Exceptions
{
    public class MessageException : Exception
    {
        public MessageException() : base()
        {
        }

        public MessageException(string message) : base(message)
        {
        }

        public MessageException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
