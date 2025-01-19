import { Button } from "@components/button"
import { addStream } from "@lib/router"
import { useRouter } from "next/router"

export const StreamNameList = ({ streamNames, title }) => {
  const router = useRouter()

  return (
    <div>
      <h2 className="mb-2 pl-2 text-white">{title}</h2>
      <ul className="rounded-lg bg-white divide-y divide-gray-200">
        {streamNames.map((name) => (
          <li
            className="flex justify-between items-center p-2 gap-2"
            key={name}
          >
            <span className="truncate text-xs" title={name}>
              {name}
            </span>
            <Button onClick={() => addStream(router, name)}>Add</Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
