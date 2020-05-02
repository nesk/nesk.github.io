import React, { useState } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Content } from './content'
import BarsIcon from '../../static/icons/bars.svg'

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
    }

    @media (min-width: 768px) {
        ${Content} {
            grid-template-columns: 1fr auto auto;
        }
    }
`

const Title = styled.h1`
    margin: 0;
    font-size: inherit;
    font-weight: inherit;
    text-transform: uppercase;
`

const MenuButton = styled.button`
    display: flex;
    padding: 0;
    background: transparent;
    border: 0;
    color: inherit;
    appearance: none;

    svg {
        width: 1.4rem;
    }

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

export const Header = () => {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <Container>
            <Content>
                <Title>Johann Pardanaud</Title>

                <MenuButton
                    aria-label="Menu"
                    onClick={() => setShowMenu(!showMenu)}
                >
                    <BarsIcon />
                </MenuButton>

                <Nav show={showMenu}>
                    <NavLink activeClassName="active">About</NavLink>
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
