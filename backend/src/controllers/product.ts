import { Request, Response } from 'express';
import { product_validate, product_partial_validate } from "../validators/product_validator.js";
import { add_product, fetchProducts, getProductById, updateProduct, deleteProduct } from "../service/product.js";

//=================================== ADD PRODUCTS =================================
export const listProduct = async (req: Request, res: Response) => {
    try {
        const check = product_validate.safeParse(req.body);

        if (!check.success) {
            return res.status(400).json({
                success: false,
                message: "Please provide proper details!!",
                errors: check.error.format()
            });
        }

        const { name, price, description, stock, category, imageUrl, images } = check.data;
        const finalImageUrl = imageUrl || (images && images.length > 0 ? images[0] : undefined);

        const list_product = await add_product(name, price, description, stock, category, finalImageUrl);

        return res.status(201).json({
            success: true,
            message: "Product added successfully!!",
            data: list_product.data
        });
    } catch (err) {
        if (err instanceof Error) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }

        return res.status(500).json({
            success: false,
            message: "Something went wrong!"
        });
    }
};

//=================================== FETCH ALL PRODUCTS =================================
export const allProduct = async (req: Request, res: Response) => {
    try {
        const products = await fetchProducts();

        if (products.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No products available we are out of stock!!",
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            message: "All products fetched successfully",
            data: products
        });
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        return res.status(500).json({
            success: false,
            message: "Something went wrong!"
        });
    }
};

//=================================== FETCH PRODUCT BY ID =================================
export const productById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id) || id <= 0 || !Number.isInteger(id)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid id!!"
            });
        }

        const product = await getProductById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "This product doesn't exist anymore!!"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
            data: product
        });
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        return res.status(500).json({
            success: false,
            message: "Something went wrong!"
        });
    }
};

//=================================== UPDATE PRODUCT BY ID =================================
export const updateProductById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id) || id <= 0 || !Number.isInteger(id)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid id!!"
            });
        }

        const validate_data = product_partial_validate.safeParse(req.body);
        if (!validate_data.success) {
            return res.status(400).json({
                success: false,
                message: "Incorrect data provided!!",
                errors: validate_data.error.format()
            });
        }

        if (Object.keys(validate_data.data).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide at least one field to update!"
            });
        }

        // Verify product exists before updating
        const existingProduct = await getProductById(id);
        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found!!"
            });
        }

        const updatedProduct = await updateProduct(id, validate_data.data);

        return res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: updatedProduct
        });
    } catch (err: any) {
        if (err?.code === 'P2025') {
            return res.status(404).json({
                success: false,
                message: "Product not found!!"
            });
        }

        if (err instanceof Error) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        return res.status(500).json({
            success: false,
            message: "Something went wrong!"
        });
    }
};

//=================================== DELETE PRODUCT BY ID =================================
export const deleteProductById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id) || id <= 0 || !Number.isInteger(id)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid id!!"
            });
        }

        // Verify product exists before deleting
        const existingProduct = await getProductById(id);
        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found!!"
            });
        }

        const delete_product = await deleteProduct(id);

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully!!",
            data: delete_product
        });
    } catch (err: any) {
        if (err?.code === 'P2025') {
            return res.status(404).json({
                success: false,
                message: "Product not found!!"
            });
        }

        if (err instanceof Error) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        return res.status(500).json({
            success: false,
            message: "Something went wrong!"
        });
    }
};
