import React, { useState } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

const Label = styled.label`
  --size: calc(var(--button-radius) * 2);

  position: absolute;
  top: 0;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, calc(var(--button-offset) * -100%));
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--size);
  min-width: var(--size);
  height: var(--size);
  background: var(--color-bg-code-fold);
  border: 0.2rem solid var(--color-bg-code);
  color: var(--color-bg-code);
  cursor: pointer;
`

const Input = styled.input`
  display: none;

  &:checked + ${Label} svg {
    transform: rotateZ(45deg);
  }

  &:not(:checked) + ${Label} + pre .grvsc-line-highlighted {
    display: none;
  }
`

const StyledCodeFold = styled.div`
  --button-radius: 0.9rem;
  --button-offset: 0.35; // percentage unit

  position: relative;

  pre {
    // Modify the padding top of the code block to make space for the button.
    // Steps: divide the original padding top by 2, add the height of the button, remove the button offset.
    padding-top: calc(
      (var(--grvsc-padding-top, var(--grvsc-padding-v, 1rem)) / 2) +
        (var(--button-radius) * 2) -
        (var(--button-radius) * 2 * var(--button-offset))
    );
  }
`

export const CodeFold = ({ children }) => {
  const [checkboxId] = useState(generateRandomId())
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <StyledCodeFold>
      <Input
        id={`code-fold-${checkboxId}`}
        type="checkbox"
        checked={isExpanded}
        onChange={() => setIsExpanded(isExpanded => !isExpanded)}
      />
      <Label
        title="Toggle expanded code"
        tabIndex="0"
        className="focusable"
        htmlFor={`code-fold-${checkboxId}`}
        role="checkbox"
        aria-label="Check to expand the code"
        aria-checked={isExpanded}
      >
        <FontAwesomeIcon icon={faPlus} />
      </Label>
      {children}
    </StyledCodeFold>
  )
}

const generateRandomId = () => Math.floor(Math.random() * 1_000_000)
