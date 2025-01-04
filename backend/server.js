import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';

import userRoutes from './routes/user.route.js';
import productRoutes from './routes/product.route.js';
import cartRoutes from './routes/cart.route.js';
import orderRoutes from './routes/order.route.js';


const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// api routes

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});


// listen
app.listen(port, () => {
  connectDB();
  connectCloudinary();
  console.log(`Server is running on http://localhost:${port}`);
});

