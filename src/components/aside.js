import React from 'react'
import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faInfoCircle,
    faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons'

const withoutInlineContent = (WrappedComponent) => {
    class WithoutInlineContent extends React.Component {
        render() {
            const { children, ...props } = this.props

            const fixedChildren = React.Children.map(children, (child) =>
                typeof child !== 'string' ? child : <p>{child}</p>,
            )

            return (
                <WrappedComponent {...props}>{fixedChildren}</WrappedComponent>
            )
        }
    }

    const originalName =
        WrappedComponent.displayName || WrappedComponent.name || 'Component'
    WithoutInlineContent.displayName = `WithoutInlineContent(${originalName})`

    return WithoutInlineContent
}

const asideCss = css`
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    border-left: 4px solid;
    padding: 0.6rem 1rem;
    line-height: 1.6;

    svg {
        flex: 0 0 auto;
        margin-right: var(--content-spacing);
        font-size: 2rem;
    }

    /* Slight color variations for links below, to improve contrasts */

    a,
    a:hover {
        color: hsl(206, 90%, 36%);
    }

    @media (prefers-color-scheme: dark) {
        a,
        a:hover {
            color: hsl(206, 100%, 66%);
        }
    }
`

const StyledNote = styled.aside`
    ${asideCss}
    background: var(--note-100);
    color: var(--note-700);
`
export const Note = withoutInlineContent(({ children }) => (
    <StyledNote>
        <FontAwesomeIcon icon={faInfoCircle} />
        <div>
            <span className="sr-only">Note:</span>
            {children}
        </div>
    </StyledNote>
))

const StyledWarning = styled.aside`
    ${asideCss}
    background: var(--warning-100);
    color: var(--warning-700);
`
export const Warning = withoutInlineContent(({ children }) => (
    <StyledWarning>
        <FontAwesomeIcon icon={faExclamationTriangle} />
        <div>
            <span className="sr-only">Warning:</span>
            {children}
        </div>
    </StyledWarning>
))
