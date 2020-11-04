import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const fetchJSON = url => fetch(url).then(res => res.json());

const Stream = ({ streamName }) => {
  const { data } = useSWR(`/api/stream/${streamName}`, fetchJSON)

  return (
    <div>
      {data.map(message => <Message message={message}/>)}
    </div>
  )
}

const Message = ({message}) => {
  return (
    <div>
      <div>{message.type}</div>
      <div>Position: {message.position}</div>
      <div>GP: {message.global_position}</div>
    </div>
  )

}

export default function Home() {
  const router = useRouter()

  const streamName = router.query.streamName
  console.log(streamName)


  return (
    <div>
      {streamName && <Stream streamName={streamName}/>}
    </div>
  )
}
