import { Router } from "express";
import {
    getDocuments,
    addDocument,
    deleteDocument
} from "../../controllers/user/vault.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { upload } from "../../middlewares/multer.middleware.js";

const router = Router();
router.use(verifyJWT)

router.route("/").get(getDocuments)
router.route("/add").post(upload.single("document"),addDocument)
router.route("/:id").delete(deleteDocument)

export default router;
