import express, { Request, Response } from 'express';

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    console.log('Request received');
    res.send('Hello World 234213213213!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

