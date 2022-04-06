import React from 'react'
import styled from 'styled-components'

const Figure = styled.figure`
    .gatsby-resp-image-wrapper {
        margin-bottom: 0.625rem;
    }

    p {
        margin: 0;
    }

    figcaption {
        text-align: center;
        font-size: 0.85em;
        color: var(--grey-400);
    }
`

export const Caption = ({ children, text }) => (
    <Figure>
        {children}
        <figcaption>{text}</figcaption>
    </Figure>
)
