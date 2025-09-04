import { Router } from "express";
import {
    getCies,
} from "../../controllers/user/cie.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT)

router.route("/").get(getCies)

export default router;
