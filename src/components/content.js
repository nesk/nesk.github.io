import styled from "styled-components"

export const Content = styled.div`
  margin: 0 auto;
  padding: 0 var(--content-spacing);

  @media (min-width: 768px) {
    width: 42rem;
  }

  @media (min-width: 992px) {
    width: 53rem;
  }
`
