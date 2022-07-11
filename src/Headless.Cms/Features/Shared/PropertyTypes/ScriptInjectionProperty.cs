using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using EPiServer.PlugIn;
using EPiServer.Shell.ObjectEditing;
using EPiServer.SpecializedProperties;
using EPiServer.Web;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace HeadlessCms.Features.Shared.PropertyTypes {
    public class ScriptInjectionModel
    {
        [Required]
        [CultureSpecific]
        [AllowedTypes(typeof(PageData))]
        [Display(Name = "Root (Scripts will inject for this page and all children pages)", Description = "Scripts will inject for this page and all children pages", Order = 10)]
        public virtual ContentReference ScriptRoot { get; set; }

        //[AllowedTypes(typeof(CodingFile))]
        [Display(Name = "Script files", Order = 20)]
        public virtual IList<ContentReference> ScriptFiles { get; set; }

        [UIHint(UIHint.Textarea)]
        [Display(Name = "External Scripts", Order = 30)]
        public virtual string ExternalScripts { get; set; }

        [UIHint(UIHint.Textarea)]
        [Display(Name = "Inline Scripts", Order = 40)]
        public virtual string InlineScripts { get; set; }
    }

    [PropertyDefinitionTypePlugIn]
    public class ScriptInjectionProperty : PropertyList<ScriptInjectionModel>
    {
    }
}