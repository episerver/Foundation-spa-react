using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using EPiServer.PlugIn;
using EPiServer.Shell.ObjectEditing;
using EPiServer.SpecializedProperties;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace HeadlessCms.Features.Shared.PropertyTypes 
{
    
    public class SelectionItem
    {
        public virtual string Text { get; set; }
        public virtual string Value { get; set; }
    }
    
    [PropertyDefinitionTypePlugIn]
    public class SelectionItemProperty : PropertyList<SelectionItem>
    {
    }
}