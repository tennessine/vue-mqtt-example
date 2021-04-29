import Vue from 'vue'
import App from './App.vue'
import {connect} from 'mqtt'

Vue.config.productionTip = false

let client = connect('wss://mqttx.cn:8883/mqtt');

client.on('connect', function(connack) {
  console.log(connack);
  console.log('connected');
  client.subscribe('test/topic', {
    qos: 1
  });
  setInterval(function() {
    client.publish('test/topic', 'hello from browser: ' + new Date(), {
      qos: 1
    });
  }, 3000);
});

client.on('message', function(topic, payload, packet) {
  console.log(topic, payload.toString('utf-8'), packet);
});

new Vue({
  render: h => h(App),
}).$mount('#app')
