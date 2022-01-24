var net = require('net');
var HOST = '127.0.0.1';
var PORT = 6969;
var client = new net.Socket();
client.connect(PORT, HOST, function() {
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    client.write('READY');
    console.log('Client send data : READY');
});
client.on('data', function(data) {
    console.log('Data from server : '+data);
    if(data=='START GUESS 0-10'){
        client.write('10');
        console.log('Client send data : 10');
    }else if(data=='LESS THAN THAT'){
        client.write('4');
        console.log('Client send data : 4');
    }else if(data=='MORE THAN THAT'){
        client.write('AB');
        console.log('Client send data : AB');
    }else if(data=='INVALID'){
        client.write('6');
        console.log('Client send data : 6');
    }else if(data=='CONGRATULATION'){
        client.write('BYE');
        console.log('Client send data : BYE');
        client.destroy();
    }
});
