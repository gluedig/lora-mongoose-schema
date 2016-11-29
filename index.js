var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird');
mongoose.Promise = Promise;

var metadataSchema = new Schema({
    gateway:  {type: Schema.Types.ObjectId, ref: "LoraGateway"},
    gateway_eui: String,
    frequency: Number,
    datarate: String,
    codingrate: String,
    gateway_timestamp: Number,
    channel: Number,
    server_time: Date,
    rssi: Number,
    lsnr: Number,
    rfchain: Number,
    crc: Number,
    modulation: String,
    altitude: Number,
    latitude: Number,
    longitude: Number
});

var messageSchema = new Schema ({
    payload: String,
    port: Number,
    counter: Number,
    dev_eui: String,
    metadata: [metadataSchema]
});

var gatewaySchema = new Schema ({
    gateway_eui: String,
    last_message: Date,
    number_of_messages: Number,
    altitude: Number,
    latitude: Number,
    longitude: Number
});

var messageLogSchema = new Schema({
    message: messageSchema
}, {capped: { size: 10240, max: 10, autoIndexId: true}});

module.exports.Message = messageSchema;
module.exports.MessageLog = messageLogSchema;
module.exports.Gateway = gatewaySchema;
