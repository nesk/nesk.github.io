import React from 'react'
import styled from 'styled-components'
import { Link, graphql } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import { Layout } from '../components/layout'
import { Content } from '../components/content'
import { SEO } from '../components/seo'

const ReadMore = styled.span.attrs(() => ({ className: 'sublink' }))`
    svg {
        margin-left: calc(var(--content-spacing) / 2);
    }
`

const PostContainer = styled.div`
    &:not(:last-child) {
        margin-bottom: calc(var(--content-spacing) * 3);
    }
`

const Post = styled.article`
    h2 {
        font-size: 2rem;
        letter-spacing: 0.02rem;
    }
`

export default ({ data }) => {
    const posts = data.allMdx.edges.map(({ node }) => node)
    return (
        <Layout seo={<SEO title="Blog" />}>
            <Content>
                {posts.map((post) => (
                    <PostContainer key={post.frontmatter.id}>
                        <Link
                            to={`/blog/${post.frontmatter.slug}`}
                            className="link-invisible"
                        >
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
        allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
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
