import {RTCPeerConnection, RTCSessionDescription} from 'react-native-webrtc';
import {Alert} from 'react-native';
import axios from 'axios';
import env from './env';

const {config, ip} = env;

//For host - using old method like addStream etc
async function createPeer(stream) {
  const peer = new RTCPeerConnection(config);
  await peer.addStream(stream);

  peer.createOffer().then(async offer => {
    await peer.setLocalDescription(offer);

    const payload = {
      sdp: peer.localDescription,
    };

    const {data} = await axios.post(`${ip}/broadcast`, payload);
    try {
      const desc = new RTCSessionDescription(data.sdp);
      await peer.setRemoteDescription(desc).catch(e => console.log(e));
    } catch (e) {}
  });
}

//For guest - using old method like onaddstream etc
async function getStream({test}) {
  const peer = new RTCPeerConnection(config);

  peer.onaddstream = event => {
    test(event.stream);
  };

  const offer = await peer.createOffer({
    offerToReceiveVideo: 1,
    offerToReceiveAudio: 1,
  });

  try {
    await peer.setLocalDescription(offer);
    const payload = {
      sdp: peer.localDescription,
    };

    const {data} = await axios.post(`${ip}/consumer`, payload);

    const desc = new RTCSessionDescription(data.sdp);
    peer.setRemoteDescription(desc).catch(e => console.log(e));
  } catch (e) {
    Alert.alert('Error', `${e}`);
  }
}
const streaming = {
  createPeer,
  getStream,
};

export default streaming;
