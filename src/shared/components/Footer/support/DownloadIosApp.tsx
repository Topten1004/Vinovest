import React from "react";

import AppStore from './assets/AppStore.svg';


export default function DownloadIosApp() {


    return (
     
                <a
                    target={'_blank'}
                    rel={'noopener noreferrer'}
                    href={'https://apps.apple.com/us/app/vinovest-fine-wine-investing/id1569111311'}
                    className={'mr-5'}
                >
                    <img src={AppStore} width={'140'} height={'48'} alt={'App Store'} />
                </a>
      
    );
}
