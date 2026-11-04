import { prisma } from '../db.js';
import { z } from 'zod';
import { ProductCategory } from '../../generated/prisma/enums.js';
import { product_partial_validate } from '../validators/product_validator.js';

//=================================== ADMIN CAN ADD PRODUCTS =================================
export const add_product = async (
    name: string,
    price: number,
    description: string,
    stock: number,
    category?: ProductCategory,
    imageUrl?: string
) => {
    const product = await prisma.product.create({
        data: {
            name,
            description,
            price,
            stock,
            ...(category ? { category } : {}),
            ...(imageUrl ? { imageUrl } : {})
        }
    });

    return { message: "Product added successfully!!", data: product };
};

//=================================== FETCH ALL PRODUCTS =================================
export const fetchProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
};

//=================================== FETCH PARTICULAR PRODUCT =================================
export const getProductById = async (id: number) => {
    const product = await prisma.product.findUnique({
        where: { id }
    });

    if (!product) {
        return null;
    }
    return product;
};

//=================================== UPDATE PARTICULAR PRODUCT =================================
export const updateProduct = async (
    id: number,
    data: z.infer<typeof product_partial_validate>
) => {
    const { images, ...rest } = data;
    const finalData = {
        ...rest,
        ...(images && images.length > 0 && !rest.imageUrl ? { imageUrl: images[0] } : {})
    };

    const product = await prisma.product.update({
        where: { id },
        data: finalData
    });
    return product;
};

//=================================== DELETE PARTICULAR PRODUCT =================================
export const deleteProduct = async (id: number) => {
    const product = await prisma.product.delete({
        where: { id }
    });
    return product;
};
