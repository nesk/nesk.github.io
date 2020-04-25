import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { Layout, Content } from '../components/layout'
import { SEO } from '../components/seo'

const Article = styled.article`
    margin-bottom: calc(var(--content-spacing) * 2);

    h2 {
        font-size: 2rem;
        letter-spacing: 0.02rem;
    }
`

export default ({ data }) => {
    const articles = data.allMarkdownRemark.edges.map(({ node }) => node)
    return (
        <Layout seo={<SEO title="Blog" />}>
            <Content>
                {articles.map((article) => (
                    <Article>
                        <h2>{article.frontmatter.title}</h2>
                        <p>{article.excerpt}</p>
                    </Article>
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
                    }
                    excerpt(pruneLength: 300)
                }
            }
        }
    }
`
