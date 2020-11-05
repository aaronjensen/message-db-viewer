import { Stream } from "@components/stream"
import "twin.macro"

export const StreamList = ({ names }: { names: string[] }) => {
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
