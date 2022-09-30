import React from 'react';
import { useMediaQuery } from 'react-responsive';

import GooglePlay from './assets/GooglePlay.svg';

export default function DownloadAndroidApp() {
    const isMobileOrTabletPortrait = useMediaQuery({
        query: '(max-width: 1023px)'
    });

    return ( 
                <a
                    style={{ marginLeft: 20 }}
                    target={'_blank'}
                    rel={'noopener noreferrer'}
                    href={'https://play.google.com/store/apps/details?id=co.vinovest.portfolio'}
                >
                    <img src={GooglePlay} width={'160'} height={'48'} alt={'Google Play'} />
                </a>
    );
}