import { Router } from "express";
import {
    addForm,
    updateForm
} from "../../controllers/admin/form.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import isAdmin from "../../middlewares/isAdmin.middleware.js";

const router = Router();
router.use(verifyJWT)
router.use(isAdmin)

router.route("/").post(addForm)
router.route("/:id").patch(updateForm)

export default router;
