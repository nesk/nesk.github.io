import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { Layout } from '../components/layout'
import { Content } from '../components/content'
import { SEO } from '../components/seo'

const Post = styled.article`
    font-size: 1.1rem;

    h2 {
        font-size: 2.5rem;
        letter-spacing: 0.015rem;
        line-height: 3.5rem;
        margin-bottom: 2.5rem;
    }

    h3 {
        margin-top: 1.6rem;
        font-size: 1.6rem;
    }

    h4 {
        margin-top: 1.3rem;
        font-size: 1.3rem;
    }

    blockquote {
        border-left: 4px solid;
        padding: 0.3rem 1rem;
        line-height: 1.6;
        font-style: italic;
    }

    pre {
        margin-bottom: 1rem;
    }
`

export default ({ data }) => {
    const post = data.markdownRemark

    return (
        <Layout seo={<SEO title={`${post.frontmatter.title} — Blog`} />}>
            <Content>
                <Post>
                    <h2>{post.frontmatter.title}</h2>
                    <div dangerouslySetInnerHTML={{ __html: post.html }} />
                </Post>
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
