import { StatusCodes } from "http-status-codes";

import Product from "../models/product.model.js";

import { v2 as cloudinary } from "cloudinary";

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files?.image1[0];
    const image2 = req.files.image2 && req.files?.image2[0];
    const image3 = req.files.image3 && req.files?.image3[0];
    const image4 = req.files.image4 && req.files?.image4[0];

    const images = [image1, image2, image3, image4].filter((image) => image);

    let imageUrl = await Promise.all(
      images.map(async (image) => {
        const result = await cloudinary.uploader.upload(image.path, {
          use_filename: true,
          folder: "mern-ecommerce",
        }).catch((error) => {
          throw new Error(error.message);
        });
        return result.secure_url;
      })
    );

    const newProduct = new Product({
      name,
      description,
      price,
      image: imageUrl,
      category,
      subCategory,
      sizes,
      bestseller,
    });

    await newProduct.save();

    res
      .status(StatusCodes.CREATED)
      .json({ success: true, message: "Product created successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(StatusCodes.OK).json({ success: true, products });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(StatusCodes.OK).json({ success: true, product });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

export { createProduct, getProducts, getProduct, deleteProduct };
