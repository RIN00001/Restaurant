import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const addMinutes = (date: Date, minutes: number) => {
  return new Date(date.getTime() + minutes * 60000);
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { customerId, restaurantId, itemCount } = req.body;

    if (!customerId || !restaurantId || !itemCount) {
      return res.status(400).json({ message: "customerId, restaurantId and itemCount required" });
    }

    const createdAt = new Date();
    const eta = addMinutes(createdAt, itemCount * 10 + 10);

    const order = await prisma.order.create({
      data: {
        customerId,
        restaurantId,
        itemCount,
        createdAt,
        eta
      },
    });

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        customer: true,
        restaurant: true
      }
    });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrdersByCustomer = async (req: Request, res: Response) => {
  try {
    const customerId = Number(req.params.customerId);

    const orders = await prisma.order.findMany({
      where: { customerId },
      include: {
        customer: true,
        restaurant: true
      }
    });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrdersByRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurantId = Number(req.params.restaurantId);

    const orders = await prisma.order.findMany({
      where: { restaurantId },
      include: {
        customer: true,
        restaurant: true
      }
    });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrdersByTime = async (req: Request, res: Response) => {
  try {
    const { date } = req.query; 

    if (!date) {
      return res.status(400).json({ message: "Provide ?date=YYYY-MM-DD" });
    }

    const start = new Date(date as string);
    const end = new Date(start);
    end.setDate(start.getDate() + 1);

    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: start,
          lt: end,
        }
      },
      include: {
        customer: true,
        restaurant: true
      }
    });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
