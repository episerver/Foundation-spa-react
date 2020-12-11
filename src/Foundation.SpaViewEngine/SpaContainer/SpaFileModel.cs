using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Foundation.SpaViewEngine.SpaContainer
{
    public class SpaFileModel
    {
        public virtual byte[] FileBytes { get; set; }
        public virtual string FileType { get; set; }
    }
}
