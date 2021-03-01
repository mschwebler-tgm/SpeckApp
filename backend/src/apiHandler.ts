import {RegisterRoutes} from "./domain/calendar/generated-routes/routes";
import * as bodyParser from 'body-parser';
import {
    Response as ExResponse,
    Request as ExRequest,
    NextFunction,
} from 'express';
import {ValidateError} from 'tsoa';
const express = require( "express");
const sls = require('serverless-http');
const app = express(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Register tsoa routes to express
RegisterRoutes(app)

// Error handler function
app.use(function errorHandler(
    err: unknown,
    req: ExRequest,
    res: ExResponse,
    next: NextFunction
): ExResponse | void {
    console.error(err);
    if (err instanceof ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        return res.status(422).json({
            message: "Validation Failed",
            details: err?.fields,
        });
    }
    if (err instanceof Error) {
        const errorBody: {} = {
            message: "Internal Server Error",
            cause: err.message,
            name: err.name,
        };
        return res.status(500).json(errorBody);
    }
    next();
});

module.exports.handler = sls(app);
