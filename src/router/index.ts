import { Router } from "express";
import authRouter from "./auth.routes";

const router = Router();

// Mount the authRouter on the "/auth" path
router.use("/auth", authRouter);

export default router;
