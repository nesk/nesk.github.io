import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

export const SEO = ({
    title,
    description,
    image = null,
    lang = 'en',
    meta = [],
}) => {
    const { site } = useStaticQuery(
        graphql`
            query SeoQuery {
                site {
                    siteMetadata {
                        title
                        description
                        author
                    }
                }
            }
        `,
    )

    const metaDescription = description || site.siteMetadata.description

    return (
        <Helmet
            titleTemplate={`%s — ${site.siteMetadata.title}`}
            defaultTitle={site.siteMetadata.title}
        >
            <html lang={lang} />

            {title ? <title>{title}</title> : null}

            <meta name="description" content={metaDescription} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={metaDescription} />

            {image !== null ? (
                <meta
                    property="og:image"
                    content={`https://johann.pardanaud.com${image}`}
                />
            ) : null}

            <meta property="og:type" content={`website`} />
            <meta name="twitter:card" content={`summary`} />
            <meta
                name="twitter:creator"
                content={`@${site.siteMetadata.twitter}`}
            />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={metaDescription} />

            {meta.map((props) => (
                <meta {...props} />
            ))}
        </Helmet>
    )
}
