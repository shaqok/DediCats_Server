/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import cors from "cors";
import jwt from "jsonwebtoken";
import BasicRouter from "./route/BasicRouter";
import catRouter from "./route/Cat";
import commentRouter from "./route/Comment";
import mapRouter from "./route/Map";
import photoRouter from "./route/Photo";
import postRouter from "./route/Post";
import reportRouter from "./route/Report";
import userRouter from "./route/User";

require("dotenv").config();

// eslint-disable-next-line consistent-return
function authenticateToken(req:Request, res:Response, next:NextFunction) {
    const authHeader = req.headers.authorization;
    const accesskey:any = process.env.JWT_SECRET_ACCESS;
    const token:any = authHeader && authHeader.split(" ")[1];
    if (token === null) return res.sendStatus(401);

    jwt.verify(token, accesskey, (err:Error, user:any) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

const api: express.Application = express();
api.use(cors());
api.use(authenticateToken);
api.use(cookieParser());

api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());
api.use(authenticateToken);

api.use("/user", userRouter);
api.use("/cat", catRouter);
api.use("/comment", commentRouter);
api.use("/map", mapRouter);
api.use("/photo", photoRouter);
api.use("/post", postRouter);
api.use("/report", reportRouter);
api.use("/", BasicRouter);

api.use((req:Request, res:Response) => {
    res.status(404).send("Invalid address.Please check the address again");
});

api.use((err:Error, req:Request, res:Response, next:NextFunction) => {
    // eslint-disable-next-line no-console
    console.error(err.stack);
    res.status(500).send("There's an error.");
});

export default api;
