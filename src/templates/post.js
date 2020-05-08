import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { Layout } from '../components/layout'
import { Content } from '../components/content'
import { SEO } from '../components/seo'

const Post = styled.article`
    font-size: 1.1rem;

    h1 {
        font-size: 2.5rem;
        letter-spacing: 0.015rem;
        line-height: 3.5rem;
        margin-bottom: 2.5rem;
    }

    h2 {
        margin-top: 1.6rem;
        font-size: 1.6rem;
    }

    h3 {
        margin-top: 1.3rem;
        font-size: 1.3rem;
    }

    h4 {
        margin-top: 1.1rem;
        font-size: 1.1rem;
    }

    h5 {
        margin-top: 0.9rem;
        font-size: 0.9rem;
    }

    h6 {
        margin-top: 0.75rem;
        font-size: 0.75rem;
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

const components = {
    h1: (props) => <h2 {...props} />,
    h2: (props) => <h3 {...props} />,
    h3: (props) => <h4 {...props} />,
    h4: (props) => <h5 {...props} />,
    h5: (props) => <h6 {...props} />,
}

export default ({ data }) => {
    const post = data.mdx

    return (
        <Layout
            seo={<SEO title={`${post.frontmatter.title} — Blog`} />}
            autoTopHeading={false}
        >
            <Content>
                <Post>
                    <h1>{post.frontmatter.title}</h1>
                    <MDXProvider components={components}>
                        <MDXRenderer>{post.body}</MDXRenderer>
                    </MDXProvider>
                </Post>
            </Content>
        </Layout>
    )
}

export const query = graphql`
    query($slug: String!) {
        mdx(frontmatter: { slug: { eq: $slug } }) {
            frontmatter {
                title
            }
            body
        }
    }
`
