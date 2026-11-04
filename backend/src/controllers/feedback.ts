import { Request, Response } from 'express';
import { feedback_validator, feedback_update_validator } from '../validators/feedback_Validator.js';
import {
  addFeedback,
  getProductFeedback,
  findFeedbackById,
  updateFeedback,
  deleteFeedback
} from '../service/feedback.js';

//=================================== CREATE FEEDBACK =================================
export const create_feedback = async (req: Request, res: Response) => {
  try {
    // 1. Get authenticated user ID from req.auth (set by verify_login)
    const userId = req.auth?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User is not authenticated!!"
      });
    }

    // 2. Validate request body
    const check = feedback_validator.safeParse(req.body);

    if (!check.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid input data provided!!",
        errors: check.error.format()
      });
    }

    const { productId, ratings, review } = check.data;

    // 3. Call service to add feedback
    const feedback = await addFeedback(userId, productId, ratings, review);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Product not found!!"
      });
    }

    // 4. Return success 201 Created
    return res.status(201).json({
      success: true,
      message: "Feedback submitted successfully!!",
      data: feedback
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

//=================================== GET PRODUCT FEEDBACK =================================
export const get_product_feedback = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.productId);

    if (isNaN(productId) || productId <= 0 || !Number.isInteger(productId)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid product ID!!"
      });
    }

    const feedbacks = await getProductFeedback(productId);

    if (feedbacks === null) {
      return res.status(404).json({
        success: false,
        message: "Product not found!!"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Feedback fetched successfully!!",
      data: feedbacks
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

//=================================== UPDATE FEEDBACK =================================
export const update_feedback = async (req: Request, res: Response) => {
  try {
    // 1. Get authenticated user ID
    const userId = req.auth?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User is not authenticated!!"
      });
    }

    // 2. Validate feedbackId from params
    const feedbackId = Number(req.params.feedbackId);

    if (isNaN(feedbackId) || feedbackId <= 0 || !Number.isInteger(feedbackId)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid feedback ID!!"
      });
    }

    // 3. Validate request body
    const check = feedback_update_validator.safeParse(req.body);

    if (!check.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid input data provided!!",
        errors: check.error.format()
      });
    }

    if (check.data.ratings === undefined && check.data.review === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please provide ratings or review to update!!"
      });
    }

    // 4. Find feedback to verify existence
    const existingFeedback = await findFeedbackById(feedbackId);

    if (!existingFeedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found!!"
      });
    }

    // 5. Ownership check: Only owner can update
    if (existingFeedback.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this feedback!!"
      });
    }

    // 6. Update feedback
    const updatedFeedback = await updateFeedback(feedbackId, check.data);

    return res.status(200).json({
      success: true,
      message: "Feedback updated successfully!!",
      data: updatedFeedback
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

//=================================== DELETE FEEDBACK =================================
export const delete_feedback = async (req: Request, res: Response) => {
  try {
    // 1. Get authenticated user ID
    const userId = req.auth?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User is not authenticated!!"
      });
    }

    // 2. Validate feedbackId from params
    const feedbackId = Number(req.params.feedbackId);

    if (isNaN(feedbackId) || feedbackId <= 0 || !Number.isInteger(feedbackId)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid feedback ID!!"
      });
    }

    // 3. Find feedback to verify existence
    const existingFeedback = await findFeedbackById(feedbackId);

    if (!existingFeedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found!!"
      });
    }

    // 4. Ownership check: Only owner can delete
    if (existingFeedback.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this feedback!!"
      });
    }

    // 5. Delete feedback
    await deleteFeedback(feedbackId);

    return res.status(200).json({
      success: true,
      message: "Feedback deleted successfully!!"
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
