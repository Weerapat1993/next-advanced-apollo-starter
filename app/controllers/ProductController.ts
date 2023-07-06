import type { Request, Response, NextFunction } from 'express';
import Product from '@models/Product'
import { getFailure, getSuccess } from '../utils/response-event';

const getProducts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const query = Product.find({}).limit(10)
    const productData = await query.exec()
    return getSuccess(res)(200, productData)
  } catch (error) {
    return getFailure(res)(500, error)
  }
}

const getProductBySku = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { sku } = req.params
    const query = Product.findOne({ sku })
    const productData = await query.exec()
    return getSuccess(res)(200, productData)
  } catch (error) {
    return getFailure(res)(500, error)
  }
}

const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { sku, name, description, price } = req.body
    const product = new Product({
      sku,
      name,
      description,
      price,
    })
    const productData = await product.save()
    return getSuccess(res)(201, productData)

  } catch (error) {
    return getFailure(res)(500, error)
  }
}

const updateProductBySku = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { sku, name, description, price } = req.body
    const update = {
      name, 
      description, 
      price,
    }
    const productNewUpdate = await Product.findOneAndUpdate({ sku }, update, { new: true })
    return getSuccess(res)(200, productNewUpdate)
  } catch (error) {
    return getFailure(res)(500, error)
  }
}

const deleteProductBySku = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { sku } = req.params
    const productDelete = await Product.deleteOne({ sku })
    return getSuccess(res)(200, productDelete)
  } catch (error) {
    return getFailure(res)(500, error)
  }
}


const ProductController = {
  getProducts,
  createProduct,
  getProductBySku,
  updateProductBySku,
  deleteProductBySku,
}

export default ProductController