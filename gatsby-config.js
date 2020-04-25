/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
module.exports = {
    siteMetadata: {
        title: `Johann Pardanaud`,
        description: `Developer working @batch — Passionate climber`,
        author: `@johannpardanaud`,
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `articles`,
                path: `${__dirname}/src/articles/`,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                excerpt_separator: `<!-- excerpt-end -->`,
            },
        },
        'gatsby-plugin-styled-components',
        {
            resolve: 'gatsby-plugin-react-svg',
            options: {
                rule: {
                    include: /icons/,
                },
            },
        },
    ],
}
