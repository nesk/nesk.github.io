import React, { useEffect } from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

let hasInjectedPlausible = false

export const Seo = ({
  title,
  description,
  image = null,
  lang = "en",
  meta = [],
}) => {
  const canRunJavaScript = useIsClient()

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
  image = image !== null ? image : "/social-banner.jpg"

  return (
    <Helmet
      titleTemplate={`%s — ${site.siteMetadata.title}`}
      defaultTitle={site.siteMetadata.title}
    >
      <html lang={lang} />

      <script>
        {`
                    const darkMode = localStorage.getItem('dark-mode-preference')
                    if (darkMode === 'true' || darkMode === 'false') {
                        document.querySelector('html').classList.add(darkMode === 'true' ? 'dark-theme' : 'light-theme')
                    }
                `}
      </script>

      {title ? <title>{title}</title> : null}

      {[16, 32, 192, 512].map(size => (
        <link
          key={size}
          rel="icon"
          type="image/png"
          sizes={`${size}x${size}`}
          href={`/favicon-${size}x${size}.png`}
        />
      ))}

      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta
        property="og:image"
        content={`https://johann.pardanaud.com${image}`}
      />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={`@${site.siteMetadata.twitter}`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />

      {meta.map(props => (
        <meta {...props} />
      ))}

      {canRunJavaScript &&
        (() => {
          if (hasInjectedPlausible) return
          hasInjectedPlausible = true
          return (
            <script
              defer
              data-domain="johann.pardanaud.com"
              data-api="https://s.nesk.workers.dev/api/send"
              src="https://s.nesk.workers.dev/init.js"
            ></script>
          )
        })()}
    </Helmet>
  )
}
const useIsClient = () => {
  const [isClient, setIsClient] = React.useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
}
