import userModel from "../models/users_model";
import { Request, Response } from "express";

const getAllUsers = async (req: Request, res: Response) => {
  try {
      const users = await userModel.find();
      res.send(users);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const user = await userModel.findById(userId);
    if (user != null) {
      res.send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const createUser = async (req: Request, res: Response) => {
  const userDetails = req.body;
  try {
    const user = await userModel.create(userDetails);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const user = await userModel.findByIdAndDelete(userId);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const userDetails = req.body;
    try {
      const user = await userModel.findByIdAndUpdate(userId, userDetails);
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  };

export default {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById
};