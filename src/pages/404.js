import React from 'react'
import styled from 'styled-components'
import { Layout } from '../components/layout'
import { Content } from '../components/content'
import { SEO } from '../components/seo'

const StatusContent = styled(Content)`
    text-align: center;
`

const StatusCode = styled.p`
    font-size: 16rem;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: var(--grey-300);
`

export default () => {
    return (
        <Layout seo={<SEO title="Not Found" />}>
            <StatusContent>
                <StatusCode>404</StatusCode>
                <p>Not Found</p>
            </StatusContent>
        </Layout>
    )
}
