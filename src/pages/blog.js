import React from "react"
import styled from "styled-components"
import { Link, graphql } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons"
import { Layout } from "../components/layout"
import { Content } from "../components/content"
import { Seo } from "../components/seo"

const Post = styled.article`
  overflow-wrap: break-word;

  h2 {
    font-size: 2rem;
    letter-spacing: 0.02rem;
    line-height: 1.3;
  }

  @media (min-width: 768px) {
    h2 {
      line-height: 1.5;
    }
  }

  &:not(:last-child) {
    margin-bottom: calc(var(--content-spacing) * 3);
  }
`

const ReadMore = styled.span`
  svg {
    margin-left: calc(var(--content-spacing) / 2);
  }
`

const BlogPage = ({ data }) => {
  const posts = data.allMdx.edges.map(({ node }) => node)
  return (
    <Layout seo={<Seo title="Blog" />}>
      <Content>
        {posts.map(post => (
          <Post key={post.id}>
            <Link
              to={`/blog/${post.frontmatter.slug}/`}
              className="link-invisible"
            >
              <h2>{post.frontmatter.title}</h2>
              <p>{post.excerpt}</p>
              <ReadMore className="sublink" aria-hidden="true">
                Read more
                <FontAwesomeIcon icon={faLongArrowAltRight} />
              </ReadMore>
            </Link>
          </Post>
        ))}
      </Content>
    </Layout>
  )
}
export default BlogPage

export const query = graphql`
  query BlogQuery {
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
