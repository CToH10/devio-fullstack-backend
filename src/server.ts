import { app } from './app';

// eslint-disable-next-line radix
const port: number = parseInt(process.env.PORT!) || 3001;

const message: string = `Server running on http://localhost:${port}`;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(message);
});
