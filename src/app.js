import 'dotenv/config';
import express from 'express';
import sequelize from './models/index.js';
import chargeRoutes from './routes/chargeRoutes.js';

const app = express();

app.use(express.json());
app.use('/api', chargeRoutes);

const port = process.env.PORT

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});