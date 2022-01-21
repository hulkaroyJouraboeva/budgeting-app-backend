const app = require('./app.js');
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT;
// listening
app.listen(PORT, () => {
    console.log(`I am running on port ${PORT}`);
})