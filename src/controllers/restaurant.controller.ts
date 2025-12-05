import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const { name, description, isOpen } = req.body;

    if (!name) {
      return res.status(400).json({ message: "name is required" });
    }

    const restaurant = await prisma.restaurant.create({
      data: {
        name,
        description: description || null,
        isOpen: isOpen ?? true,
      },
    });

    res.json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await prisma.restaurant.findMany();
    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getRestaurantById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const restaurant = await prisma.restaurant.findUnique({
      where: { id },
    });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOpenedRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await prisma.restaurant.findMany({
      where: { isOpen: true },
    });

    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getClosedRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await prisma.restaurant.findMany({
      where: { isOpen: false },
    });

    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateRestaurantName = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "name is required" });
    }

    const restaurant = await prisma.restaurant.update({
      where: { id },
      data: { name },
    });

    res.json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateRestaurantDescription = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { description } = req.body;

    const restaurant = await prisma.restaurant.update({
      where: { id },
      data: { description },
    });

    res.json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateRestaurantStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { isOpen } = req.body;

    if (isOpen === undefined) {
      return res.status(400).json({ message: "isOpen (true/false) is required" });
    }

    const restaurant = await prisma.restaurant.update({
      where: { id },
      data: { isOpen },
    });

    res.json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteRestaurant = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await prisma.restaurant.delete({
      where: { id },
    });

    res.json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
