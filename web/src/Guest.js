import React from 'react'
import axios from 'axios'
import env from './env'

const { config, ip } = env

function Guest() {
  async function init() {
    const peer = createPeer()
    peer.addTransceiver('video', { direction: 'recvonly' })
  }

  function createPeer() {
    const peer = new RTCPeerConnection(config)
    peer.ontrack = handleTrackEvent
    peer.onnegotiationneeded = () =>
      handleNegotiationNeededEvent(peer)

    return peer
  }

  async function handleNegotiationNeededEvent(peer) {
    const offer = await peer.createOffer({
      offerToReceiveAudio: 1,
      offerToReceiveVideo: 1
    })
    await peer.setLocalDescription(offer)
    const payload = {
      sdp: peer.localDescription
    }

    const { data } = await axios.post(`${ip}/consumer`, payload)
    const desc = new RTCSessionDescription(data.sdp)
    peer.setRemoteDescription(desc).catch(e => console.log(e))
  }

  function handleTrackEvent(e) {
    let remoteVideo = document.getElementById('video')
    console.log('track is >>', e.streams[0])
    remoteVideo.srcObject = e.streams[0]
  }

  return (
    <div>
      <h1>Viewer</h1>
      <div id='vidCon'>
        <video
          autoPlay={true}
          id='video'
          style={{
            height: 300,
            width: 300,
            borderRadius: 10
          }}
        >
          <source src='' type='video/mp4' />
        </video>
      </div>
      <button id='my-button' onClick={() => init()}>
        View Stream
      </button>
    </div>
  )
}

export default Guest
