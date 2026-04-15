/**
 * @module server
 * @desc Entry point of the application
 *
 * @author Ponnarasi
 * @date 2026-04-10
 */
import app from './app.js';
import { SYSTEM_CONSTANTS } from './constants/systemConstant.js';

/**
 * @constant PORT
 * @desc Port on which server runs
 * @type {number|string}
 *
 * @default 5000
 *
 * @author Ponnarasi
 * @date 2026-04-10
 */
const PORT = process.env.PORT || SYSTEM_CONSTANTS.PORT;

/**
 * @function startServer
 * @desc Starts Express server and listens for incoming requests
 * @access Application Startup
 *
 * @returns {void}
 *
 * @author Ponnarasi
 * @date 2026-04-10
 */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});