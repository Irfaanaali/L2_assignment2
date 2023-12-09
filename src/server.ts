import app from './app';
import config from './config';

import mongoose from 'mongoose';
console.log(config.port)
async function server() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('connet to mongodb');
    app.listen(config.port, () => {
      console.log(`Runing on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
server().catch((err) => console.log(err));


