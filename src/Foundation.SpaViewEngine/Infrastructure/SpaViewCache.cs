using EPiServer.Core;
using EPiServer.Framework.Cache;
using EPiServer.Security;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Foundation.SpaViewEngine.Infrastructure
{
    public class SpaViewCache
    {
        protected readonly ISynchronizedObjectInstanceCache _cache;
        protected readonly IContentVersionRepository _contentVersionRepository;
        protected readonly IContentCacheKeyCreator _cacheKeyCreator;

        public virtual string ScopeName => GetType().Name;

        /// <summary>
        /// Only enable the cache for public requests. If the request is for an authenticated 
        /// user, disable the cache.
        /// </summary>
        public virtual bool IsEnabled => !PrincipalInfo.CurrentPrincipal.Identity.IsAuthenticated;

        public SpaViewCache(
            ISynchronizedObjectInstanceCache synchronizedObjectInstanceCache,
            IContentVersionRepository contentVersionRepository,
            IContentCacheKeyCreator cacheKeyCreator
        ) {
            _cache = synchronizedObjectInstanceCache;
            _contentVersionRepository = contentVersionRepository;
            _cacheKeyCreator = cacheKeyCreator;
        }

        public string CreateCacheKey(string uniquePart) => CreateCacheKey(uniquePart, CacheType.Generic, null, string.Empty);
        public string CreateCacheKey(string uniquePart, CacheType cacheType) => CreateCacheKey(uniquePart, cacheType, null, string.Empty);
        public string CreateCacheKey(CacheType cacheType) => CreateCacheKey(string.Empty, cacheType, null, string.Empty);
        public string CreateCacheKey(CacheType cacheType, IContent forContent) => CreateCacheKey(string.Empty, cacheType, forContent, string.Empty);
        public string CreateCacheKey(CacheType cacheType, IContent forContent, string action) => CreateCacheKey(string.Empty, cacheType, forContent, action);
        public string CreateCacheKey(string uniquePart, CacheType cacheType, IContent forContent) => CreateCacheKey(uniquePart, cacheType, forContent, string.Empty);
        public string CreateCacheKey(string uniquePart, CacheType cacheType, IContent forContent, string action)
        {
            var iContentCacheKey = forContent == null ? string.Empty : GetVersionKey(forContent.ContentLink);
            var key = string.Join(":", (new string[] { ScopeName, uniquePart, cacheType.ToString(), iContentCacheKey, action }).Where(s => !string.IsNullOrWhiteSpace(s)));
            return key;
        }

        public bool TryGet<T>(string cacheKey, ReadStrategy strategy, out T instance) where T : class
        {
            if (!IsEnabled)
            {
                instance = null;
                return false;
            }
            return _cache.TryGet(cacheKey, strategy, out instance);
        }

        public void Insert(string cacheKey, object data) => Insert(cacheKey, data, new ContentReference[0]);
        public void Insert(string cacheKey, object data, IContent forContent) => Insert(cacheKey, data, new ContentReference[] { forContent.ContentLink });
        public void Insert(string cacheKey, object data, IEnumerable<IContent> forContents) => Insert(cacheKey, data, forContents.Select(c => c.ContentLink));
        public void Insert(string cacheKey, object data, ContentReference forContent) => Insert(cacheKey, data, new ContentReference[] { forContent });
        public void Insert(string cacheKey, object data, IEnumerable<ContentReference> forContents)
        {
            if (!IsEnabled) return;
            var masterKeys = forContents == null ? new List<string>() : forContents.SelectMany(c => GetMasterKeys(c));
            var policy = new CacheEvictionPolicy(
                expiration: TimeSpan.FromMinutes(60),
                timeoutType: CacheTimeoutType.Sliding,
                cacheKeys: new string[0],
                masterKeys: masterKeys
            );
            _cache.Insert(cacheKey, data, policy);
        }

        /// <summary>
        /// Convert a contentLink to a versionned cache key
        /// </summary>
        /// <see cref="https://getadigital.com/blog/obtaining-a-cache-dependency-key/"/>
        /// <param name="contentLink">The contentLink to get the version key</param>
        /// <returns>The cache key</returns>
        protected virtual string GetVersionKey(ContentReference contentLink)
        {
            if (contentLink.WorkID > 0)
                return _cacheKeyCreator.CreateVersionCacheKey(contentLink);

            var latestPublishedVersion = _contentVersionRepository.List(contentLink).FirstOrDefault(v => v.Status == VersionStatus.Published);
            if (latestPublishedVersion != null)
                return _cacheKeyCreator.CreateVersionCacheKey(latestPublishedVersion.ContentLink);
            
            return _cacheKeyCreator.CreateCommonCacheKey(contentLink);
        }

        protected virtual string GetCommonVersionKey(ContentReference contentLink)
        {
            if (contentLink.WorkID > 0)
                return _cacheKeyCreator.CreateVersionCacheKey(contentLink);

            var latestPublishedVersion = _contentVersionRepository.List(contentLink).FirstOrDefault(v => v.Status == VersionStatus.Published);
            if (latestPublishedVersion != null)
                return _cacheKeyCreator.CreateVersionCommonCacheKey(latestPublishedVersion.ContentLink);

            return _cacheKeyCreator.CreateCommonCacheKey(contentLink);
        }

        protected virtual IEnumerable<string> GetMasterKeys(ContentReference contentLink)
        {
            var keys = new List<string>();
            keys.Add(_cacheKeyCreator.CreateCommonCacheKey(contentLink));
            keys.Add(_cacheKeyCreator.CreateVersionCommonCacheKey(contentLink));
            /*if (contentLink.WorkID > 0)
                keys.Add(_cacheKeyCreator.CreateVersionCacheKey(contentLink));
            else
            {
                var latestPublishedVersion = _contentVersionRepository.List(contentLink).FirstOrDefault(v => v.Status == VersionStatus.Published);
                if (latestPublishedVersion != null)
                    keys.Add(_cacheKeyCreator.CreateVersionCacheKey(latestPublishedVersion.ContentLink));
            }*/
            return keys;
        }
    }

    public enum CacheType
    {
        Generic,
        Context,
        RenderData,
        Asset
    }
}
