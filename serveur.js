const { app, server } = require('./application');
const port = 3001;

server.listen(port, () => {
    console.log(`Server is running on: http://localhost:${port}/form`);
});
