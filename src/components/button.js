import styled from "styled-components"

export const IconButton = styled.button.attrs(props => ({
  className: props.as === "a" ? "link-no-color-when-inactive" : "focusable",
}))`
  position: relative;
  display: inline-flex;
  padding: 0;
  background: transparent;
  border: 0;
  appearance: none;
  font-size: 1.5625rem;
  ${({ as }) => (as !== "a" ? "color: inherit;" : "")}

  &::after {
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    bottom: -0.5rem;
    left: -0.5rem;
    content: "";
  }
`
