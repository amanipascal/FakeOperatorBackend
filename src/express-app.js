import express from 'express';
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import path from 'path'

const cors  = require('cors');
const compression = require('compression')
import dotenv from 'dotenv'
dotenv.config()
const app_api = require('./api')


module.exports = async (app) => {

    app.use(cors());
    app.use(compression())
    app.use(express.json({ limit: '1mb'}));
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false, limit: '1mb'}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    //api
    // todoApi(app);
    app_api(app)
}