import { Request, Response } from 'express';
import { UserRole } from '../../generated/prisma/enums.js';
import { preorder_validator, update_preorder_validator } from '../validators/preorder.validator.js';
import {
  createPreOrder,
  getMyPreOrder,
  getAllPreOrders,
  findPreOrderById,
  updatePreOrder,
  deletePreOrder
} from '../service/preorder.service.js';

//=================================== 1. CREATE PREORDER =================================
export const create_preorder = async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User is not authenticated!!"
      });
    }

    const check = preorder_validator.safeParse(req.body);

    if (!check.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid input data provided!!",
        errors: check.error.format()
      });
    }

    const { address } = check.data;

    const result = await createPreOrder(userId, address);

    if (result.alreadyExists) {
      return res.status(400).json({
        success: false,
        message: "You have already placed a pre-order!!"
      });
    }

    return res.status(201).json({
      success: true,
      message: "Pre-order placed successfully!!",
      data: result.data
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

//=================================== 2. FETCH OWN PREORDER =================================
export const get_my_preorders = async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User is not authenticated!!"
      });
    }

    const preorder = await getMyPreOrder(userId);

    return res.status(200).json({
      success: true,
      message: preorder ? "Pre-order fetched successfully!!" : "No pre-order found for this user",
      data: preorder
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

//=================================== 3. ADMIN FETCH ALL PREORDERS =================================
export const get_all_preorders = async (_req: Request, res: Response) => {
  try {
    const preorders = await getAllPreOrders();

    return res.status(200).json({
      success: true,
      message: "All pre-orders fetched successfully!!",
      data: preorders
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

//=================================== 4. FETCH PREORDER BY ID =================================
export const get_preorder_by_id = async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.id;
    const role = req.auth?.role;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User is not authenticated!!"
      });
    }

    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0 || !Number.isInteger(id)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid pre-order ID!!"
      });
    }

    const preorder = await findPreOrderById(id);

    if (!preorder) {
      return res.status(404).json({
        success: false,
        message: "Pre-order not found!!"
      });
    }

    // Authorization: Owner or ADMIN
    if (preorder.userId !== userId && role !== UserRole.ADMIN) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this pre-order!!"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Pre-order fetched successfully!!",
      data: preorder
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

//=================================== 5. UPDATE PREORDER BY ID =================================
export const update_preorder_by_id = async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.id;
    const role = req.auth?.role;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User is not authenticated!!"
      });
    }

    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0 || !Number.isInteger(id)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid pre-order ID!!"
      });
    }

    const check = update_preorder_validator.safeParse(req.body);
    if (!check.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid input data provided!!",
        errors: check.error.format()
      });
    }

    const preorder = await findPreOrderById(id);

    if (!preorder) {
      return res.status(404).json({
        success: false,
        message: "Pre-order not found!!"
      });
    }

    // Authorization: Owner or ADMIN
    if (preorder.userId !== userId && role !== UserRole.ADMIN) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this pre-order!!"
      });
    }

    const updated = await updatePreOrder(id, check.data.address);

    return res.status(200).json({
      success: true,
      message: "Pre-order updated successfully!!",
      data: updated
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

//=================================== 6. DELETE PREORDER BY ID =================================
export const delete_preorder_by_id = async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.id;
    const role = req.auth?.role;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User is not authenticated!!"
      });
    }

    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0 || !Number.isInteger(id)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid pre-order ID!!"
      });
    }

    const preorder = await findPreOrderById(id);

    if (!preorder) {
      return res.status(404).json({
        success: false,
        message: "Pre-order not found!!"
      });
    }

    // Authorization: Owner or ADMIN
    if (preorder.userId !== userId && role !== UserRole.ADMIN) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this pre-order!!"
      });
    }

    await deletePreOrder(id);

    return res.status(200).json({
      success: true,
      message: "Pre-order deleted successfully!!"
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
