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
