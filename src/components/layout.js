import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
`

const Header = styled.header`
    flex: 0 0 auto;
    padding: var(--content-spacing) 0;
    background: var(--grey-200);
    text-transform: uppercase;
    font-size: 1.1rem;
    font-weight: 500;
`

const H1 = styled.h1`
    margin: 0;
    font-size: inherit;
    font-weight: inherit;
`

const Body = styled.div`
    flex: 1 0 auto;
    padding: var(--content-spacing) 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Content = styled.section`
    margin: auto;
    padding: 0 var(--content-spacing);

    @media (min-width: 768px) {
        width: 45rem;
    }

    @media (min-width: 992px) {
        width: 55rem;
    }
`

export const Layout = ({ children }) => (
    <Container>
        <Header>
            <Content>
                <H1>Johann Pardanaud</H1>
            </Content>
        </Header>
        <Body>{children}</Body>
    </Container>
)
