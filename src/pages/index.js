import React from 'react'
import styled from 'styled-components'
import { Layout } from '../components/layout'
import johann from '../../static/images/johann.jpg'

const About = styled.article`
    max-width: min(300px, 100%);

    @media (min-width: 768px) {
        display: flex;
        align-items: center;
        max-width: none;
        width: 45rem;
    }

    @media (min-width: 992px) {
        width: 52rem;
        font-size: 1.4rem;
    }
`

const Avatar = styled.img`
    display: block;
    width: 100%;
`

const AvatarContainer = styled.div`
    position: relative;
    margin: 0 calc(var(--content-spacing) * 2) calc(var(--content-spacing) * 2);
    border-radius: 9999px;
    overflow: hidden;

    &::after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 9999px;
        box-shadow: inset 0 0 20px var(--shadow);
        content: '';
    }

    @media (min-width: 768px) {
        margin: 0 calc(var(--content-spacing) * 3) 0 0;
        flex: 0 0 14rem;
    }
`

const Speech = styled.p`
    font-size: 1.2rem;

    @media (min-width: 992px) {
        font-size: 1.4rem;
    }
`

export default () => (
    <Layout>
        <About>
            <AvatarContainer>
                <Avatar src={johann} alt="Johann Pardanaud"></Avatar>
            </AvatarContainer>

            <Speech>
                I'm <em>Johann Pardanaud</em>, developer at{' '}
                <a href="https://batch.com">Batch</a>. I develop technical
                solutions for back-end and front-end. I love the open source
                philosophy and try to contribute whenever I have time (and
                motivation 😅). Although my skills are mainly in web
                development, I appreciate working sometimes with other
                environments and new languages.
            </Speech>
        </About>
    </Layout>
)
