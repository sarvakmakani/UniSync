import { Router } from "express";
import {
    getStatistics,
} from "../../controllers/user/dashboard.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT)

router.route("/").get(getStatistics)

export default router;
