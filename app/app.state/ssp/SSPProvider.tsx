import React, { useState } from 'react';
import { createContextProvider } from '@utils';
import { CoverageArea } from '@device';
import type { SSPContextValue } from './types';

/**
 *   SSP Context Provider
 *   ---
 *
 *
 *   Events Handlers
 *
 *         - fetchCoverageArea - Fetch Coverage Areas
 *         ---
 *
 */

const [SSPContext, useSSPContext] = createContextProvider<SSPContextValue>();

function SSPProvider(props: { children: React.ReactNode }) {
    /**
     *   SSP Provider State
     *   ---
     **/

    const [coverage_areas, setCoverageAreas] = React.useState<CoverageArea[]>([]);
    const [close_alarm_reasons, setCloseAlarmReasons] = React.useState<string[]>([]);

    /**
     *   SSP Action Handler
     *   ---
     **/

    return (
        <SSPContext.Provider value={{ coverage_areas, close_alarm_reasons }}>
            {props.children}
        </SSPContext.Provider>
    );
}

export default {
    Provider: SSPProvider,
    useContext: useSSPContext,
};

/*

====================================================================================================
 ‣ SSP Context Provider
====================================================================================================


const close_reasons_response = await api.fetchCloseAlarmReasons();
    if ('alarm_close_reasons' in close_reasons_response) {
        updateState({
            payload: close_reasons_response.alarm_close_reasons,
            type: 'STORE_CLOSE_ALARM_REASONS',
        });
    }

    const security_password_options = await api.generatePasswordOptions();
    if ('security_question_answers' in security_password_options) {
        updateState({
            payload: security_password_options.security_question_answers,
            type: 'STORE_SECURITY_PASSWORD_OPTIONS',
        });
    }

    UPDATE_SECURITY_PASSWORD_OPTIONS: async () => {
const security_password_options = await api.generatePasswordOptions();
if ('security_question_answers' in security_password_options) {
    updateState({
        payload: security_password_options.security_question_answers,
        type: 'STORE_SECURITY_PASSWORD_OPTIONS',
    });
    return true;
}
return false;
},

*/
