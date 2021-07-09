//Import generic libs
import React from 'react';

//Import Episerver Libs
import { Core, Components } from '@episerver/spa-core';

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
    return <header key="MoseyHeader" className="mosey-header bg-primary text-light link-light">
            <div className="header-top">
                <div className="container">
                    <div className="row">
                        <div className="col-2 d-none d-lg-block"></div>
                        <div className="col-8 align-self-center header-top-content text-start text-lg-center my-1"><Components.Property iContent={ props.settings } field="bannerText" /></div>
                        <div className="col-4 col-lg-2 header-top-service"><LanguageSelector className="float-end my-1 me-0"/></div>
                    </div>
                </div>
            </div>
        </header>
}
export default Header;