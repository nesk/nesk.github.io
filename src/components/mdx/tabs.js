import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'

const StyledTabs = styled.section`
    display: grid;
    grid-template-columns: [head-start hr-start content-start] repeat(10, auto) 1fr [head-end hr-end content-end];
    grid-template-rows: [head-start] auto [head-end hr-start] 1px [hr-end content-start] auto [content-end];
    grid-auto-flow: row dense;
    margin-bottom: 1rem;
    border-radius: var(--grvsc-border-radius);
    background: var(--color-bg-code);
    overflow: auto;
`

const Heading = styled.div`
    grid-area: head;
    display: flex;
    overflow: auto;
`

const Separator = styled.div`
    grid-area: hr;
    background: var(--grey-600-light);
`

const selectedTabHeaderCss = css`
    background: var(--primary-500-dark);
    visibility: visible;
`

const StyledTabHeader = styled.label`
    position: relative;
    z-index: 1;
    border: none;
    margin: 0;
    padding: 1rem 1.5rem 1.15rem;
    background: transparent;
    font-size: 1rem;
    white-space: nowrap;
    color: var(--grey-250-light);
    cursor: pointer;
    outline-offset: -0.5rem !important;

    &::after {
        position: absolute;
        bottom: 0.8rem;
        left: 50%;
        transform: translateX(-50%);
        width: calc(90% - 1.5rem * 2);
        height: 0.15em;
        background: currentColor;
        border-radius: 0.15em;
        visibility: hidden;
        content: '';

        ${(props) => (props.isSelected ? selectedTabHeaderCss : null)}
    }

    &:hover::after {
        background-color: ${(props) =>
            props.isSelected ? '<invalid>' : 'currentColor'};
        visibility: visible;
    }
`

const TabHeader = (props) => (
    <StyledTabHeader
        id={`tab-${props.tabId}`}
        className="focusable"
        htmlFor={`tab-input-${props.tabId}`}
        tabIndex="0"
        role="tab"
        aria-selected={props.isSelected ? 'true' : 'false'}
        isSelected={props.isSelected}
    >
        {props.children}
    </StyledTabHeader>
)

const StyledTab = styled.div`
    grid-area: content;
    max-width: 100%;

    & > * {
        margin-bottom: 0 !important;
    }
`

export const Tab = (props) => (
    <StyledTab role="tabpanel" aria-labelledby={`tab-${props.tabId}`}>
        {props.children}
    </StyledTab>
)

const StyledInput = styled.input`
    display: none;

    &:not(:checked) + ${StyledTab} {
        display: none;
    }

    &:not(:checked) + ${StyledTabHeader} + ${StyledTab} {
        display: none;
    }

    &:checked + ${StyledTabHeader}::after {
        ${selectedTabHeaderCss}
    }
`

const Input = (props) => (
    <StyledInput
        id={`tab-input-${props.tabId}`}
        type="radio"
        name={`tabs-${props.radioId}`}
        checked={props.isSelected}
        onChange={props.onSelect}
    />
)

/**
 * To allow this component to work without JavaScript, we have to order the DOM in a way which is
 * not ideal for accessibility. To get best of both worlds, we render the component a first time
 * on the server with a specific DOM order, and when the component is rendered for the second
 * time on the browser we rearrange the DOM. The `canRunJavaScript` variable is set depending
 * on whether we are running on the browser or not.
 */
export const Tabs = ({ children }) => {
    const canRunJavaScript = useIsClient()
    const [radioId] = useState(generateRandomId())
    const [tabIds] = useState(React.Children.map(children, generateRandomId))
    const [selectedIndex, setSelectedIndex] = useState(
        getDefaultSelectedIndex(children),
    )

    const elements = React.Children.map(children, (content, index) => {
        const tabId = tabIds[index]
        const isSelected = selectedIndex === index
        return {
            tabId,
            input: (
                <Input
                    tabId={tabId}
                    radioId={radioId}
                    isSelected={isSelected}
                    onSelect={() => setSelectedIndex(index)}
                />
            ),
            header: (
                <TabHeader
                    tabId={tabId}
                    isSelected={canRunJavaScript && isSelected}
                >
                    {content.props.label}
                </TabHeader>
            ),
            content: React.cloneElement(content, { tabId }),
        }
    })

    return (
        <StyledTabs role="tablist">
            <Separator />
            {!canRunJavaScript ? (
                elements.map(({ tabId, input, header, content }) => (
                    <React.Fragment key={tabId}>
                        {input}
                        {header}
                        {content}
                    </React.Fragment>
                ))
            ) : (
                <>
                    <Heading>
                        {elements.map(({ tabId, header }) => (
                            <React.Fragment key={tabId}>
                                {header}
                            </React.Fragment>
                        ))}
                    </Heading>
                    {elements.map(({ tabId, input, content }) => (
                        <React.Fragment key={tabId}>
                            {input}
                            {content}
                        </React.Fragment>
                    ))}
                </>
            )}
        </StyledTabs>
    )
}

const generateRandomId = () => Math.floor(Math.random() * 1_000_000)

const getDefaultSelectedIndex = (children) => {
    const index = React.Children.toArray(children)
        .map((child) => child.props.isDefault)
        .findIndex((isDefault) => isDefault === true)

    return index !== -1 ? index : 0
}

const useIsClient = () => {
    const [isClient, setIsClient] = React.useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return isClient
}
