import { Router } from "express";
import {
    getPolls,
    votePoll
} from "../../controllers/user/poll.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT)

router.route("/").get(getPolls)
router.route("/:id").get(votePoll)


export default router;
