import React from 'react'
import axios from 'axios'

import env from './env'
const { config, ip } = env

function Host() {
  async function init() {
    //getting the host stream
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    })

    //showing it locally
    document.getElementById('video').srcObject = stream

    const peer = createPeer()
    stream.getTracks().forEach(track => peer.addTrack(track, stream))
  }

  function createPeer() {
    const peer = new RTCPeerConnection(config)
    peer.onnegotiationneeded = () =>
      handleNegotiationNeededEvent(peer)

    return peer
  }

  async function handleNegotiationNeededEvent(peer) {
    //creating an offer an passing the local description of the stream to
    //the server
    const offer = await peer.createOffer()
    await peer.setLocalDescription(offer)
    const payload = {
      sdp: peer.localDescription
    }

    const { data } = await axios.post(`${ip}/broadcast`, payload)
    const desc = new RTCSessionDescription(data.sdp)
    peer.setRemoteDescription(desc).catch(e => console.log(e))
  }
  return (
    <div>
      <h1>Host</h1>
      <video autoPlay={true} id='video'></video>
      <br />
      <button id='my-button' onClick={() => init()}>
        Start Stream
      </button>
    </div>
  )
}

export default Host
