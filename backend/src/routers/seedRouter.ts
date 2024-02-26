import { Request, Response, Router } from 'express'; // Importa los tipos correctos de Request y Response
import { ProductModel } from '../models/productModel';
import asyncHandler from 'express-async-handler';
import { sampleProducts, sampleUsers } from '../data';
import { UserModel } from '../models/userModel';

export const seedRouter = Router(); // Utiliza Router en lugar de express.Router()

seedRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    await ProductModel.deleteMany({});
    const createdProducts = await ProductModel.insertMany(sampleProducts);
    
    await UserModel.deleteMany({});
    const createdUsers = await UserModel.insertMany(sampleUsers);
    
    res.json({ createdProducts, createdUsers });
  })
);