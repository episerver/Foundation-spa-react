//Import generic libs
import React, { useEffect, useState } from 'react';

//Import Episerver Libs
import { Core, Components, Taxonomy, useIContentRepository } from '@episerver/spa-core';

//Import App
import LanguageSelector from './LanguageSelector';
import LayoutSettings from 'app/Models/Content/LayoutSettingsData';
import './Header.scss';

export interface HeaderProps {
    settings: LayoutSettings
    context?: Core.IEpiserverContext
    path?: string
}

export const Header : React.FunctionComponent<HeaderProps> = (props) =>
{
    return <header key="MoseyHeader">
            <div className="header-top">
                <div className="container">
                    <div className="row">
                        <div className="col-2 d-none d-md-block"></div>
                        <div className="col-8 header-top-content text-center"><Components.Property iContent={ props.settings } field="bannerText" /></div>
                        <div className="col-4 col-md-2 header-top-service">
                            <LanguageSelector />
                        </div>
                    </div>
                </div>
            </div>
        </header>
}
export default Header;