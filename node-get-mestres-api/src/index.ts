import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import {Request, Response} from "express";
import {Routes} from "./routes";
import config from "./config/config";
import auth from './middleware/auth';

// create express app
const app = express();

/**
 * converte para json
 */
app.use(bodyParser.json({limit: '50mb'}));
/**
 * habilita cors
 */
app.use(cors());
/**
 * habilita autenticação
 */
app.use(auth);


// register express routes from defined application routes
Routes.forEach(route => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = (new (route.controller as any))[route.action](req, res, next);
        if (result instanceof Promise) {
            // result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);
            result.then((d) => {
                if (d && d.status) {
                    res.status(d.status).send(d.message || d.errors);
                } else if (d && d.file) {
                    res.sendFile(d.file);
                } else {
                    res.json(d);
                }
            })
        } else if (result !== null && result !== undefined) {
            res.json(result);
        }
    });
});

app.listen(config.port, '0.0.0.0', async () => {
    console.log(`Api initialize in port ${config.port}`);
    try {
        await createConnection();
        console.log('Database connected');
    } catch (error) {
        console.error('Database not connected', error);
    }
});
