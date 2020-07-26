import mongoose from 'mongoose';
import config from '../config';

export default async (): Promise<any> => {
	const connection = await mongoose.connect(config.databaseURL, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});
	return connection.connection.db;
}