import { Router } from 'express';
import commenter from './routes/commenter';
import blogger from './routes/blogger';

export default () => {
	const app = Router();
	commenter(app);
	blogger(app);
	
	return app;
}