const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const webrtc = require('wrtc')
const cors = require('cors')
let senderStream

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const config = {
  transportPolicy: 'relay',
  iceServers: [
    { urls: ['stun:ss-turn2.xirsys.com'] },
    {
      username:
        'xR1Sb3-GrIK067wvB2mDWEw8MTcsOa_-1SXpds8mpz2YkCQB_zLUyGefnqWJ74b-AAAAAGB_3pBNdW5lZWJOZXNsaXQ=',
      credential: '65c4f662-a279-11eb-89a9-0242ac140004',
      urls: [
        'turn:ss-turn2.xirsys.com:80?transport=udp',
        'turn:ss-turn2.xirsys.com:3478?transport=udp',
        'turn:ss-turn2.xirsys.com:80?transport=tcp',
        'turn:ss-turn2.xirsys.com:3478?transport=tcp',
        'turns:ss-turn2.xirsys.com:443?transport=tcp',
        'turns:ss-turn2.xirsys.com:5349?transport=tcp'
      ]
    }
  ]
  // iceTransportPolicy: "relay", // uncomment this line if you want the user to just connect with TURN server
}

app.post('/consumer', async ({ body }, res) => {
  console.log('Guest connected')
  const peer = new webrtc.RTCPeerConnection(config)
  const desc = new webrtc.RTCSessionDescription(body.sdp)
  await peer.setRemoteDescription(desc)
  try {
    await senderStream
      .getTracks()
      .forEach(
        async track => await peer.addTrack(track, senderStream)
      )
  } catch {
    console.log('No streams found')
  }
  const answer = await peer.createAnswer()
  await peer.setLocalDescription(answer)

  const payload = {
    sdp: peer.localDescription
  }

  console.log('payload is >>', payload)
  res.json(payload)
})

app.post('/broadcast', async ({ body }, res) => {
  console.log('Host connected')
  const peer = new webrtc.RTCPeerConnection(config)
  peer.ontrack = e => handleTrackEvent(e, peer)
  const desc = new webrtc.RTCSessionDescription(body.sdp)
  await peer.setRemoteDescription(desc)
  const answer = await peer.createAnswer()
  await peer.setLocalDescription(answer)
  const payload = {
    sdp: peer.localDescription
  }

  res.json(payload)
})

function handleTrackEvent(e, peer) {
  senderStream = e.streams[0]
}

app.listen(5000, () => console.log('server started'))
