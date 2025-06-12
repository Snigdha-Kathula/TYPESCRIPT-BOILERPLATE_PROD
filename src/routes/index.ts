import { Request, Response, Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger.json';
import { StudentController } from 'controllers/studentController';
require('express-group-routes');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const routes = (app: any): void => {

    // Service health check: allows you to check if your application is online and responding without checking any kind of integration
    app.get('/', (req: Request, res: Response) => {
        res.send({
            name: "Anchor Domain Service",
            version: "0.1",
            uptime: process.uptime(),
            message: 'Ok',
            date: new Date(),
            integrations: []
        }).status(200);
    });

    app.get('/app-health/anchorservice/livez', (req: Request, res: Response) => {
        res.send().status(200);
    });

    app.get('/app-health/anchorservice/readyz', (req: Request, res: Response) => {
        res.send().status(200);
    });

    // swagger doc
    app.use('/document', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // v1 route group
    app.group("/v1", (router: Router) => {
        // TODO define v1 route group
        const controller = new StudentController();
        // router.post("/createStudent", controller.create);
        router.get("/student/:id", controller.getStudentByID);
        
    });


}

export default routes