"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config"); // load DB credentials from config
const mysql2_1 = require("mysql2");
const charset = 'utf8'; // use UTF-8 encoding for connections
// build pool config object
const config = { host: config_1.DATABASE_HOST, user: config_1.DATABASE_USER, password: config_1.DATABASE_PASSWORD, database: config_1.DATABASE_NAME, charset };
const pool = (0, mysql2_1.createPool)(config).promise(); // create a promise-based MySQL pool
exports.default = pool; // export pool for querying elsewhere
