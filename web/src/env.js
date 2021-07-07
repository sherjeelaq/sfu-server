const config = {
  transportPolicy: 'relay',
  iceServers: []
  // iceTransportPolicy: 'relay' // uncomment this line if you want the user to just connect with TURN server
}

// const config = {
//   iceServers: [
//     {
//       urls: 'stun:stun.stunprotocol.org'
//     }
//   ]
// }

const ip = 'https://sfuserver.herokuapp.com'
// const ip = 'https://invented-tundra-eagle.glitch.me'

// const ip = 'http://192.168.1.33:5000'
export default {
  config,
  ip
}
