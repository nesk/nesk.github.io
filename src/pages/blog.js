import React from 'react'
import styled from 'styled-components'
import { Link, graphql } from 'gatsby'
import { Layout } from '../components/layout'
import { Content } from '../components/content'
import { SEO } from '../components/seo'

const Post = styled.article`
    margin-bottom: calc(var(--content-spacing) * 2);

    h2 {
        font-size: 2rem;
        letter-spacing: 0.02rem;
    }
`

export default ({ data }) => {
    const posts = data.allMarkdownRemark.edges.map(({ node }) => node)
    return (
        <Layout seo={<SEO title="Blog" />}>
            <Content>
                {posts.map((post) => (
                    <Post>
                        <h2>
                            <Link to={`/blog/${post.frontmatter.slug}`}>
                                {post.frontmatter.title}
                            </Link>
                        </h2>
                        <p>{post.excerpt}</p>
                    </Post>
                ))}
            </Content>
        </Layout>
    )
}

export const query = graphql`
    query {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        date(formatString: "DD MMMM, YYYY")
                        slug
                    }
                    excerpt(pruneLength: 300)
                }
            }
        }
    }
`
