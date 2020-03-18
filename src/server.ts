import app from './app';

const port = app.get('port');
const environtment = app.get('env');

// Start the server
app.listen(port, () => {
    // tslint:disable-next-line: no-console
    console.log(`Server running at http://localhost:${port} in ${environtment} mode`);
    // tslint:disable-next-line: no-console
    console.log(`API Docs at: http://localhost:${port}/api-docs\n`);
});
