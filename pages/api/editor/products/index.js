import nc from 'next-connect';
import { isAuth, isEditor,} from '../../../../utils/auth';
import Product from '../../../../models/Product';
import db from '../../../../utils/db';

const handler = nc();
handler.use(isAuth, isEditor);

handler.get(async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.send(products);
});

handler.post(async (req, res) => {
  await db.connect();
  const newProduct = new Product({
    name: 'Product Name',
    slug: 'slug' + Math.random(),
    image: '/images',
    price: 0,
    category: 'Product Category',
    brand: 'Product Brand',
    countInStock: 0,
    description: 'Product Description',
    rating: 0,
    numReviews: 0,
  });

  const product = await newProduct.save();
  await db.disconnect();
  res.send({ message: 'Product Created', product });
});

export default handler;
