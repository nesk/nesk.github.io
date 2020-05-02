import React from 'react'
import styled from 'styled-components'
import { SEO } from './seo'
import { Content } from './content'

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
    padding: calc(var(--content-spacing) * 3) 0;
`

export const Layout = ({ children, seo }) => (
    <>
        {seo || <SEO />}
        <Container>
            <Header>
                <Content>
                    <H1>Johann Pardanaud</H1>
                </Content>
            </Header>
            <Body>{children}</Body>
        </Container>
    </>
)
