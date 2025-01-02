import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelativedProducts = ({ category, subCategory}) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productCopy = [...products];

      productCopy = productCopy.filter((product) => product.category === category);
      productCopy = productCopy.filter((product) => product.subCategory === subCategory);

      setRelated(productCopy.slice(0,5));
    }
  }, [products]);
  return (
    <div className='my-24'>
      <div className="text-center text-3xl py-2">
        <Title text1='RELATED' text2='PRODUCTS' />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        { related.map(product => <ProductItem key={product._id} {...product} />) }
      </div>
    </div>
  )
}

export default RelativedProducts
