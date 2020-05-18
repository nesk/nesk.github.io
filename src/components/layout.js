import React from 'react'
import styled from 'styled-components'
import { SEO } from './seo'
import { Header } from './header'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    min-height: 100vh;
`

const Body = styled.main`
    flex: 1 0 auto;
    padding: calc(var(--content-spacing) * 3) 0;

    ${({ center }) => (center ? ` display: flex; align-items: center;` : '')}
`

export const Layout = ({
    children,
    seo,
    autoTopHeading = true,
    centeredBody = false,
}) => (
    <>
        {seo || <SEO />}
        <Container>
            <Header autoTopHeading={autoTopHeading} />
            <Body id="main" center={centeredBody}>
                {children}
            </Body>
        </Container>
    </>
)
