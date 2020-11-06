import { useRef } from "react"
import tw from "twin.macro"
import { useRouter } from "next/router"
import { Button } from "@components/button"
import { addStream } from "@lib/router"

const TextInput = tw.input`
  px-4
  py-2
  border
  border-gray-300
  leading-5
  flex-1
`

export const AddStream = () => {
  const router = useRouter()
  const textRef = useRef<any>()

  const onClick = (e: any) => {
    e.preventDefault()
    if (!textRef.current) return

    const streamName = textRef.current.value.trim()

    if (streamName) {
      textRef.current.value = ""
      addStream(router, streamName)
    }
  }

  return (
    <form>
      <div tw="flex gap-4 items-center w-full">
        <TextInput ref={textRef} type="text" css={{ maxWidth: 500 }} />
        <Button type="submit" onClick={onClick}>
          Add Stream
        </Button>
      </div>
    </form>
  )
}
