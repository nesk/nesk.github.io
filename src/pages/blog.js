import React from 'react'
import styled from 'styled-components'
import { Link, graphql } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import { Layout } from '../components/layout'
import { Content } from '../components/content'
import { SEO } from '../components/seo'

const ReadMore = styled.span`
    color: var(--primary-500);

    svg {
        margin-left: calc(var(--content-spacing) / 2);
    }
`

const PostContainer = styled.div`
    &:not(:last-child) {
        margin-bottom: calc(var(--content-spacing) * 3);
    }

    a,
    a:visited,
    a:hover,
    a:focus,
    a:active {
        color: inherit;
        text-decoration: none;
    }

    a:hover ${ReadMore}, a:focus ${ReadMore}, a:active ${ReadMore} {
        color: var(--primary-700);
        text-decoration: underline;
    }
`

const Post = styled.article`
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
                    <PostContainer key={post.frontmatter.slug}>
                        <Link to={`/blog/${post.frontmatter.slug}`}>
                            <Post>
                                <h2>{post.frontmatter.title}</h2>
                                <p>{post.excerpt}</p>
                                <ReadMore>
                                    Read more
                                    <FontAwesomeIcon
                                        icon={faLongArrowAltRight}
                                    />
                                </ReadMore>
                            </Post>
                        </Link>
                    </PostContainer>
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
