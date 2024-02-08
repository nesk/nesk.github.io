import React from "react"
import { onlyText } from "react-children-utilities"
import styled from "styled-components"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Img from "gatsby-image"
import urlSlug from "url-slug"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLink } from "@fortawesome/free-solid-svg-icons"
import { Layout } from "../components/layout"
import { Content } from "../components/content"
import { Seo } from "../components/seo"
import * as aside from "../components/mdx/aside"
import * as tabs from "../components/mdx/tabs"
import { CodeFold } from "../components/mdx/code-fold"
import { Caption } from "../components/mdx/caption"
import { MaxWidth } from "../components/mdx/max-width"
import { IconButton } from "../components/button"
import { Profile } from "../components/profile"

const Header = styled.header`
  ${Content} {
    display: flex;
    flex-direction: column-reverse;
  }

  h1 {
    font-size: 2.5rem;
    letter-spacing: 0.015rem;
    line-height: 3.5rem;
    margin: 0.5rem 0 2.5rem;
  }
`

const Metadata = styled.p`
  font-size: 0.8rem;
  color: var(--grey-400);

  address {
    display: inline;
  }
`

const Footer = styled.footer`
  border-top: 1px solid var(--grey-250);
  margin-top: calc(var(--content-spacing) * 3);
  padding-top: calc(var(--content-spacing) * 3);
`

const Post = styled.article`
  display: flex;
  flex-direction: column;
  font-size: 1.1rem;

  & > * {
    max-width: 100%;
  }

  h2 {
    margin-top: 2.1rem;
    font-size: 1.6rem;
  }

  h3 {
    margin-top: 1.8rem;
    font-size: 1.3rem;
  }

  h4 {
    margin-top: 1.6rem;
    font-size: 1.1rem;
  }

  h5 {
    margin-top: 1.4rem;
    font-size: 0.9rem;
  }

  h6 {
    margin-top: 1.25rem;
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

const FeaturedImage = styled(Img)`
  margin-bottom: 2.5rem;
`

const HeadingLink = styled(IconButton)`
  position: absolute;
  top: 50%;
  right: calc(100% + var(--content-spacing));
  transform: translateY(-50%);
  font-size: 0.75em;
  opacity: 0;

  &:hover,
  &:focus,
  &:active {
    opacity: 1;
  }

  &::before {
    position: absolute;
    top: 0%;
    left: 100%;
    width: var(--content-spacing);
    height: 100%;
    content: "";
  }

  @media (max-width: 767.98px) {
    display: none;
  }
`

const Heading = styled.h1`
  position: relative;

  &:hover ${HeadingLink} {
    opacity: 1;
  }
`

const LinkableHeading = ({ tag, children, ...props }) => {
  const text = onlyText(children)
  const slug = urlSlug(text.toLowerCase())

  return (
    <Heading {...props} as={tag} id={slug}>
      <HeadingLink
        as="a"
        href={`#${slug}`}
        className="link-no-color-when-inactive"
        title={`Link to "${text}" heading`}
        aria-hidden="true"
      >
        <FontAwesomeIcon icon={faLink} />
      </HeadingLink>

      {children}
    </Heading>
  )
}

const components = {
  h1: props => <LinkableHeading tag="h2" {...props} />,
  h2: props => <LinkableHeading tag="h3" {...props} />,
  h3: props => <LinkableHeading tag="h4" {...props} />,
  h4: props => <LinkableHeading tag="h5" {...props} />,
  h5: props => <LinkableHeading tag="h6" {...props} />,
  ...aside,
  ...tabs,
  CodeFold,
  Caption,
  MaxWidth,
}

const PostTemplate = ({ data }) => {
  const post = data.mdx
  const featuredImage = post.frontmatter.featuredImage.childImageSharp.fluid

  const seo = (
    <Seo
      title={`${post.frontmatter.title} — Blog`}
      image={post.frontmatter.featuredImage.childImageSharp.fixed.src}
    />
  )

  return (
    <Layout seo={seo} autoTopHeading={false}>
      <Post>
        <Header>
          <Content>
            <h1>{post.frontmatter.title}</h1>
            <Metadata>
              Published{" "}
              <time dateTime={post.frontmatter.date}>
                {post.frontmatter.formattedDate}
              </time>
              , by Johann Pardanaud
            </Metadata>
          </Content>
          <FeaturedImage fluid={featuredImage} />
        </Header>

        <Content>
          <MDXProvider components={components}>
            <MDXRenderer>{post.body}</MDXRenderer>
          </MDXProvider>
        </Content>

        <Footer>
          <address>
            <Profile avatarSrc={data.file.childImageSharp.fluid} />
          </address>
        </Footer>
      </Post>
    </Layout>
  )
}
export default PostTemplate

export const query = graphql`
  query PostQuery($slug: String!, $cropFocus: ImageCropFocus!, $quality: Int!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
        formattedDate: date(formatString: "Do MMMM YYYY")
        featuredImage {
          childImageSharp {
            fixed(width: 1200, height: 450, cropFocus: $cropFocus) {
              ...GatsbyImageSharpFixed
            }
            fluid(maxWidth: 2560, quality: $quality) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      body
    }
    file(relativePath: { eq: "images/avatar.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
