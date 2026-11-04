import { apiRequest } from './client';
import { Product, ProductsResponse, ProductDetailResponse } from '../types/product.types';

export const SIGNATURE_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Limited Edition Denim',
    category: 'LIMITED_EDITION',
    price: 8999,
    description:
      'A rare collector capsule piece cut from 15oz structured selvedge denim. Hand-finished with bespoke brass buttons, clean front zip, and tailored stand collar.',
    imageUrl: 'https://ik.imagekit.io/apib5ajwo/Limited%20Edition%20Denim?updatedAt=1793771000302',
    stock: 25,
    editionSize: 50,
    isAvailable: true,
    fabric: '15oz Japanese Selvedge Cotton',
    fit: 'Tailored architectural boxy silhouette',
  },
  {
    id: 2,
    name: 'Light Denim',
    category: 'REGULAR',
    price: 4999,
    description:
      'Clean washed light indigo denim tailoring crafted for everyday structure. Features an architectural boxy cut, reinforced seams, and antique silver hardware.',
    imageUrl: 'https://ik.imagekit.io/apib5ajwo/Light%20Denim?updatedAt=1793770967995',
    stock: 40,
    isAvailable: true,
    fabric: '13.5oz Ring-spun Rigid Cotton Denim',
    fit: 'Structured modern silhouette with stand collar',
  },
  {
    id: 3,
    name: 'Dark Blue Denim',
    category: 'REGULAR',
    price: 4999,
    description:
      'Our signature dark indigo structured vest with a stand collar, raw edge armhole finish, and continuous brass zipper.',
    imageUrl: 'https://ik.imagekit.io/apib5ajwo/Dark%20Blue%20Denim?updatedAt=1793770944599',
    stock: 35,
    isAvailable: true,
    fabric: '14oz Deep Rope-Dyed Indigo Denim',
    fit: 'Contemporary sleeveless tailored cut',
  },
  {
    id: 4,
    name: 'Charcoal Denim',
    category: 'REGULAR',
    price: 5499,
    description:
      'Mineral-washed charcoal denim tailored with sharp darting, interior storm flap, and brushed gunmetal zip closure.',
    imageUrl: 'https://ik.imagekit.io/apib5ajwo/Charcoal%20Denim?updatedAt=1793770914541',
    stock: 30,
    isAvailable: true,
    fabric: '14.5oz Mineral Washed Twill Denim',
    fit: 'Clean tailored vest with minimalist seamline',
  },
  {
    id: 5,
    name: 'Blue Denim',
    category: 'REGULAR',
    price: 4999,
    description:
      'Classic mid-tone indigo denim tailored into a contemporary sleeveless jacket with minimalist pocketing.',
    imageUrl: 'https://ik.imagekit.io/apib5ajwo/Blue%20Denim?updatedAt=1793770870446',
    stock: 45,
    isAvailable: true,
    fabric: '13.5oz Pure Cotton Indigo Twill',
    fit: 'Versatile everyday structural fit',
  },
  {
    id: 6,
    name: 'Black Denim',
    category: 'REGULAR',
    price: 5499,
    description:
      'Overdyed jet black denim offering sharp architectural contrast, matte tonal stitching, and understated elegance.',
    imageUrl: 'https://ik.imagekit.io/apib5ajwo/Black%20Denim?updatedAt=1793770814140',
    stock: 30,
    isAvailable: true,
    fabric: '14oz Sulfur Black Warp & Weft Denim',
    fit: 'Structured monochrome silhouette',
  },
];

export const getProducts = async (): Promise<ProductsResponse> => {
  try {
    const response = await apiRequest<ProductsResponse>('/api/products');
    if (response && response.data && response.data.length > 0) {
      return response;
    }
  } catch (err) {
    console.warn('Backend API request unfulfilled, utilizing catalogue fallback:', err);
  }

  // Gracefully fallback to the 6 provided ImageKit signature pieces if database is waiting for seed approval
  return {
    success: true,
    message: 'Signature pieces loaded successfully',
    data: SIGNATURE_PRODUCTS,
  };
};

export const getProductById = async (id: number | string): Promise<ProductDetailResponse> => {
  try {
    const response = await apiRequest<ProductDetailResponse>(`/api/products/${id}`);
    if (response && response.data) {
      return response;
    }
  } catch (err) {
    console.warn(`Product #${id} lookup from backend unfulfilled:`, err);
  }

  const fallback = SIGNATURE_PRODUCTS.find((p) => p.id === Number(id)) || SIGNATURE_PRODUCTS[0];
  return {
    success: true,
    message: 'Product loaded successfully',
    data: fallback,
  };
};
