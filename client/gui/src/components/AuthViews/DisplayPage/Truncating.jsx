import {useState} from "react"

export const Truncating = ({postDescription, truncateNumber}) => {

    const [truncate, setTruncate] = useState(false)

    const showTruncate = () => {
        setTruncate(true)
    }

  return (
    <>
    {!truncate ?
        <p style={{whiteSpace:"pre-line"}}>
            {postDescription.substring(0,truncateNumber)}
            {postDescription.length > truncateNumber ? <span style = {{cursor:"pointer"}} onClick={showTruncate}>...</span> : null}
        </p>
        :
        <p style={{whiteSpace:"pre-line"}}>
            {console.log("showing rest")}
            {postDescription}
        </p>
    }
    </>
  )
}