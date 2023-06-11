import express from 'express';
import routes from '@routes';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser({ limit: '50mb' }));
routes(app);

// eslint-disable-next-line no-console
app.listen(port, () => console.info(`server run on port ${port}`));
