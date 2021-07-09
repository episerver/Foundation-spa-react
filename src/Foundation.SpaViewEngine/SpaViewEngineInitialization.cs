﻿using EPiServer.ContentApi.Core.ContentResult;
using EPiServer.Framework;
using EPiServer.Framework.Initialization;
using EPiServer.ServiceLocation;
using Foundation.SpaViewEngine.Infrastructure;
using Foundation.SpaViewEngine.JsInterop;
using JavaScriptEngineSwitcher.Core;
using JavaScriptEngineSwitcher.V8;
using System;
using System.Linq;
using System.Web.Mvc;
using Foundation.SpaViewEngine.Models.TypeConverters;
using EPiServer.Personalization;

namespace Foundation.SpaViewEngine
{
    [InitializableModule]
    [ModuleDependency(new Type[] { typeof(EPiServer.Web.InitializationModule) } )]
    public class SpaViewEngineInitialization : IConfigurableModule
    {
        /// <summary>
        /// Setup the container to use the ClearScript.V8 JavaScript engine by default. All instances
        /// are loaded through the container, enabling full configuration by using the container 
        /// configuraiton in your implementation.
        /// </summary>
        /// <param name="context">The container context to configure</param>
        public void ConfigureContainer(ServiceConfigurationContext context)
        {
            context.RegisterJavaScriptEngine();
            context.RegisterViewEngine();
            context.RegisterPersonalizationRules();

            context.Services.Intercept<IJsonSerializerConfiguration>((locator, config) => {
                var converters = locator.GetAllInstances<SpaViewJsonConverter>();
                foreach (var converter in converters) if (!config.Settings.Converters.Any(x => x.GetType().Equals(converter.GetType()))) config.Settings.Converters.Add(converter);
                return config;
            });
        }

        public void Initialize(InitializationEngine context)
        {
            context.InjectViewEngine();
        }

        public void Uninitialize(InitializationEngine context)
        {
            context.RemoveViewEngine();
        }
    }

    public static class InitializationExtensions
    {
        public static void RegisterPersonalizationRules(this ServiceConfigurationContext context)
        {
            context.Services.AddSingleton<IPersonalizationEvaluator, SpaViewPersonalizationEvaluator>();
        }

        public static void InjectViewEngine(this InitializationEngine context)
        {
            var engine = context.Locate.Advanced.GetInstance<Infrastructure.SpaViewEngine>();
            ViewEngines.Engines.Insert(0, engine);
        }
        public static void RemoveViewEngine(this InitializationEngine context)
        {
            foreach (var engine in ViewEngines.Engines.OfType<Infrastructure.SpaViewEngine>())
                ViewEngines.Engines.Remove(engine);
        }

        public static void RegisterJavaScriptEngine(this ServiceConfigurationContext context)
        {
            context.Services.AddSingleton(_ => new V8Settings());
            context.Services.AddSingleton(locator => new V8JsEngineFactory(locator.GetInstance<V8Settings>()));
            context.Services.AddSingleton<IJsEngineSwitcher>(locator =>
            {
                var switcher = new JsEngineSwitcher();
                var engineFactory = locator.GetInstance<V8JsEngineFactory>();
                switcher.EngineFactories.Add(engineFactory);
                switcher.DefaultEngineName = engineFactory.EngineName;
                JsEngineSwitcher.Current = switcher;
                return switcher;
            });
            context.Services.AddTransient(locator => {
                var engine = locator.GetInstance<IJsEngineSwitcher>().CreateDefaultEngine();
                engine.ApplyShims();
                engine.AddWindowObject();
                engine.AddCoreJS();
                engine.EnableConsole();
                return engine;
            });
        }

        public static void RegisterViewEngine(this ServiceConfigurationContext context)
        {
            context.Services.AddSingleton<SpaViewCache>();
            context.Services.AddSingleton<SpaSettings>();
            context.Services.AddTransient<Infrastructure.SpaView>();
        }
    }
}
