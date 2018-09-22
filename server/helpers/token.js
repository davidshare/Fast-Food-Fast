import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import config from '../config/config';

dotenv.config();
const { secretKey } = config;

const expirationTime = 86400;

/**
* function to generate token
* @param {Object} userObject
* @returns {Object} generateToken
 */
const generateToken = userObject => jwt.sign({ user: userObject }, secretKey,
  {
    expiresIn: expirationTime,
  });

export default generateToken;
