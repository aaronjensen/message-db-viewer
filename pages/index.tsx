import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import tw, { css, styled, theme } from 'twin.macro'

const fetchJSON = url => fetch(url).then(res => res.json());

const Stream = ({ streamName }) => {
  const { data } = useSWR(`/api/stream/${streamName}`, fetchJSON)

  return (
    <div tw="grid grid-flow-col auto-cols-max gap-2 border p-2 bg-gray-100">
      {data && data.map(message => (
        <Message key={message.id} message={message}/>
      ))}
    </div>
  )
}

const Message = ({ message }) => {
  return (
    <div tw="border px-4 py-2 bg-white flex flex-col">
      <div>{message.type}</div>
      <div tw="grid grid-cols-2 gap-x-2">
        <div>Pos:</div>
        <div tw="text-right">{message.position}</div>

        <div>GP:</div>
        <div tw="text-right">{message.global_position}</div>
      </div>
    </div>
  )

}

export default function Home() {
  const router = useRouter()

  const streamName = router.query.streamName
  console.log(streamName)

  return (
    <div tw="p-4">
      <div tw="mb-2">{streamName}</div>
      {streamName && <Stream streamName={streamName}/>}
    </div>
  )
}
