import { Router } from "express";
import {
    addEvent,
    updateEvent,
    getEvents,
    pastEvents
} from "../../controllers/admin/event.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import isAdmin from "../../middlewares/isAdmin.middleware.js";

const router = Router();
router.use(verifyJWT)
router.use(isAdmin)

router.route("/").post(addEvent).get(getEvents)
router.route("/:id").patch(updateEvent)
router.route("/past").get(pastEvents)

export default router;
