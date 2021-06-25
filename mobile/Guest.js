import React, {useState} from 'react';
import {View, Button, Alert} from 'react-native';
import {RTCView} from 'react-native-webrtc';
import streaming from './streaming';

const {getStream} = streaming;

function Guest({navigation}) {
  const [streamUrl, setStreamUrl] = useState(null);

  async function init() {
    Alert.alert('Joining');
    setStreamUrl(null);
    await getStream({
      test: stream => {
        Alert.alert('Got stream');
        setStreamUrl(stream);
      },
    });
  }
  return (
    <View>
      <RTCView
        streamURL={streamUrl ? streamUrl?.toURL() : null}
        style={{height: 415, width: '100%', flex: 0}}
      />
      <View
        style={{
          margin: 10,
          marginTop: 20,
        }}>
        <Button title="Join Stream" onPress={() => init()} />
      </View>
      <View
        style={{
          margin: 10,
        }}>
        <Button
          title="Go to Host"
          onPress={() => navigation.navigate('Host')}
        />
      </View>
    </View>
  );
}

export default Guest;
