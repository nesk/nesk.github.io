import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Content } from './content'
import { IconButton } from './button'

const Container = styled.header`
    flex: 0 0 auto;
    padding: var(--content-spacing) 0;
    background: var(--grey-200);
    font-size: 1.125rem;
    font-weight: 500;

    ${Content} {
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: 1fr auto;
        grid-row-gap: 1rem;
        align-items: center;
    }

    @media (min-width: 768px) {
        ${Content} {
            grid-template-columns: 1fr auto auto;
        }
    }
`

const SkipLink = styled.a`
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    &:not(:focus) {
        opacity: 0;
        pointer-events: none;
    }
`

const titleCss = css`
    margin: 0;
    font-size: inherit;
    font-weight: inherit;
    text-transform: uppercase;
`

const TitleStrong = styled.strong`
    ${titleCss}
`

const TitleH1 = styled.h1`
    ${titleCss}
`

const MenuButton = styled(IconButton)`
    @media (min-width: 768px) {
        display: none;
    }
`

const Menu = styled.div`
    grid-column: span 2;
    display: ${(props) => (props.isOpened ? 'grid' : 'none')};
    justify-items: end;
    grid-row-gap: calc(var(--content-spacing) * 2);
    grid-column-gap: calc(var(--content-spacing) * 3.5);

    nav {
        display: grid;
        justify-items: end;
    }

    @media (min-width: 768px) {
        display: grid;
        grid-auto-flow: column;

        nav {
            grid-auto-flow: column;
            grid-gap: calc(var(--content-spacing) * 1.5);
        }
    }
`

const NavLink = styled(Link).attrs(() => ({
    className: 'link-no-color-when-inactive',
}))`
    &:not(:hover):not(:focus):not(:active):not(.active) {
        text-decoration: none;
    }
`

export const Header = ({ children, autoTopHeading = true }) => {
    const [isMenuOpened, setIsMenuOpened] = useState(false)
    const aboutRef = useRef(null)

    useEffect(() => {
        if (isMenuOpened) {
            aboutRef.current.focus()
        }
    }, [isMenuOpened])

    return (
        <Container>
            <SkipLink href="#main">Skip to content</SkipLink>
            <Content>
                {autoTopHeading ? (
                    <TitleH1>Johann Pardanaud</TitleH1>
                ) : (
                    <TitleStrong>Johann Pardanaud</TitleStrong>
                )}

                <MenuButton
                    aria-label={`${isMenuOpened ? 'Close' : 'Open'} menu`}
                    onClick={() => setIsMenuOpened(!isMenuOpened)}
                >
                    <FontAwesomeIcon icon={faBars} />
                </MenuButton>

                <Menu isOpened={isMenuOpened}>
                    <nav>
                        <NavLink
                            activeClassName="active"
                            to="/"
                            innerRef={aboutRef}
                        >
                            About
                        </NavLink>
                        <NavLink
                            activeClassName="active"
                            partiallyActive
                            to="/blog/"
                        >
                            Blog
                        </NavLink>
                    </nav>

                    {children}
                </Menu>
            </Content>
        </Container>
    )
}
