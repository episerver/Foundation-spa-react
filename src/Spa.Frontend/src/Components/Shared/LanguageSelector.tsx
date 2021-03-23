import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useIContentRepository, Taxonomy, State, Services, useEpiserver } from '@episerver/spa-core';

export type LanguageSelectorProps = Partial<State.CmsState> & {
    dispatch ?: (action: State.CmsStateAction) => void
}

export const LanguageSelector : React.FunctionComponent<LanguageSelectorProps> = (props) =>
{
    const repo = useIContentRepository();
    const [ languages, setLanguages ] = useState<Taxonomy.LanguageList>([]);
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const history = useHistory();
    const ctx = useEpiserver();

    // Toggle dropdown handler
    const toggleLanguageMenu = () => setIsOpen(prevState => !prevState);

    // Select language handler
    const selectLanguage = (l: Taxonomy.Language) => {
        if (props.dispatch)
            props.dispatch({ type: 'OptiContentCloud/SetState', currentLanguage: l.name});
        if (l.urlSegment)
            history.push(ctx.getSpaRoute(l.urlSegment));
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
    return <Dropdown isOpen={ isOpen } toggle={ toggleLanguageMenu } size="sm" className="language-selector">
        <DropdownToggle caret color="link"><i className="fas fa-globe"></i> { resolvedLanguageName ? resolvedLanguageName : props.currentLanguage }</DropdownToggle>
        <DropdownMenu>
            { languages.map(x => <DropdownItem key={ `lang-${x.name}` } onClick={ () => selectLanguage(x) } active={ x.name === props.currentLanguage }>{ x.displayName }</DropdownItem>) }
        </DropdownMenu>
    </Dropdown>
}

export const ConnectedLanguageSelector = connect((state : State.CmsAppState ) => state.OptiContentCloud || {})(LanguageSelector);

export default ConnectedLanguageSelector;