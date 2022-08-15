const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)

const host = 'ws://broker.emqx.io:8083/mqtt'

const topic1 = "nccudct_color1_1"
const topic2 = "nccudct_color2_1"
const topicmix = "nccudct_mixcolor_1"

const options = {
  keepalive: 30,
  clientId: clientId,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: 'WillMsg',
    payload: 'Connection Closed abnormally..!',
    qos: 0,
    retain: false
  },
  rejectUnauthorized: false
}

console.log('connecting mqtt client')
const client = mqtt.connect(host, options)

client.on('error', (err) => {
  console.log('Connection error: ', err)
  client.end()
})

client.on('reconnect', () => {
  console.log('Reconnecting...')
})

client.on('connect', () => {
  console.log('Client connected:' + clientId)
  client.subscribe(topic1, { qos: 0 })
  client.subscribe(topic2, { qos: 0 })
  client.subscribe(topicmix, { qos: 0 })
//   client.publish('real_unique_topic', 'ws connection demo...!', { qos: 0, retain: false })

})

client.on('message', (topic, message, packet) => { //判斷哪個topic傳入的值
  if(topic == topic1){
      if(message.toString() =="delete1")
      {
        console.log("delete1!");
        $("#color1").removeAttr('onclick');
        $("#color1").css("border-width","2px");
        $("#color1").css("background","rgb(210,210,210)");
        $("#color1").css("pointer-events","none");
      }
      else
      {
        console.log("print1!");
        $("#color1").css("pointer-events","all");
        $("#color1").removeAttr('onclick').attr("onclick","changeColorAndSize(\'#"+message.toString()+"\',10)");
        $("#color1").css("background","#"+message.toString());
      }
  }
  else if(topic == topic2){
    if(message.toString()=="delete2")
      {
        console.log("delete2!");
        $("#color2").removeAttr('onclick');
        $("#color2").css("border-width","2px");
        $("#color2").css("background","rgb(210,210,210)");
        $("#color2").css("pointer-events","none");
      }
      else
      {
        console.log("print2!");
        $("#color2").css("pointer-events","all");
        $("#color2").removeAttr('onclick').attr("onclick","changeColorAndSize(\'#"+message.toString()+"\',10)");
        $("#color2").css("background","#"+message.toString());
      }
  }
  else if(topic == topicmix){
    if(message.toString() == "deletemix"){
      console.log("deletemix!");
        $("#mixcolor").removeAttr('onclick');
        $("#mixcolor").css("border-width","2px");
        $("#mixcolor").css("background","rgb(210,210,210)");
        $("#mixcolor").css("pointer-events","none");
    }
    else{
        console.log("mix!");
        $("#mixcolor").css("pointer-events","all");
        $("#mixcolor").removeAttr('onclick').attr("onclick","changeColorAndSize(\'#"+message.toString()+"\',10)");
        $("#mixcolor").css("background","#"+message.toString());
    }

  }
  console.log('Received Message: ' + message.toString() + '\nOn topic: ' + topic)
})

client.on('close', () => {
  console.log(clientId + ' disconnected')
})