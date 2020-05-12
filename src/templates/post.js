import React from 'react'
import { onlyText } from 'react-children-utilities'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import urlSlug from 'url-slug'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { Layout } from '../components/layout'
import { Content } from '../components/content'
import { SEO } from '../components/seo'
import { IconButton } from '../components/button'

const Post = styled.article`
    font-size: 1.1rem;

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

const Header = styled.header`
    display: flex;
    flex-direction: column-reverse;

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
        content: '';
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
    h1: (props) => <LinkableHeading tag="h2" {...props} />,
    h2: (props) => <LinkableHeading tag="h3" {...props} />,
    h3: (props) => <LinkableHeading tag="h4" {...props} />,
    h4: (props) => <LinkableHeading tag="h5" {...props} />,
    h5: (props) => <LinkableHeading tag="h6" {...props} />,
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
                    <Header>
                        <h1>{post.frontmatter.title}</h1>
                        <Metadata>
                            Published{' '}
                            <time dateTime={post.frontmatter.date}>
                                {post.frontmatter.formattedDate}
                            </time>
                            , by Johann Pardanaud
                        </Metadata>
                    </Header>

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
                date
                formattedDate: date(formatString: "Do MMMM YYYY")
            }
            body
        }
    }
`
