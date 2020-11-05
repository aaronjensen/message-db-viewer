import { Stream } from "@components/stream"
import { Message } from "@data/message"
import { atom } from "jotai"
import { atomFamily } from "jotai/utils.cjs"
import "twin.macro"

const streamNamesAtom = atom<String[]>([])

const getStreamAtom = atomFamily((streamName: string) => ({
  streamName,
  messages: [] as Message[],
}))

export const StreamList = ({ names }: { names: string[] }) => {
  const streamAtoms = names.map(getStreamAtom)

  return (
    <div tw="p-4 flex flex-col gap-8">
      {names.map((name) => (
        <div key={name}>
          <div tw="z-10 absolute bg-white bg-opacity-75">{name}</div>
          <div tw="z-0 mt-8">
            <Stream streamName={name} />
          </div>
        </div>
      ))}
    </div>
  )
}
