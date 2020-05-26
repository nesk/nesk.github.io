import React, { useState, useEffect } from 'react'
import useLocalStorage from '@illinois/react-use-local-storage'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon, faCircle } from '@fortawesome/free-solid-svg-icons'

const DarkModeIcon = styled.span`
    opacity: ${({ active }) => (active ? '1' : '0.3')};
    color: ${({ selected }) => (selected ? 'var(--primary-500)' : 'inherit')};
`

const DarkModeState = styled.span`
    display: grid;
    grid-template: 'icon';
    margin: 0 calc(var(--content-spacing) / 2);
    font-size: 0.3rem;

    svg {
        grid-area: icon;
    }

    svg:nth-child(1) {
        opacity: ${({ state }) => (state === null ? '0' : '0.3')};
    }

    svg:nth-child(2) {
        z-index: 1;
        color: var(--primary-500);
        opacity: ${({ state }) => (state === null ? '1' : '0')};
        ${({ state }) => {
            if (state === null) return ''

            const multiplier = state ? 1 : -1
            return `transform: translateX(calc(var(--content-spacing) * ${multiplier}));`
        }};
    }
`

const DarkModeTooltip = styled.span`
    position: absolute;
    top: calc(100% + calc(var(--content-spacing) / 2));
    left: 50%;
    transform: translateX(-50%);
    border-radius: 3px;
    padding: 0.1em 0.4em;
    background: var(--grey-400);
    font-size: 0.75rem;
    color: var(--grey-100);
    pointer-events: none;
    opacity: 0;
`

const DarkModeContainer = styled.div`
    display: inline-flex;
    align-items: center;
    position: relative;
    margin: 0;
    cursor: pointer;

    ${DarkModeTooltip}, ${DarkModeIcon}, ${DarkModeState} svg {
        transition: all ease 250ms;
    }

    &:hover
        ${DarkModeTooltip},
        input[type='checkbox']:focus
        + ${DarkModeTooltip} {
        opacity: 1;
    }
`

/**
 * We need a two-pass rendering to fix an issue with styled-components not being properly initialized after hydration.
 *
 * Related issues:
 *   - https://github.com/styled-components/styled-components/issues/2629
 *   - https://github.com/gatsbyjs/gatsby/issues/17914
 *   - https://joshwcomeau.com/react/the-perils-of-rehydration/
 *
 * Solution: https://reactjs.org/docs/react-dom.html#hydrate
 */
const useIsClient = () => {
    const [isClient, setIsClient] = React.useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return isClient
}

const darkModeStateToLabel = (state) => {
    if (state === null) return 'Dark mode: auto'
    return `Dark mode: ${state ? 'enabled' : 'disabled'}`
}

const darkModeStateToTooltip = (state) => {
    if (state === null) return 'Auto'
    return state ? 'Dark' : 'Light'
}

export const DarkModeSwitch = ({ onChange }) => {
    const isClient = useIsClient()

    const [darkModeUser, setDarkModeUser] = useLocalStorage(
        'dark-mode-preference',
        null,
    )

    const [previousDarkModeUser, setPreviousDarkModeUser] = useState(
        darkModeUser !== null ? darkModeUser : null,
    )

    const darkModeSystem = useMediaQuery({
        query: '(prefers-color-scheme: dark)',
    })

    const darkModeComputed =
        darkModeUser !== null ? darkModeUser : darkModeSystem

    const onInteraction = (event) => {
        if (event.type === 'keypress' && event.nativeEvent.code !== 'Space') {
            return
        }

        let newDarkModeUser

        if (darkModeUser === null) {
            newDarkModeUser =
                previousDarkModeUser !== null
                    ? !previousDarkModeUser
                    : !darkModeSystem
        } else {
            newDarkModeUser = null
            setPreviousDarkModeUser(darkModeUser)
        }

        setDarkModeUser(newDarkModeUser)
        onChange(newDarkModeUser)
    }

    return (
        <DarkModeContainer
            key={isClient}
            className="focusable"
            tabIndex="0"
            role="checkbox"
            aria-checked={darkModeUser !== null ? darkModeUser : 'mixed'}
            aria-label={darkModeStateToLabel(darkModeUser)}
            onClick={onInteraction}
            onKeyPress={onInteraction}
        >
            <DarkModeTooltip>
                {darkModeStateToTooltip(darkModeUser)}
            </DarkModeTooltip>

            <DarkModeIcon
                active={!darkModeComputed}
                selected={darkModeUser === false}
            >
                <FontAwesomeIcon icon={faSun} />
            </DarkModeIcon>

            <DarkModeState state={darkModeUser}>
                <FontAwesomeIcon icon={faCircle} />
                <FontAwesomeIcon icon={faCircle} />
            </DarkModeState>

            <DarkModeIcon
                active={darkModeComputed}
                selected={darkModeUser === true}
            >
                <FontAwesomeIcon icon={faMoon} />
            </DarkModeIcon>
        </DarkModeContainer>
    )
}
