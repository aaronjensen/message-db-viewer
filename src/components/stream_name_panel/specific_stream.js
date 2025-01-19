import { useRef } from "react"
import { useRouter } from "next/router"
import { Button } from "@components/button"
import { addStream } from "@lib/router"

export const SpecificStream = () => {
  const router = useRouter()
  const textRef = useRef()

  const onClick = (e) => {
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
      <label htmlFor="specific-stream" className="mb-2 pl-2 block text-white">
        Specific Stream
      </label>
      <div className="flex gap-2 items-center w-full pr-2">
        <input
          id="specific-stream"
          ref={textRef}
          type="text"
          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full text-sm border-gray-300 rounded-md py-1 px-2 max-w-[500px]"
        />
        <Button type="submit" onClick={onClick}>
          Add
        </Button>
      </div>
    </form>
  )
}
