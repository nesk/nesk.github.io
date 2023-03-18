import React from "react"
import { graphql } from "gatsby"
import { Layout } from "../components/layout"
import { Seo } from "../components/seo"
import { Profile } from "../components/profile"

const IndexPage = ({ data }) => {
  return (
    <Layout seo={<Seo title="About" />} centeredBody>
      <Profile avatarSrc={data.file.childImageSharp.fluid} />
    </Layout>
  )
}
export default IndexPage

export const query = graphql`
  query AboutQuery {
    file(relativePath: { eq: "images/avatar.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
