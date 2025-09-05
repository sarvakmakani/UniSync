import { Router } from "express";
import {
    addCie,
    updateCie,
    myCies,
    pastCies,
    upcomingCies
} from "../../controllers/admin/cie.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import isAdmin from "../../middlewares/isAdmin.middleware.js";

const router = Router();
router.use(verifyJWT)
router.use(isAdmin)

router.route("/").post(addCie).get(myCies)
router.route("/:id").patch(updateCie)
router.route("/past").get(pastCies)
router.route("/upcoming").get(upcomingCies)

export default router;
