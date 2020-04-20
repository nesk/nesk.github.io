import React from 'react'
import styled from 'styled-components'
import { Layout, Content } from '../components/layout'
import johann from '../../static/images/johann.jpg'

const About = styled(Content)`
    max-width: min(300px, 100%);
    display: grid;
    grid-template-rows: [avatar-start] auto [avatar-end speech-start] auto [speech-end];
    grid-template-columns: 1fr;
    justify-items: center;
    align-items: center;

    @media (max-width: 767.98px) {
        grid-row-gap: calc(var(--content-spacing) * 2);
    }

    @media (min-width: 768px) {
        max-width: none;
        height: 100%;
        grid-template-rows: 1fr [avatar-start speech-start] auto [avatar-end speech-end] 1fr;
        grid-template-columns: 1fr [avatar-start] 11rem [avatar-end speech-start] 29rem [speech-end] 1fr;
        grid-column-gap: calc(var(--content-spacing) * 2);
    }

    @media (min-width: 992px) {
        grid-template-columns: 1fr [avatar-start] 14rem [avatar-end speech-start] 36rem [speech-end] 1fr;
        grid-column-gap: calc(var(--content-spacing) * 3);
        font-size: 1.4rem;
    }
`

const Avatar = styled.img`
    display: block;
    width: 100%;
`

const AvatarContainer = styled.div`
    grid-area: avatar;
    position: relative;
    border-radius: 9999px;
    overflow: hidden;

    @media (max-width: 767.98px) {
        width: calc(100% - 4rem);
    }

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
`

const Speech = styled.p`
    grid-area: speech;
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
