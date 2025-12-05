import { Router } from "express";
import {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
} from "../controllers/customer.controller";

export const customerRouter = Router();

customerRouter.post("/", createCustomer);

customerRouter.get("/", getCustomers);

customerRouter.get("/:id", getCustomerById);

customerRouter.put("/:id", updateCustomer);

customerRouter.delete("/:id", deleteCustomer);
