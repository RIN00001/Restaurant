import { Router } from "express";
import {
  createOrder,
  getOrders,
  getOrdersByCustomer,
  getOrdersByRestaurant,
  getOrdersByTime
} from "../controllers/order.controller";

export const orderRouter = Router();

orderRouter.post("/", createOrder);

orderRouter.get("/", getOrders);

orderRouter.get("/customer/:customerId", getOrdersByCustomer);

orderRouter.get("/restaurant/:restaurantId", getOrdersByRestaurant);

orderRouter.get("/time", getOrdersByTime);
