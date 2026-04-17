import express from 'express';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import mediaRoutes from './routes/mediaRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import loanRoutes from './routes/loanRoutes.js';
import subRoutes from './routes/subscriptionRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
if(process.env.NODE_ENV !== 'test') app.use(morgan('tiny'));

let specs ;
try {
  specs = yaml.load(fs.readFileSync('./docs/openapi.yaml', 'utf8'))
} catch(error) {
  console.log('Failed to load openapi specification', error);
  process.exit(1);
}

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use('/api/media', mediaRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/subscriptions', subRoutes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  if(!err.status) {
    err.status = 500;
    err.message ='Internal server error';
  }
  res.status(err.status).json({ error: err.message });
});

if(process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

export default app;