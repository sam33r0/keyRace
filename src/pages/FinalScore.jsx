import React from 'react'
import { useSelector } from 'react-redux'

function FinalScore() {
    const score = useSelector((state)=>state.score);
  return (
    <div>FinalScore{JSON.stringify(score)}</div>
  )
}

export default FinalScore