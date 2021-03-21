import * as bodyParser from 'body-parser';
import {
    Response as ExResponse,
    Request as ExRequest,
    NextFunction,
} from 'express';
import { ValidateError } from 'tsoa';
import { RegisterRoutes } from '@calendar/generated-routes/routes';
import DomainError from '@shared/errors/DomainError';

const express = require('express');
const sls = require('serverless-http');

const app = express(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Register tsoa routes to express
RegisterRoutes(app);

// Error handler function
app.use((
    err: unknown,
    req: ExRequest,
    res: ExResponse,
    next: NextFunction,
    // eslint-disable-next-line consistent-return
): ExResponse | void => {
    console.error(err);
    if (err instanceof ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        return res.status(422).json({
            message: 'Validation Failed',
            details: err?.fields,
        });
    }
    if (err instanceof DomainError) {
        const errorBody: {} = {
            message: 'Error',
            cause: err.message,
            name: err.name,
        };
        return res.status(err.httpStatus).json(errorBody);
    }
    if (err instanceof Error) {
        const errorBody: {} = {
            message: 'Internal Server Error',
            cause: err.message,
            name: err.name,
        };
        return res.status(500).json(errorBody);
    }
    next();
});

module.exports.handler = sls(app);
