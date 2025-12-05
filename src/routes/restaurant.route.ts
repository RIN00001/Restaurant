import { Router } from "express";
import {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  getOpenedRestaurants,
  getClosedRestaurants,
  updateRestaurantName,
  updateRestaurantDescription,
  updateRestaurantStatus,
  deleteRestaurant
} from "../controllers/restaurant.controller";

export const restaurantRouter = Router();

restaurantRouter.post("/", createRestaurant);

restaurantRouter.get("/", getRestaurants);

restaurantRouter.get("/:id", getRestaurantById);

restaurantRouter.get("/status/opened/all", getOpenedRestaurants);

restaurantRouter.get("/status/closed/all", getClosedRestaurants);

restaurantRouter.put("/:id/name", updateRestaurantName);

restaurantRouter.put("/:id/description", updateRestaurantDescription);

restaurantRouter.put("/:id/status", updateRestaurantStatus);

restaurantRouter.delete("/:id", deleteRestaurant);
