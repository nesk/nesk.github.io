const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    const result = await graphql(`
        {
            allMdx {
                edges {
                    node {
                        frontmatter {
                            slug
                        }
                    }
                }
            }
        }
    `)

    result.data.allMdx.edges.forEach(({ node }) => {
        createPage({
            path: `blog/${node.frontmatter.slug}`,
            component: path.resolve('./src/templates/post.js'),
            context: {
                slug: node.frontmatter.slug,
            },
        })
    })
}
