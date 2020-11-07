import { Button } from "@components/button"
import "twin.macro"
import { addStream } from "@lib/router"
import { useRouter } from "next/router"

export const StreamNameList = ({
  streamNames,
  title,
}: {
  streamNames: string[]
  title: string
}) => {
  const router = useRouter()

  return (
    <div>
      <h2 tw="font-bold mb-2">{title}</h2>
      <ul tw="rounded-lg bg-white divide-y divide-gray-200">
        {streamNames.map((name) => (
          <li tw="flex justify-between items-center px-2 py-2 gap-2" key={name}>
            <span tw="truncate text-xs" title={name}>
              {name}
            </span>
            <Button onClick={() => addStream(router, name)}>Add</Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
