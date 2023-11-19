import React from "react"
import styled from "styled-components"
import { Seo } from "./seo"
import { Header } from "./header"
import { DarkModeSwitch as BaseDarkModeSwitch } from "./dark-mode"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
`

const DarkModeSwitch = () => {
  const onDarkModeChange = state => {
    const classList = document.querySelector("html").classList
    classList.remove("light-theme")
    classList.remove("dark-theme")

    const theme = state !== null ? (state ? "dark" : "light") : "auto"
    if (theme !== "auto") {
      classList.add(`${theme}-theme`)
    }
  }

  return <BaseDarkModeSwitch onChange={onDarkModeChange} />
}

const Body = styled.main`
  flex: 1 0 auto;
  padding: calc(var(--content-spacing) * 3) 0;

  ${({ center }) => (center ? ` display: flex; align-items: center;` : "")}
`

export const Layout = ({
  children,
  seo,
  autoTopHeading = true,
  centeredBody = false,
}) => (
  <>
    {seo || <Seo />}
    <Container>
      <Header autoTopHeading={autoTopHeading}>
        <DarkModeSwitch />
      </Header>
      <Body id="main" center={centeredBody}>
        {children}
      </Body>
    </Container>
  </>
)
