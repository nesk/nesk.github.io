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
    font-size: 1.1rem;
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

const SkipLink = styled(Link)`
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

const Nav = styled.nav`
    grid-column: span 2;
    display: ${(props) => (props.isOpened ? 'flex' : 'none')};
    flex-direction: column;
    align-items: flex-end;

    @media (min-width: 768px) {
        display: flex;
        flex-direction: row;
    }
`

const NavLink = styled(Link).attrs(() => ({
    className: 'link-no-color-when-inactive',
}))`
    &:not(:hover):not(:focus):not(:active):not(.active) {
        text-decoration: none;
    }

    @media (min-width: 768px) {
        &:not(:last-child) {
            margin-right: 1.5rem;
        }
    }
`

export const Header = ({ autoTopHeading = true }) => {
    const [isMenuOpened, setIsMenuOpened] = useState(false)
    const aboutRef = useRef(null)

    useEffect(() => {
        if (isMenuOpened) {
            aboutRef.current.focus()
        }
    }, [isMenuOpened])

    return (
        <Container>
            <SkipLink to="#main">Skip to content</SkipLink>
            <Content>
                {autoTopHeading ? (
                    <TitleH1>Johann Pardanaud</TitleH1>
                ) : (
                    <TitleStrong>Johann Pardanaud</TitleStrong>
                )}

                <MenuButton
                    aria-label={`${
                        isMenuOpened ? 'Close' : 'Open'
                    } navigation menu`}
                    onClick={() => setIsMenuOpened(!isMenuOpened)}
                >
                    <FontAwesomeIcon icon={faBars} />
                </MenuButton>

                <Nav isOpened={isMenuOpened}>
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
                        to="/blog"
                    >
                        Blog
                    </NavLink>
                </Nav>
            </Content>
        </Container>
    )
}
