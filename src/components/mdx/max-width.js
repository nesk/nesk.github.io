import React from "react"
import styled from "styled-components"

const MaxWidthStyle = styled.p`
  margin-left: auto;
  margin-right: auto;
  max-width: ${({ max }) => `${max}px`};
`

export const MaxWidth = ({ max, children }) => {
  // Remove <p> tags from the children, since the MaxWidth component is of the same type.
  const mappedChildren = React.Children.map(children, child => {
    if (child.props.originalType === "p") {
      return child.props.children
    }

    return child
  })

  return <MaxWidthStyle max={max}>{mappedChildren}</MaxWidthStyle>
}
