import mongoose from 'mongoose';

type Status = { connected: Boolean };

const status: Status = {
  connected: false
};

export const getConnectionSate = () => ({ ...status });

export const connect = ():void => {
  console.log(new Date, 'Connecting database');
  console.log('process.env.DBURL',process.env.DBURL)
  mongoose.connect(process.env.DBURL, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
    .then(() => console.log('database connected'))
    .catch((err) => console.error(err));
}
 
export const disconnect = ():void => {
  console.log(new Date(), 'Database disconnect')
  mongoose.disconnect()
}
 
mongoose.connection.on('connected', ():void => {
  status.connected = true
})

mongoose.connection.on('disconnected', ():void => {
  status.connected = false
})