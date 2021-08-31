import dotenv from 'dotenv';
import ProductModel from '../database/product';
import { log } from '../utils/logger';
import { InternalServerError } from '../utils/errors';

dotenv.config();

export const createProduct = async (payload) => {
  const { name, description, amount, address, location, geo, images, user } = payload;
  try {
    log.info('Creating a new product');
    const product = await new ProductModel({
      name,
      description,
      amount,
      address,
      location,
      geo,
      images,
      userId: user._id,
    }).save();
    return product;
  } catch (error) {
    log.info(`An error occured. error: ${error}`);
    throw new InternalServerError('Unable to create product. Try again later');
  }
};

export const getProducts = async (payload) => {
  const { user } = payload;
  const cord = user.location.loc.coordinates;
  const products = ProductModel.aggregate([
    {
      $geoNear: {
        near: { type: 'Point', coordinates: cord },
        key: 'geo',
        distanceField: 'dist.calculated',
        spherical: true,
      },
    },
    { $limit: 10 },
  ]);

  return products;
};
