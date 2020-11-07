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
      <ul>
        {streamNames.map((name) => (
          <li key={name}>
            <Button onClick={() => addStream(router, name)}>{name}</Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
