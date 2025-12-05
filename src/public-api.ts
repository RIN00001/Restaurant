import { Router } from "express";
import { customerRouter } from "./routes/customer.route";
import { restaurantRouter } from "./routes/restaurant.route";
import { orderRouter } from "./routes/order.route";

const api = Router();

api.use("/customers", customerRouter);
api.use("/restaurants", restaurantRouter);
api.use("/orders", orderRouter);

export default api;
