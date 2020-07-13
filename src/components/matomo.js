import React from 'react'
import {
    MatomoProvider as BaseMatomoProvider,
    createInstance,
} from '@datapunt/matomo-tracker-react'

const instance = createInstance({
    urlBase: 'https://s.pardanaud.com',
})

export const MatomoProvider = ({ children }) => (
    <BaseMatomoProvider value={instance}>{children}</BaseMatomoProvider>
)
