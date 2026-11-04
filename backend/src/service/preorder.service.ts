import { prisma } from '../db.js';

//=================================== CREATE PREORDER =================================
export const createPreOrder = async (userId: number, address: string) => {
  // Check if user already placed a pre-order (schema has userId @unique)
  const existingPreOrder = await prisma.preOrder.findUnique({
    where: { userId }
  });

  if (existingPreOrder) {
    return { alreadyExists: true, data: null };
  }

  // Create the pre-order (column in schema is named 'adress')
  const newPreOrder = await prisma.preOrder.create({
    data: {
      userId,
      adress: address
    }
  });

  return { alreadyExists: false, data: newPreOrder };
};

//=================================== GET OWN PREORDER =================================
export const getMyPreOrder = async (userId: number) => {
  const preorder = await prisma.preOrder.findUnique({
    where: { userId }
  });
  return preorder;
};

//=================================== ADMIN GET ALL PREORDERS =================================
export const getAllPreOrders = async () => {
  const preorders = await prisma.preOrder.findMany({
    include: {
      User: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });
  return preorders;
};

//=================================== GET PREORDER BY ID =================================
export const findPreOrderById = async (orderId: number) => {
  const preorder = await prisma.preOrder.findUnique({
    where: { orderId }
  });
  return preorder;
};

//=================================== UPDATE PREORDER =================================
export const updatePreOrder = async (orderId: number, address: string) => {
  const updated = await prisma.preOrder.update({
    where: { orderId },
    data: { adress: address }
  });
  return updated;
};

//=================================== DELETE PREORDER =================================
export const deletePreOrder = async (orderId: number) => {
  const deleted = await prisma.preOrder.delete({
    where: { orderId }
  });
  return deleted;
};
