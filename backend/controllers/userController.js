import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import generateToken from "../utils/generateToken.js";
import xlsx from "xlsx";
import path from "path";
// @desc    Auth user and get a Toen
// @route   POST /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existsUser = await User.findOne({ email });
  if (existsUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not created");
  }
});

// @desc    update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    delete a user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById({ _id: userId });
  if (user) {
    const deletedUser = await user.remove();
    if (deletedUser) {
      res.json({ message: "User removed successfully" });
    } else {
      res.status(404);
      throw new Error("User not removed");
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    get user
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    update user
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get Order List
// @route   GET /api/userorders/
// @access  Private/Admin
export const getUserOrderList = asyncHandler(async (req, res, next) => {
  await Order.find({})
    .populate("user", "name email")
    .exec()
    .then((products, err) => {
      if (err) {
        res.json({ err: "No product found" });
        return true;
      }

      let data = [];
      products.forEach((product) => {
        if (product.user)
          data.push({
            userName: product.user.name,
            orderItem: product.orderItems[0].name,
            id: product._id,
          });
      });

      const workSheetColumnName = ["ID", "Product Name", "User Name"];
      const workSheetName = "Product User";
      const filePath = "./outputFiles/excel-from-js.xlsx";

      exportProductsToExcel(
        data,
        workSheetColumnName,
        workSheetName,
        filePath,
        res
      );
    })
    .catch((err) => {
      res.json({ err: "No product found" });
      next(err);
    });
});

const exportExcel = async (
  data,
  workSheetColumnNames,
  workSheetName,
  filePath,
  res
) => {
  const workBook = xlsx.utils.book_new();
  const workSheetData = [workSheetColumnNames, ...data];
  const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
  let cell = workSheet["B2"].v;
  cell.font;
  xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
  await xlsx.writeFile(workBook, path.resolve(filePath));
  res.download(filePath);
};

export const exportProductsToExcel = (
  products,
  workSheetColumnNames,
  workSheetName,
  filePath,
  res
) => {
  const data = products.map((product) => {
    return [product.id, product.userName, product.orderItem];
  });
  exportExcel(data, workSheetColumnNames, workSheetName, filePath, res);
};
