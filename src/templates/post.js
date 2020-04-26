import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { Layout, Content } from '../components/layout'
import { SEO } from '../components/seo'

const Heading = styled.h2`
    font-size: 2.5rem;
    letter-spacing: 0.015rem;
    line-height: 3.5rem;
    margin-bottom: 2.5rem;
`

export default ({ data }) => {
    const post = data.markdownRemark

    return (
        <Layout seo={<SEO title={`${post.frontmatter.title} — Blog`} />}>
            <Content>
                <article>
                    <Heading>{post.frontmatter.title}</Heading>
                    <div dangerouslySetInnerHTML={{ __html: post.html }} />
                </article>
            </Content>
        </Layout>
    )
}

export const query = graphql`
    query($slug: String!) {
        markdownRemark(frontmatter: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
            }
        }
    }
`
