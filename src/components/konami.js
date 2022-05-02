import { useState, useEffect } from "react"

const defaultKonamiCodeSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
]

const sequenceChecker = ({
  sequence = defaultKonamiCodeSequence,
  progress = 0,
  current = null,
}) => {
  const slicedSequence = sequence.slice(progress)

  if (slicedSequence.length === 0) {
    return true
  }

  if (slicedSequence[0] === current) {
    return slicedSequence.length > 1 ? progress + 1 : true
  }

  return 0
}

export const useKonamiCode = () => {
  const [progress, setProgress] = useState(0)
  const [isTriggered, setIsTriggered] = useState(false)

  useEffect(() => {
    const listener = ({ key: current }) => {
      const result = sequenceChecker({ progress, current })
      result === true ? setIsTriggered(true) : setProgress(result)
    }

    document.addEventListener("keydown", listener)

    return () => document.removeEventListener("keydown", listener)
  }, [progress])

  return isTriggered
}
