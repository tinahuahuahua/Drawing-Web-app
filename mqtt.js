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
        $('#similarButtonBox').hide();

      }
      else
      {
        console.log("print1!");
        $("#color1").css("pointer-events","all");
        $("#color1").removeAttr('onclick').attr(
          "onclick","changeColorAndSize(\'#"+message.toString()+"\'); showSimilarColor1();");
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
        $('#similarButtonBox').hide();
      }
      elseonclick="changeColorAndSize('yellow')"
      {
        console.log("print2!");
        $("#color2").css("pointer-events","all");
        // $("#mixcolor").removeAttr('onclick').attr("onclick","changeColorAndSize(\'#"+message.toString()+"\',10); showSimilarColorMix();");
        $("#color2").removeAttr('onclick').attr("onclick","changeColorAndSize(\'#"+message.toString()+"\'); showSimilarColor2();");
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
        $('#similarButtonBox').hide();
    }
    else{
        console.log("mix!");
        $("#mixcolor").css("pointer-events","all");
        // $("#color2").removeAttr('onclick').attr("onclick","changeColorAndSize(\'#"+message.toString()+"\'); showSimilarColor2();");
        $("#mixcolor").removeAttr('onclick').attr("onclick","changeColorAndSize(\'#"+message.toString()+"\'); showSimilarColorMix();");
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
  $('#color1').css('border-width', '5px');
  $('#mixcolor').css('border-width', '2px');
  $('#color2').css('border-width', '2px');
  $('#similarButtonBox').show();
  $("#color1Similar").show();
  $("#colormixSimilar").hide();
  $("#color2Similar").hide();

}

function showSimilarColorMix(){
  $('#mixcolor').css('border-width', '5px');
  $('#color1').css('border-width', '2px');
  $('#color2').css('border-width', '2px');
  $('#similarButtonBox').show();
  $("#colormixSimilar").show();
  $("#color1Similar").hide();
  $("#color2Similar").hide();
  
}

function showSimilarColor2(){
  $('#color2').css('border-width', '5px');
  $('#color1').css('border-width', '2px');
  $('#mixcolor').css('border-width', '2px');
  $('#similarButtonBox').show();
  $("#color2Similar").show();
  $("#color1Similar").hide();
  $("#colormixSimilar").hide();
  
}

function createSimilarColor(r,g,b,which){
  var i1 = 20;var i2 = 30;var i3 = 40;var i4 = 50;
  var rplus4 = r+i4;var gplus4 = g+i4;var bplus4 = b+i4;
  var rplus3 = r+i3;var gplus3 = g+i3;var bplus3 = b+i3;
  var rplus2 = r+i2;var gplus2 = g+i2;var bplus2 = b+i2;
  var rplus1 = r+i1;var gplus1 = g+i1;var bplus1 = b+i1;
  var rminus3 = r-i3;var gminus3 = g-i3;var bminus3 = b-i3;
  var rminus2 = r-i2;var gminus2 = g-i2;var bminus2 = b-i2;
  var rminus1 = r-i1;var gminus1 = g-i1;var bminus1 = b-i1;

  if(rminus1 < 0){ rminus1 =0; } if(gminus1 < 0){ gminus1 =0; } if(bminus1 < 0){ bminus1 =0; }
  if(rminus2 < 0){ rminus2 =0; } if(gminus2 < 0){ gminus2 =0; } if(bminus2 < 0){ bminus2 =0; }
  if(rminus3 < 0){ rminus3 =0; } if(gminus3 < 0){ gminus3 =0; } if(bminus3 < 0){ bminus3 =0; }

  $(".c" + which +"-1").css("background","rgb("+ (rplus4) + "," + (gplus4) + ","+ (bplus4) + ")");
  $(".c" + which +"-2").css("background","rgb("+ (rplus3) + "," + (gplus3) + ","+ (bplus3) + ")");
  $(".c" + which +"-3").css("background","rgb("+ (rplus2) + "," + (gplus2) + ","+ (bplus2) + ")");
  $(".c" + which +"-4").css("background","rgb("+ (rplus1) + "," + (gplus1) + ","+ (bplus1) + ")");
  $(".c" + which +"-5").css("background","rgb("+ (r) + "," + (g) + ","+ (b) + ")");
  $(".c" + which +"-6").css("background","rgb("+ (rminus1) + "," + (gminus1) + ","+ (bminus1) + ")");
  $(".c" + which +"-7").css("background","rgb("+ (rminus2) + "," + (gminus2) + ","+ (bminus2) + ")");
  $(".c" + which +"-8").css("background","rgb("+ (rminus3) + "," + (gminus3) + ","+ (bminus3) + ")");
  $(".c" + which +"-1").removeAttr('onclick').attr("onclick","changeColorAndSize(rgbToHex(" + (rplus4) + "," + (gplus4) + "," + (bplus4)+"));");
  $(".c" + which +"-2").removeAttr('onclick').attr("onclick","changeColorAndSize(rgbToHex(" + (rplus3) + "," + (gplus3) + "," + (bplus3)+"));");
  $(".c" + which +"-3").removeAttr('onclick').attr("onclick","changeColorAndSize(rgbToHex(" + (rplus2) + "," + (gplus2) + "," + (bplus2)+"));");
  $(".c" + which +"-4").removeAttr('onclick').attr("onclick","changeColorAndSize(rgbToHex(" + (rplus1) + "," + (gplus1) + "," + (bplus1)+"));");
  $(".c" + which +"-5").removeAttr('onclick').attr("onclick","changeColorAndSize(rgbToHex(" + (r) + "," + (g) + "," + (b)+"));");
  $(".c" + which +"-6").removeAttr('onclick').attr("onclick","changeColorAndSize(rgbToHex(" + (rminus1) + "," + (gminus1) + "," + (bminus1)+"));");
  $(".c" + which +"-7").removeAttr('onclick').attr("onclick","changeColorAndSize(rgbToHex(" + (rminus2) + "," + (gminus2) + "," + (bminus2)+"));");
  $(".c" + which +"-8").removeAttr('onclick').attr("onclick","changeColorAndSize(rgbToHex(" + (rminus3) + "," + (gminus3) + "," + (bminus3)+"));");
  
}
// $("#canvas").click(function(){
//   $("#color1Similar").hide();
//   $("#color2Similar").hide();
//   $("#colormixSimilar").hide();
//   alert("OAO");
// });

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}



 

