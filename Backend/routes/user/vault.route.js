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

router.route("/").get(getDocuments).post(upload.single("file"),addDocument)
router.route("/:id").delete(deleteDocument)

export default router;
