import React from 'react'
import styled from 'styled-components'
import { Layout } from '../components/layout'
import johann from '../../static/images/johann.jpg'

const About = styled.article`
    max-width: min(300px, 100%);
`

const AvatarContainer = styled.div`
    position: relative;
    margin: 0 auto var(--content-spacing);
    width: 80%;
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
`

const Avatar = styled.img`
    display: block;
    width: 100%;
`

export default () => (
    <Layout>
        <About>
            <AvatarContainer>
                <Avatar src={johann} alt="Johann Pardanaud"></Avatar>
            </AvatarContainer>

            <p>
                I'm a developer working at <a href="https://batch.com">Batch</a>
                . I develop technical solutions for back-end and front-end. I
                love the open source philosophy and try to contribute whenever I
                have time (and motivation 😅). Although my skills are mainly in
                web development, I appreciate working sometime with other
                environments and new languages.
            </p>
        </About>
    </Layout>
)
