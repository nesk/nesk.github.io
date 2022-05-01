import React from 'react'
import styled from 'styled-components'
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

const Aside = styled.aside`
    display: flex;
    align-items: center;
    gap: var(--content-spacing);
    margin-bottom: 1.5rem;
    border-left: 4px solid;
    padding: 0.6rem 1rem;
    line-height: 1.6;

    /* Slight color variations for links, to improve contrasts. */
    a,
    a:hover {
        color: var(--color-aside-link);
    }
`

const AsideIcon = styled(FontAwesomeIcon)`
    flex: 0 0 auto;
    font-size: 2rem;
`

const AsideContent = styled.div`
    overflow: hidden;
`

const StyledNote = styled(Aside)`
    background: var(--note-100);
    color: var(--note-700);
`
export const Note = withoutInlineContent(({ children }) => (
    <StyledNote>
        <AsideIcon icon={faInfoCircle} />
        <AsideContent>
            <span className="sr-only">Note:</span>
            {children}
        </AsideContent>
    </StyledNote>
))

const StyledWarning = styled(Aside)`
    background: var(--warning-100);
    color: var(--warning-700);
`
export const Warning = withoutInlineContent(({ children }) => (
    <StyledWarning>
        <AsideIcon icon={faExclamationTriangle} />
        <AsideContent>
            <span className="sr-only">Warning:</span>
            {children}
        </AsideContent>
    </StyledWarning>
))
