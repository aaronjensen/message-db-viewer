import { useRef } from "react"
import tw from "twin.macro"
import { useRouter } from "next/router"
import { Button } from "@components/button"
import { addStream } from "@lib/router"

const TextInput = tw.input`
  px-2
  border
  border-gray-400
  leading-8
  flex-1
  rounded
  text-sm
`

export const SpecificStream = () => {
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
      <label htmlFor="specific-stream" tw="mb-2 pl-2 block text-white">
        Specific Stream
      </label>
      <div tw="flex gap-2 items-center w-full px-2">
        <TextInput
          id="specific-stream"
          ref={textRef}
          type="text"
          css={{ maxWidth: 500 }}
        />
        <Button type="submit" onClick={onClick}>
          Add
        </Button>
      </div>
    </form>
  )
}
