import type { Website } from '../models'

export const hostnameFilter : (website: Readonly<Website>, host: string, language ?: string, matchWildcard ?: boolean) => boolean = (website, host, language, matchWildcard = true) =>
{
    const matchHost = (website.hosts ? website.hosts.filter(h => {
        if (matchWildcard && h.name === '*') return true;
        if (h.name !== host) return false;
        return language && h.language ? language === h.language : true;
    }) : []).length > 0;
    return matchHost;
}

export const languageFilter : (website: Readonly<Website>, language ?: string) => boolean = (website, language) =>
{
    if (!language) return true;
    const matchLang = !language || (website.languages ? website.languages.filter(l => {
        return l.name === language;
    }) : []).length > 0;
    return matchLang
}