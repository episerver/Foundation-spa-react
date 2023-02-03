"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.languageFilter = exports.hostnameFilter = void 0;
const hostnameFilter = (website, host, language, matchWildcard = true) => {
    const matchHost = (website.hosts ? website.hosts.filter(h => {
        if (matchWildcard && h.name === '*')
            return true;
        if (h.name !== host)
            return false;
        return language && h.language ? language === h.language.name : true;
    }) : []).length > 0;
    return matchHost;
};
exports.hostnameFilter = hostnameFilter;
const languageFilter = (website, language) => {
    if (!language)
        return true;
    const matchLang = !language || (website.languages ? website.languages.filter(l => {
        return l.name === language;
    }) : []).length > 0;
    return matchLang;
};
exports.languageFilter = languageFilter;
//# sourceMappingURL=website.js.map