import express from 'express'
import bodyparser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import config from 'config'
import routes from './routes'

const app = express()
export default app

const corsOptions = {
    origin: '*',
    methods: 'GET, PUT, POST, DELETE, OPTIONS, PATCH',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Api-Token, api-key, cust-token, Source'
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('dev'));


// for parsing application/json
app.use(bodyparser.json({
    limit: '50mb'
}));

// for parsing application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
}));

const port = config.get<number>('port')

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`App is running at ${port}!`);
    routes(app);
})