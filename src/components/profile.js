import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGithub,
  faTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons"
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons"
import { Content } from "../components/content"
import { IconButton } from "../components/button"
import { useKonamiCode } from "../components/konami"

const About = styled(Content)`
  max-width: min(300px, 100%);
  display: grid;
  grid-template-rows: [avatar-start] auto [avatar-end social-start] auto [social-end speech-start] auto [speech-end];
  grid-template-columns: 1fr;
  grid-row-gap: calc(var(--content-spacing) * 2);
  justify-items: center;
  align-items: center;

  @media (min-width: 768px) {
    max-width: none;
    height: 100%;
    grid-template-rows: [avatar-start speech-start] auto [avatar-end speech-end social-start] auto [social-end];
    grid-template-columns: [avatar-start social-start] 10.5rem [avatar-end social-end speech-start] 27.5rem [speech-end];
    grid-column-gap: calc(var(--content-spacing) * 2);
  }

  @media (min-width: 992px) {
    grid-template-columns: [avatar-start social-start] 13rem [avatar-end social-end speech-start] 35rem [speech-end];
    grid-row-gap: calc(var(--content-spacing) * 2);
    grid-column-gap: calc(var(--content-spacing) * 3);
    font-size: 1.4rem;
  }
`

const Avatar = styled(Img)`
  grid-area: avatar;
  border-radius: 9999px;
  overflow: hidden;

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    box-shadow: inset 0 0 20px var(--shadow);
    pointer-events: none;
    content: "";
  }

  @media (max-width: 767.98px) {
    width: calc(100% - 4rem);
  }

  @media (min-width: 768px) {
    justify-self: stretch;
  }
`

const Social = styled.div`
  grid-area: social;
  display: flex;
  justify-content: space-evenly;

  @media (max-width: 767.98px) {
    width: calc(100% - 4rem);
  }

  @media (min-width: 768px) {
    justify-self: stretch;
  }
`

const StyledIconLink = styled(IconButton)`
  @media (min-width: 992px) {
    font-size: 1.75rem;
  }
`

const IconLink = props => <StyledIconLink {...props} as="a" />

const Speech = styled.p`
  grid-area: speech;
  font-size: 1.2rem;
  font-style: ${props => (props.as === "blockquote" ? "italic" : "normal")};

  @media (min-width: 992px) {
    font-size: 1.4rem;
  }
`

const OriginalSpeech = () => (
  <Speech>
    I'm Johann Pardanaud, a <em>freelance Back-End developer</em> available to
    work on your projects! I can help you architect and code your projects by
    taking advantage of microservices, thoughtful database structures, and
    asynchronous flows.
  </Speech>
)

const KonamiSpeech = () => {
  return (
    <Speech
      as="blockquote"
      lang="fr"
      cite="https://www.reddit.com/r/france/comments/g744c9/a/fofi03m/"
    >
      Loser gauchiste tendance new age qui raconte sa vie sur Twitter et rempli
      son Github de scripts pourris.
      <ExternalLink
        href="https://www.reddit.com/r/france/comments/g744c9/a/fofi03m/"
        title="See the Reddit comment"
        target="_blank"
      >
        <FontAwesomeIcon icon={faExternalLinkAlt} />
      </ExternalLink>
    </Speech>
  )
}

const ExternalLink = styled.a`
  margin-left: 0.5em;
  vertical-align: top;
  font-size: 0.6em;
`

export const Profile = ({ avatarSrc }) => {
  const hasTriggeredKonamiCode = useKonamiCode()

  return (
    <About>
      {hasTriggeredKonamiCode ? <KonamiSpeech /> : <OriginalSpeech />}

      <Social>
        <IconLink
          href="https://github.com/nesk/"
          title="See my Github account"
          aria-label="See my Github account"
        >
          <FontAwesomeIcon icon={faGithub} />
        </IconLink>
        <IconLink
          href="https://twitter.com/johannpardanaud"
          title="See my Twitter account"
          aria-label="See my Twitter account"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </IconLink>
        <IconLink
          href="https://www.linkedin.com/in/johann-pardanaud/"
          title="See my LinkedIn account"
          aria-label="See my LinkedIn account"
        >
          <FontAwesomeIcon icon={faLinkedinIn} />
        </IconLink>
      </Social>

      <Avatar fluid={avatarSrc} alt="Johann Pardanaud's avatar"></Avatar>
    </About>
  )
}
