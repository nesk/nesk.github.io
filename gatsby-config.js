/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
module.exports = {
    siteMetadata: {
        siteUrl: `https://johann.pardanaud.com`,
        title: `Johann Pardanaud`,
        description: `Developer working @batch — Passionate climber`,
        author: `Johann Pardanaud`,
        twitter: `johannpardanaud`,
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/assets/`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `posts`,
                path: `${__dirname}/content/posts/`,
            },
        },
        {
            resolve: `gatsby-plugin-mdx`,
            options: {
                gatsbyRemarkPlugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 850,
                        },
                    },
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            classPrefix: 'focusable language-',
                            aliases: { kt: 'kotlin', sh: 'bash' },
                        },
                    },
                ],
            },
        },
        'gatsby-transformer-sharp',
        {
            resolve: `gatsby-plugin-sharp`,
            options: {
                defaultQuality: 80,
            },
        },
        'gatsby-plugin-styled-components',
        'gatsby-plugin-sitemap',
        {
            resolve: `gatsby-plugin-feed`,
            options: {
                query: `
                    {
                        site {
                            siteMetadata {
                                siteUrl
                            }
                        }
                    }
                `,
                feeds: [
                    {
                        title: "Johann Pardanaud's RSS Feed",
                        output: '/rss.xml',
                        query: `
                            {
                                allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
                                    edges {
                                        node {
                                            frontmatter {
                                                title
                                                date
                                                slug
                                            }
                                            excerpt(pruneLength: 300)
                                            html
                                        }
                                    }
                                }
                            }
                        `,
                        serialize: ({ query: { site, allMdx } }) => {
                            return allMdx.edges.map((edge) => {
                                const { siteUrl } = site.siteMetadata
                                const { frontmatter } = edge.node

                                return Object.assign({}, frontmatter, {
                                    url: `${siteUrl}/${frontmatter.slug}`,
                                    guid: `${siteUrl}/${frontmatter.slug}`,
                                    date: frontmatter.date,
                                    description: edge.node.excerpt,
                                    custom_elements: [
                                        {
                                            'content:encoded': edge.node.html,
                                        },
                                    ],
                                })
                            })
                        },
                    },
                ],
            },
        },
    ],
}
