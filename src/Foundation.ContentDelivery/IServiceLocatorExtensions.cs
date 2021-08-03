using EPiServer.ServiceLocation;
using System;
using System.Linq;

namespace Foundation.ContentDelivery
{
    public static class ServiceLocatorExtensions
    {
        /// <summary>
        /// Create a new instance of the specified type, using the constructor with the 
        /// most arguments that can either be resolved through the IServiceLocator or from
        /// the provided arguments. This method does not work for types that have multiple
        /// arguments of the same type. Provided arguments take priority over the services
        /// taken from the IServiceLocator
        /// </summary>
        /// <typeparam name="T">The type to create</typeparam>
        /// <param name="locator">The IServiceLocator to use</param>
        /// <param name="args">The argument values to use</param>
        /// <returns>The created instance</returns>
        public static T CreateInstance<T>(this IServiceLocator locator, object[] args)
        {
            var type = typeof(T);
            return (T)locator.CreateInstance(type, args);
        }

        /// <summary>
        /// Create a new instance of the specified type, using the constructor with the 
        /// most arguments that can either be resolved through the IServiceLocator or from
        /// the provided arguments. This method does not work for types that have multiple
        /// arguments of the same type. Provided arguments take priority over the services
        /// taken from the IServiceLocator
        /// </summary>
        /// <param name="type">The type to create</param>
        /// <param name="locator">The IServiceLocator to use</param>
        /// <param name="args">The argument values to use</param>
        /// <returns>The created instance</returns>
        public static object CreateInstance(this IServiceLocator locator, Type type, object[] args)
        {
            if (type.IsGenericType)
                throw new NotSupportedException("The CreateInstance<T> method does not support generic types");

            var constructor = type.GetConstructors()
                .OrderByDescending(c => c.GetParameters().Length)
                .FirstOrDefault(c => c.GetParameters().All(p => args.Any(a => a.GetType() == p.ParameterType) || locator.HasService(p.ParameterType)));

            if (constructor == null)
                throw new NotSupportedException("The CreateInstnace<T> method cannot find a suitable constructor");

            var constructorArgs = constructor.GetParameters().Select(p =>
            {
                var val = args.FirstOrDefault(a => a.GetType() == p.ParameterType);
                if (val != null)
                    return val;
                return locator.GetInstance(p.ParameterType);
            }).ToArray();

            var obj = Activator.CreateInstance(type, constructorArgs);
            return obj;
        }

        /// <summary>
        /// Simple check to see if a service has been registered in an IServiceLocator
        /// </summary>
        /// <typeparam name="T">The service type to search for</param>
        /// <param name="locator">The IServiceLocator to check within</param>
        /// <returns>true if the IServiceLocator has a service definition for this type, false otherwise</returns>
        public static bool HasService<T>(this IServiceLocator locator) => locator.HasService(typeof(T));
        

        /// <summary>
        /// Simple check to see if a service has been registered in an IServiceLocator
        /// </summary>
        /// <param name="locator">The IServiceLocator to check within</param>
        /// <param name="serviceType">The service type to search for</param>
        /// <returns>true if the IServiceLocator has a service definition for this type, false otherwise</returns>
        public static bool HasService(this IServiceLocator locator, Type serviceType)
        {
            try
            {
                var service = locator.GetService(serviceType);
                return service != null;
            }
            catch
            {
                return false;
            }
        }
    }
}
