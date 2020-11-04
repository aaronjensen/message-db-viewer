import * as React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import tw, { css, styled, theme } from 'twin.macro'
import Xarrow from "../src/components/xarrow";

const fetchJSON = url => fetch(url).then(res => res.json());

const Stream = ({ streamName }) => {
  const { data } = useSWR(`/api/stream/${streamName}`, fetchJSON, { refreshInterval: 500 })

  return (
    <div tw="grid grid-flow-col auto-cols-max gap-2 border p-2 bg-gray-100" css={{ width: 'max-content' }}>
      {data && data.map(message => (
        <Message key={message.id} message={message}/>
      ))}
    </div>
  )
}

const Message = ({ message }) => {
  const ref = React.useRef()
  const causationPosition = message.metadata?.causationMessageGlobalPosition

  return (
    <>
      <div ref={ref} id={`message-${message.global_position}`} tw="border px-4 py-2 bg-white flex flex-col">
        <div>{message.type}</div>
        <div tw="grid grid-cols-2 gap-x-2">
          <div>Pos:</div>
          <div tw="text-right">{message.position}</div>

          <div>GP:</div>
          <div tw="text-right">{message.global_position}</div>
        </div>
      </div>
      {causationPosition &&
       <Xarrow
         strokeWidth={2}
         start={`message-${causationPosition}`}
         end={ref}
         startAnchor={{
           position: "bottom",
           offset: { rightness: 10 }
         }}
         endAnchor={{
           position: message.metadata.causationMessageStreamName === message.stream_name ? "bottom" : "top",
           offset: { rightness: -10 }
         }}
       />}
    </>
  )

}

export default function Home() {
  const router = useRouter()

  let streamNames = router.query.streamNames || ""
  streamNames = streamNames.split(',')


  return (
    <div tw="p-4 flex flex-col gap-8">
      {streamNames.map(streamName => (
        <div>
          <div tw="mb-2">{streamName}</div>
          {streamName && <Stream streamName={streamName}/>}
        </div>
      ))}
    </div>
  )
}
