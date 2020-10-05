/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from 'react';

import { isUnknownCountry } from './countries';

export interface Props {
    countryCode?: string;
    className?: string;
}

interface StateProps {
    x1?: any;
    x2?: any;
}

const size = 24;

const loadImage = (imageName: string, size: number) => {
    return import(`../../assets/images/flags-iso/shiny/${size}/${imageName}.png`).catch((err) => console.log(err));
};

export const Flag = ({ className, countryCode = 'unknown' }: Props) => {
    const [state, setState] = useState<StateProps>();

    useEffect(() => {
        const imageName = isUnknownCountry(countryCode) ? '_unknown' : countryCode;
        Promise.all([loadImage(imageName, size), loadImage(imageName, size * 2)]).then((resp) =>
            setState({ ...state, x1: resp[0].default, x2: resp[1].default }),
        );
    }, [countryCode, state]);

    if (!state?.x1 && !state?.x2) {
        return null;
    }

    return (
        <img
            className={className}
            srcSet={`${state.x1} 1x, ${state.x2} 2x`}
            src={state.x1}
            alt={countryCode}
            width={size}
        />
    );
};
