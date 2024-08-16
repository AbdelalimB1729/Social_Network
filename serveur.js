const { app, server } = require('./application');
const port = 3000;

server.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on: http://0.0.0.0:${port}/form`);
});
