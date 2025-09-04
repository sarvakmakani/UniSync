import { Router } from "express";
import {
    addPoll,
    updatePoll
} from "../../controllers/admin/poll.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import isAdmin from "../../middlewares/isAdmin.middleware.js";

const router = Router();
router.use(verifyJWT)
router.use(isAdmin)

router.route("/").post(addPoll)
router.route("/:id").patch(updatePoll)


export default router;
