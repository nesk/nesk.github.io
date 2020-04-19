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
    padding: var(--content-spacing);
    text-transform: uppercase;
    font-size: 1.1rem;
    font-weight: 500;
`

const Body = styled.section`
    flex: 1 0 auto;
    padding: var(--content-spacing);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const Layout = ({ children }) => (
    <Container>
        <Header>Johann Pardanaud</Header>
        <Body>{children}</Body>
    </Container>
)
