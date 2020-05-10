import styled from 'styled-components'

export const IconButton = styled.button.attrs((props) => ({
    className: props.as === 'a' ? 'link-no-color-when-inactive' : undefined,
}))`
    position: relative;
    display: inline-flex;
    padding: 0;
    background: transparent;
    border: 0;
    ${({ as }) => (as === 'a' ? 'color: inherit' : '')}
    appearance: none;
    font-size: 1.6rem;

    &::after {
        position: absolute;
        top: -0.5rem;
        right: -0.5rem;
        bottom: -0.5rem;
        left: -0.5rem;
        content: '';
    }
`
