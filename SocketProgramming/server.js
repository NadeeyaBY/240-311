var net = require('net');
var HOST = '127.0.0.1';
var PORT = 6969;
net.createServer((sock) => {
    var guess=6;
    var state=0;
    let num;
    sock.on('data', function (data) {
        console.log('Data from client : '+data);
        if(data=='READY' && state==0){
            sock.write('START GUESS 0-10');
            state=1;
            console.log('Server send data : START GUESS 0-10');
        }else if(data=='BYE'){
            state=0;
            sock.destroy();
        }else{
            if(data=='10' || data>='0' && data<='9'){
                if(state==1){
                    num = parseInt(data);
                    if(num==guess){
                        sock.write('CONGRATULATION');
                        console.log('Server send data : CONGRATULATION');
                    }else if(num>guess){
                        sock.write('LESS THAN THAT');
                        console.log('Server send data : LESS THAN THAT');
                    }else if(num<guess){
                        sock.write('MORE THAN THAT');
                        console.log('Server send data : MORE THAN THAT');
                    }
                }
            }else{
                sock.write('INVALID');
                console.log('Server send data : INVALID');
            }
        }
    });
}).listen(PORT, HOST);
console.log('Server listening on ' + HOST +':'+ PORT);
