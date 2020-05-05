import React, { useState } from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Content } from './content'

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

const MenuButton = styled.button`
    display: flex;
    padding: 0;
    background: transparent;
    border: 0;
    color: inherit;
    appearance: none;
    font-size: 1.6rem;

    @media (min-width: 768px) {
        display: none;
    }
`

const Nav = styled.nav`
    grid-column: span 2;
    display: ${(props) => (props.show ? 'flex' : 'none')};
    flex-direction: column;
    align-items: flex-end;

    @media (min-width: 768px) {
        display: flex;
        flex-direction: row;
    }
`

const NavLink = styled(Link)`
    color: inherit;

    &.active {
        text-decoration: underline;
    }

    &:visited {
        color: inherit;
    }

    &:hover,
    &:focus,
    &:active {
        color: var(--primary-700);
    }

    @media (min-width: 768px) {
        &:not(:last-child) {
            margin-right: 1.5rem;
        }
    }
`

export const Header = ({ autoTopHeading = true }) => {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <Container>
            <Content>
                {autoTopHeading ? (
                    <TitleH1>Johann Pardanaud</TitleH1>
                ) : (
                    <TitleStrong>Johann Pardanaud</TitleStrong>
                )}

                <MenuButton
                    aria-label="Menu"
                    onClick={() => setShowMenu(!showMenu)}
                >
                    <FontAwesomeIcon icon={faBars} />
                </MenuButton>

                <Nav show={showMenu}>
                    <NavLink activeClassName="active" to="/">
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
