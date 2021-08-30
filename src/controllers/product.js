import * as productService from '../services/product';

export const createProduct = async (req, res) => {
  try {
    const { user } = res.locals;
    const product = await productService.createProduct({ ...req.body, user });
    res.status(200).json({
      success: true,
      message: 'Product created successfully',
      result: product,
    });
  } catch (error) {
    res.status(error.httpCode || 500).json({ success: false, message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { user } = res.locals;
    const product = await productService.getProducts({ user });
    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully',
      result: product,
    });
  } catch (error) {
    res.status(error.httpCode || 500).json({ success: false, message: error.message });
  }
};
