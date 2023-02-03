using System.Collections.Generic;
using System.Collections;

namespace System.Linq
{
    public static class IEnumerableExtensions
    {
        /*public static IEnumerable ForEach(this IEnumerable collection, Action<object, IEnumerable> action)
        {
            foreach (var itm in collection) action(itm, collection);
            return collection;
        }

        public static IEnumerable ForEach(this IEnumerable collection, Action<object> action)
        {
            foreach (var itm in collection) action(itm);
            return collection;
        }*/

        public static IEnumerable<T> ForEach<T>(this IEnumerable<T> collection, Action<T, IEnumerable<T>> action)
        {
            foreach (var itm in collection) action(itm, collection);
            return collection;
        }

        public static IEnumerable<T> ForEach<T>(this IEnumerable<T> collection, Action<T> action)
        {
            foreach (var itm in collection) action(itm);
            return collection;
        }

        /// <summary>
        /// Apply a projection to the enumerable, nullifying (and optionally removing) items which yield an exception
        /// </summary>
        /// <typeparam name="T">The input type</typeparam>
        /// <typeparam name="TResult">The output type</typeparam>
        /// <param name="collection">The enumberable to apply the projection on</param>
        /// <param name="selection">The projection logic, which is expected to throw an exception under certain conditions</param>
        /// <param name="filter">Apply a filter to remove all null values from the collection</param>
        /// <returns>An enumerable with the projection applied</returns>
        public static IEnumerable<TResult?> TrySelect<T, TResult>(this IEnumerable<T> collection, Func<T, TResult> selection, bool filter = false)
        {
            var result = collection.Select(x =>
            {
                try
                {
                    return selection(x);
                }
                catch
                {
                    return default;
                }
            });
            return filter ? result.Where(x => x is not null) : result;
        }

        public static IEnumerable<T> WhereNotNull<T>(this IEnumerable<T?> collection) => collection.Where(x => x is not null).Cast<T>();

    }
}
