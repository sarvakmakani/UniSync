import { Router } from "express";
import {
    addCie,
    updateCie
} from "../../controllers/admin/cie.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import isAdmin from "../../middlewares/isAdmin.middleware.js";

const router = Router();
router.use(verifyJWT)
router.use(isAdmin)

router.route("/").post(addCie)
router.route("/:id").patch(updateCie)

export default router;
