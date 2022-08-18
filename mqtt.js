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
        // onclick="changeColorAndSize('white',100)"
        $("#color1").css("border-width","2px");
        $("#color1").css("background","rgb(210,210,210)");
        $("#color1").css("pointer-events","none");
        $("#color1Similar").hide();

      }
      else
      {
        console.log("print1!");
        $("#color1").css("pointer-events","all");
        $("#color1").removeAttr('onclick').attr(
          "onclick","changeColorAndSize(\'#"+message.toString()+"\',10); showSimilarColor1();");
        $("#color1").css("background","#"+message.toString());
        createSimilarColor(hexToRgb(message.toString()).r, hexToRgb(message.toString()).g, hexToRgb(message.toString()).b,1);
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
        $("#color2Similar").hide();
      }
      else
      {
        console.log("print2!");
        $("#color2").css("pointer-events","all");
        $("#color2").removeAttr('onclick').attr("onclick","changeColorAndSize(\'#"+message.toString()+"\',10); showSimilarColor2();");
        $("#color2").css("background","#"+message.toString());
        createSimilarColor(hexToRgb(message.toString()).r, hexToRgb(message.toString()).g, hexToRgb(message.toString()).b,2);
      }
  }
  else if(topic == topicmix){
    if(message.toString() == "deletemix"){
      console.log("deletemix!");
        $("#mixcolor").removeAttr('onclick');
        $("#mixcolor").css("border-width","2px");
        $("#mixcolor").css("background","rgb(210,210,210)");
        $("#mixcolor").css("pointer-events","none");
        $("#colormixSimilar").hide();
    }
    else{
        console.log("mix!");
        $("#mixcolor").css("pointer-events","all");
        $("#mixcolor").removeAttr('onclick').attr("onclick","changeColorAndSize(\'#"+message.toString()+"\',10); showSimilarColorMix();");
        $("#mixcolor").css("background","#"+message.toString());
        createSimilarColor(hexToRgb(message.toString()).r, hexToRgb(message.toString()).g, hexToRgb(message.toString()).b,"mix");
    }

  }
  console.log('Received Message: ' + message.toString() + '\nOn topic: ' + topic)
})

client.on('close', () => {
  console.log(clientId + ' disconnected')
})

function showSimilarColor1(){
  $("#color1Similar").show();
  $("#colormixSimilar").hide();
  $("#color2Similar").hide();
}

function showSimilarColorMix(){
  $("#colormixSimilar").show();
  $("#color1Similar").hide();
  $("#color2Similar").hide();
}

function showSimilarColor2(){
  $("#color2Similar").show();
  $("#color1Similar").hide();
  $("#colormixSimilar").hide();
  
}

function createSimilarColor(r,g,b,which){
  var i1 = 20;var i2 = 30;var i3 = 40;var i4 = 50;

  $(".c" + which +"-1").css("background","rgb("+ (r+i4) + "," + (g+i4) + ","+ (b+i4) + ")");
  $(".c" + which +"-2").css("background","rgb("+ (r+i3) + "," + (g+i3) + ","+ (b+i3) + ")");
  $(".c" + which +"-3").css("background","rgb("+ (r+i2) + "," + (g+i2) + ","+ (b+i2) + ")");
  $(".c" + which +"-4").css("background","rgb("+ (r+i1) + "," + (g+i1) + ","+ (b+i1) + ")");
  $(".c" + which +"-5").css("background","rgb("+ (r) + "," + (g) + ","+ (b) + ")");
  $(".c" + which +"-6").css("background","rgb("+ (r-i1) + "," + (g-i1) + ","+ (b-i1) + ")");
  $(".c" + which +"-7").css("background","rgb("+ (r-i2) + "," + (g-i2) + ","+ (b-i2) + ")");
  $(".c" + which +"-8").css("background","rgb("+ (r-i3) + "," + (g-i3) + ","+ (b-i3) + ")");
  $(".c" + which +"-1").removeAttr('onclick').attr("onclick","changeColorAndSize(rgbToHex(" + (r+i4) + "," + (g+i4) + "," + (b+i4)+"),10);");
  $(".c" + which +"-2").removeAttr('onclick').attr("onclick","changeColorAndSize(rgbToHex(" + (r+i3) + "," + (g+i3) + "," + (b+i3)+"),10);");
  $(".c" + which +"-3").removeAttr('onclick').attr("onclick","changeColorAndSize(rgbToHex(" + (r+i2) + "," + (g+i2) + "," + (b+i2)+"),10);");
  $(".c" + which +"-4").removeAttr('onclick').attr("onclick","changeColorAndSize(rgbToHex(" + (r+i1) + "," + (g+i1) + "," + (b+i1)+"),10);");
  $(".c" + which +"-5").removeAttr('onclick').attr("onclick","changeColorAndSize(rgbToHex(" + (r) + "," + (g) + "," + (b)+"),10);");
  $(".c" + which +"-6").removeAttr('onclick').attr("onclick","changeColorAndSize(rgbToHex(" + (r-i1) + "," + (g-i1) + "," + (b-i1)+"),10);");
  $(".c" + which +"-7").removeAttr('onclick').attr("onclick","changeColorAndSize(rgbToHex(" + (r-i2) + "," + (g-i2) + "," + (b-i2)+"),10);");
  $(".c" + which +"-8").removeAttr('onclick').attr("onclick","changeColorAndSize(rgbToHex(" + (r-i3) + "," + (g-i3) + "," + (b-i3)+"),10);");
  
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// alert(hexToRgb("#0033ff").g);

// $("#canvas").click(function(){
//   $("#color1Similar").hide();
//   $("#color2Similar").hide();
//   $("#colormixSimilar").hide();
// });

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// alert(rgbToHex(0, 51, 255)); // #0033ff
 

