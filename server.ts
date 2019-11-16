import * as http from 'http';
import * as dotenv from 'dotenv';
import app from './app';

const PORT = 9000, envConfig = dotenv.config();

http.createServer(app).listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})