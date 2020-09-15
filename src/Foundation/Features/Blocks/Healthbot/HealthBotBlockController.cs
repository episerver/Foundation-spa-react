using EPiServer.Framework.DataAnnotations;
using EPiServer.Framework.Web.Resources;
using EPiServer.Web.Mvc;
using Foundation.Features.Shared;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Foundation.Features.Blocks.Healthbot
{
    [TemplateDescriptor(Default = true)]
    public class HealthChatBotBlockController : BlockController<HealthChatbotBlock>
    {
        private readonly IRequiredClientResourceList _requiredClientResourceList;

        public HealthChatBotBlockController(IRequiredClientResourceList requiredClientResourceList)
        {
            _requiredClientResourceList = requiredClientResourceList;
        }

        public override ActionResult Index(HealthChatbotBlock currentBlock)
        {
            _requiredClientResourceList.Require(HealthBotClientResourceProvider.BotJs).AtHeader();
            var model = new BlockViewModel<HealthChatbotBlock>(currentBlock);
            return PartialView("/Features/Blocks/HealthBot/HealthChatBotBlock.cshtml", model);
        }
    }

    [ClientResourceProvider]
    public class HealthBotClientResourceProvider : IClientResourceProvider
    {
        public static string BotJs = "healthbot.webchat";

        public IEnumerable<ClientResource> GetClientResources()
        {
            return new[]
            {
                new ClientResource
                {
                    Name = BotJs,
                    ResourceType = ClientResourceType.Html,
                    InlineContent = @"<script crossorigin=""anonymous"" src=""https://cdn.botframework.com/botframework-webchat/latest/webchat.js""></script>"
                }
            };
        }
    }
}
