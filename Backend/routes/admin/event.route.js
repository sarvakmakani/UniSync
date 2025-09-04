import { Router } from "express";
import {
    addEvent,
    updateEvent
} from "../../controllers/admin/event.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import isAdmin from "../../middlewares/isAdmin.middleware.js";

const router = Router();
router.use(verifyJWT)
router.use(isAdmin)

router.route("/").post(addEvent)
router.route("/:id").patch(updateEvent)

export default router;
