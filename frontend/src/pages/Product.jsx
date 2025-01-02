import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelativedProducts from '../components/RelativedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState(null);
  const [size, setSize] = useState(null);

  const fetchProduct = () => {
    const product = products.find((product) => product._id === productId);
    setProductData(product);
    setImage(product?.image[0]);
    console.log(productData);
  };

  useEffect(() => {
    fetchProduct();
  }, [productId, products]);


  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* product image */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((img, index) => (
              <img
                key={index}
                onClick={() => setImage(img)}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                src={img}
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="" className="w-full h-auto" />
          </div>
        </div>
        {/* end product image */}
        {/* product infomation */}
        <div className="flex-1">
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img className='w-3.5' src={assets.star_icon} alt="" />
            <img className='w-3.5' src={assets.star_icon} alt="" />
            <img className='w-3.5' src={assets.star_icon} alt="" />
            <img className='w-3.5' src={assets.star_icon} alt="" />
            <img className='w-3.5' src={assets.star_dull_icon} alt="" />
            <p className="pl-2">(123)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-3/4">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {
                productData.sizes.map((item, index) => (
                  <button onClick={() => setSize(item)} key={index} className={`border bg-gray-100 px-4 py-2 cursor-pointer ${item === size ? 'border-orange-500' : ''}`}>{item}</button>
                ))
              }
            </div>
          </div>
          <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <p>100% original product.</p>
          <p>Cash on delivery is available on this product.</p>
          <p>Easy 7-day return policy.</p>
        </div>
        {/* end product infomation */}
      </div>
      {/* description and review */}
      <div className="mt-20">
        <div className="flex">
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Review (123)</p>
        </div>
        <div className="flex flex-col border gap-4 px-6 py-6 text-sm text-gray-500">
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus, officia ipsa quam praesentium, sapiente corrupti magni iusto error possimus quo quibusdam molestias magnam aliquid quas voluptatem autem aspernatur neque voluptatum.</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos sunt impedit animi unde doloremque labore voluptates odio, facere odit eveniet accusantium qui beatae vitae blanditiis. Mollitia perspiciatis quasi vero quod.</p>
        </div>
      </div>
       {/* related product */}
       <RelativedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (<div className='opacity-0'></div>)
}

export default Product
