import React from 'react'
import styled from 'styled-components'
import { SEO } from './seo'
import { Header } from './header'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
`

const Body = styled.div`
    flex: 1 0 auto;
    padding: calc(var(--content-spacing) * 3) 0;
`

export const Layout = ({ children, seo }) => (
    <>
        {seo || <SEO />}
        <Container>
            <Header />
            <Body>{children}</Body>
        </Container>
    </>
)
