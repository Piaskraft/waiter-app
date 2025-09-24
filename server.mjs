import jsonServer from 'json-server';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'public', 'db', 'app.json'));
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, 'build'), // serwuj zbudowany frontend
});

server.use(middlewares);
server.use(jsonServer.bodyParser);

// API pod /api
server.use('/api', router);

// SPA fallback – dowolny inny URL oddaje index.html
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`✅ Production server running on http://localhost:${PORT}`);
});
