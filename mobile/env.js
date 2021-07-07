const config = {
  transportPolicy: 'relay',
  iceServers: [],
  // iceTransportPolicy: "relay", // uncomment this line if you want the user to just connect with TURN server
};

const ip = '';

// const ip = 'http://192.168.1.33:5000';
export default {
  config,
  ip,
};
