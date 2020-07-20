// create an empty modbus client
var ModbusRTU = require("modbus-serial");
var client = new ModbusRTU();

var networkErrors = ["ESOCKETTIMEDOUT", "ETIMEDOUT", "ECONNRESET", "ECONNREFUSED", "EHOSTUNREACH"];


var inputRegisters = [];
var holdingRegisters = [];

var minInputAddress = 30001;
var maxInputAddress = 30100;

var minHoldingAddress = 40001;
var maxHoldingAddress = 40100;



// open connection to a serial port
//client.connectRTUBuffered("/dev/ttyUSB0", { hupcl: false, dsrdtr: false })
client.connectTCP("127.0.0.1", { port: 8502 })
    .then(setClient)
    .then(function () {

    })
    .catch(function (e) {
        if (e.errno) {
            if (networkErrors.includes(e.errno)) {
                console.log("we have to reconnect");
            }
        }
        console.log(e.message);
    });

function setClient() { 
    client.setID(1); 
 
    setInterval(readInputRegisters, 1 * 1000);
    setInterval(readHoldingRegisters, 1 * 1000); 
}

function readInputRegisters() { 
    for (let index = minInputAddress; index < maxInputAddress; index++) {
        client.readInputRegisters(index, 1)
            .then(function (d) {
                var reg = {
                    addr: index,
                    value: d.data
                };
                saveRegisterData(inputRegisters, reg);
            })
            .catch(function (e) {
                console.log(e.message);
            })
            .then();
    }
}

function readHoldingRegisters() { 
    for (let index = minHoldingAddress; index < maxHoldingAddress; index++) {
        client.readHoldingRegisters(index, 1)
            .then(function (d) {
                var reg = {
                    addr: index,
                    value: d.data
                };
                saveRegisterData(holdingRegisters, reg);
            })
            .catch(function (e) {
                console.log(e.message);
            });
    }
}

function writeRegisters(registerAddr,registerValue) {   
    client.writeRegisters(registerAddr, [registerValue])
        .then(function(d) {
            console.log("write reg", d); })
        .catch(function(e) {
            console.log(e.message); })
        .then();
}

function saveRegisterData(registerArr, reg) {
    var foundIndex = registerArr.findIndex(x => x.addr == reg.addr);
    if (foundIndex > -1) {
        registerArr[foundIndex] = reg;
    } else {
        registerArr.push(reg);
    }
}

function close() {
    client.close();
}

module.exports.writeRegisters = writeRegisters;
module.exports.holdingRegisters = holdingRegisters;
module.exports.inputRegisters = inputRegisters;