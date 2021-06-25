import React, {useState} from 'react';
import {View, Button} from 'react-native';
import {mediaDevices, RTCView} from 'react-native-webrtc';
import streaming from './streaming';

const {createPeer} = streaming;

function Host({navigation}) {
  const [streamUrl, setStreamUrl] = useState(null);
  const [mirror, setMirror] = useState(false);

  async function init() {
    setMirror(false);
    const stream = await mediaDevices.getUserMedia({
      video: {
        mandatory: {
          minWidth: 300, // Provide your own width, height and frame rate here
          minHeight: 480,
          minFrameRate: 30,
        },
        facingMode: 'environment',
      },
      audio: true,
    });
    setStreamUrl(stream);
  }

  function startStream() {
    createPeer(streamUrl);
  }

  function flipCamera() {
    if (streamUrl) {
      streamUrl.getVideoTracks().forEach(track => track._switchCamera());
      setMirror(!mirror);
    }
  }

  return (
    <View>
      <RTCView
        streamURL={streamUrl?.toURL()}
        style={{height: 415, flex: 0}}
        mirror={mirror}
      />

      <View
        style={{
          margin: 10,
          marginTop: 20,
        }}>
        <Button title="Initialize Stream" onPress={() => init()} />
      </View>
      <View
        style={{
          margin: 10,
        }}>
        <Button title="Start Stream" onPress={() => startStream()} />
      </View>
      <View
        style={{
          margin: 10,
        }}>
        <Button title="Flip Camera" onPress={() => flipCamera()} />
      </View>

      <View
        style={{
          margin: 10,
        }}>
        <Button
          title="Move to Guest"
          onPress={() => navigation.navigate('Guest')}
        />
      </View>
    </View>
  );
}

export default Host;
