"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = exports.connect = exports.getConnectionSate = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const status = {
    connected: false
};
exports.getConnectionSate = () => (Object.assign({}, status));
exports.connect = () => {
    console.log(new Date, 'Connecting database');
    console.log('process.env.DBURL', process.env.DBURL);
    mongoose_1.default.connect(process.env.DBURL, {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
        .then(() => console.log('database connected'))
        .catch((err) => console.error(err));
};
exports.disconnect = () => {
    console.log(new Date(), 'Database disconnect');
    mongoose_1.default.disconnect();
};
mongoose_1.default.connection.on('connected', () => {
    status.connected = true;
});
mongoose_1.default.connection.on('disconnected', () => {
    status.connected = false;
});
