/**
 * @module authRoutes
 * @desc Defines authentication-related API routes.
 *       Handles user login operations.
 *
 * @requires express
 * @requires ../controllers/authController
 *
 * @author Ponnarasi
 * @date 2026-04-10
 */
/**
 * @constant router
 * @type {import('express').Router}
 * @desc Express router instance for auth routes
 */
/**
 * @route POST /login
 * @desc Authenticate user and return token
 * @access Public
 */

const express = require("express");
const router = express.Router();//creates router instance

const { login } = require("../controllers/authController");

router.post("/login", login);

module.exports = router;