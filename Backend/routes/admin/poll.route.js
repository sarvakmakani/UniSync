import { Router } from "express";
import {
    addPoll,
    updatePoll,
    myPolls,
    pastPolls,
    upcomingPolls
} from "../../controllers/admin/poll.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import isAdmin from "../../middlewares/isAdmin.middleware.js";

const router = Router();
router.use(verifyJWT)
router.use(isAdmin)

router.route("/").post(addPoll).get(myPolls)
router.route("/:id").patch(updatePoll)
router.route("/past").get(pastPolls)
router.route("/upcoming").get(upcomingPolls)


export default router;
