const app = require('./index');
const config = require('../config');

// eslint-disable-next-line no-console
app.listen(config.port, () => console.log(`Server is started on port ${config.port}`));
