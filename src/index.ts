import 'reflect-metadata';

// src/index.ts
import express from 'express';
import router from './routes/receipt.router';


const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use the receipts router
app.use('/receipts', router);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
