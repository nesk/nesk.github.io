import React from 'react'
import styled from 'styled-components'
import { Layout } from '../components/layout'
import johann from '../../static/images/johann.jpg'

const About = styled.article`
    max-width: min(300px, 100%);
`

const Avatar = styled.img`
    display: block;
    margin: 0 auto var(--content-spacing);
    width: 80%;
    border-radius: 9999px;
`

export default () => (
    <Layout>
        <About>
            <Avatar src={johann} alt="Johann Pardanaud"></Avatar>

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
