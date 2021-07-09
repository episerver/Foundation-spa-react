import React, { useEffect, useState, useRef, FunctionComponent as FC } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { useIContentRepository, Taxonomy, State, useEpiserver } from '@episerver/spa-core';

import useVisible from 'app/CoreComponents/Hooks/useVisible';

export type LanguageSelectorProps = Partial<State.CmsState> & {
    className ?: string
    dispatch ?: (action: State.CmsStateAction) => void
}

export const DefaultLanguageSelector : FC<LanguageSelectorProps> = (props) =>
{
    const repo = useIContentRepository();
    const [ languages, setLanguages ] = useState<Taxonomy.LanguageList>([]);
    const [ container, isOpen, setIsOpen ] = useVisible(false);
    const history = useHistory();
    const ctx = useEpiserver();
    const firstItem = useRef(null)

    // Toggle dropdown handler
    const toggleLanguageMenu = () => {
        setIsOpen(prevState => !prevState);
        if (isOpen) firstItem?.current?.focus();
    }

    const resolveLanguageUrl: (lang : Taxonomy.Language) => URL = (lang) => {
        const spaUrl = new URL(ctx.getSpaBasePath(), ctx.getSpaDomain());
        return new URL(lang.urlSegment, spaUrl);
    }

    // Select language handler
    const selectLanguage = (l: Taxonomy.Language) => {
        if (props.dispatch)
            props.dispatch({ type: 'OptiContentCloud/SetState', currentLanguage: l.name});
        if (l.urlSegment)
            history.push(resolveLanguageUrl(l));
        setIsOpen(false);
    }

    // Load the languages
    useEffect(() => {
        let isCancelled : boolean = false;
        repo.getCurrentWebsite().then(x => {
            if (isCancelled) return;
            setLanguages(x.languages);
        });
        return () => { isCancelled = true; }
    }, []);

    // Only render the selector if we have 1 or more languages
    if (languages.length <= 1)
        return null;

    const resolvedLanguageName = languages.filter(x => x.name === props.currentLanguage).map(x => x.displayName).join(' ');
    return <div className={ `language-selector dropdown${ isOpen ? " show" : ""}${ props.className ? " " + props.className : "" }` } ref={ container }>
        <button role="button" type="button" aria-haspopup="true" aria-expanded={ isOpen ? "true" : "false" } className="dropdown-toggle btn btn-sm btn-outline-light my-auto" onClick={ toggleLanguageMenu } >
            <i className="fas fa-globe" aria-hidden="true"/> { resolvedLanguageName ? resolvedLanguageName : props.currentLanguage }
        </button>
        <ul tabIndex={-1} aria-hidden={ isOpen ? "false" : "true" } role="menu" className={ `dropdown-menu dropdown-menu-end${ isOpen ? " show" : ""}` }>
        { languages.map((x, i) => <li ref={i == 0 ? firstItem : undefined} key={ `lang-${x.name}` }><a href={ resolveLanguageUrl(x).href } tabIndex={ isOpen && x.name !== props.currentLanguage ? 0 : -1 } role="menuitem" onClick={ (event) => {event.preventDefault(); selectLanguage(x); return false;} } className={ `dropdown-item${x.name === props.currentLanguage ? " active" : ''}` }>{ x.displayName }</a></li>) }
        </ul>
    </div>
}

export const ConnectedLanguageSelector = connect((state : State.CmsAppState, ownProps : LanguageSelectorProps ) => { 
    return { ...ownProps, ...(state.OptiContentCloud || {})};
})(DefaultLanguageSelector);

export const LanguageSelector : React.FunctionComponent<LanguageSelectorProps> = (props) =>
{
    const ctx = useEpiserver();
    if (ctx.isServerSideRendering())
        return <DefaultLanguageSelector { ...props } />
    return <ConnectedLanguageSelector { ...props } />
}

export default LanguageSelector;