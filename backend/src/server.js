/**
 * @module server
 * @desc Entry point of the application.
 *       Starts the Express server and listens on the specified port.
 *
 * @requires ./app
 *
 * @author Ponnarasi
 * @date 2026-04-10
 */

/**
 * @constant PORT
 * @type {number|string}
 * @desc Port number on which the server runs (default: 5000)
 */

/**
 * @function startServer
 * @desc Starts the Express server and listens for incoming requests
 */
const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});