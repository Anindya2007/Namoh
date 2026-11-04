import { prisma } from '../db.js';

//=================================== CREATE FEEDBACK =================================
export const addFeedback = async (
  userId: number,
  productId: number,
  ratings: number,
  review: string
) => {
  // 1. Check if the product exists in the database
  const product = await prisma.product.findUnique({
    where: { id: productId }
  });

  if (!product) {
    return null; // Return null if the product does not exist
  }

  // 2. Insert the feedback into PostgreSQL
  const feedback = await prisma.feedback.create({
    data: {
      userId,
      productId,
      ratings,
      review
    }
  });

  return feedback;
};

//=================================== GET PRODUCT FEEDBACK =================================
export const getProductFeedback = async (productId: number) => {
  // 1. Check if the product exists
  const product = await prisma.product.findUnique({
    where: { id: productId }
  });

  if (!product) {
    return null; // Product does not exist
  }

  // 2. Fetch all feedback for this product with safe user details (no passwordHash)
  const feedbacks = await prisma.feedback.findMany({
    where: { productId },
    include: {
      User: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });

  return feedbacks;
};

//=================================== FIND FEEDBACK BY ID =================================
export const findFeedbackById = async (feedbackId: number) => {
  const feedback = await prisma.feedback.findUnique({
    where: { feedbackId }
  });
  return feedback;
};

//=================================== UPDATE FEEDBACK =================================
export const updateFeedback = async (
  feedbackId: number,
  data: { ratings?: number; review?: string }
) => {
  const updated = await prisma.feedback.update({
    where: { feedbackId },
    data
  });
  return updated;
};

//=================================== DELETE FEEDBACK =================================
export const deleteFeedback = async (feedbackId: number) => {
  const deleted = await prisma.feedback.delete({
    where: { feedbackId }
  });
  return deleted;
};
