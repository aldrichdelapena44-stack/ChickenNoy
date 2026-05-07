import { Router } from "express";
import {
    approveVerificationSubmission,
    feedback,
    keepVerificationSubmissionFile,
    orders,
    products,
    rejectVerificationSubmission,
    removeFeedback,
    removeVerificationSubmissionFile,
    reviewFeedback,
    summary,
    updateAdminProduct,
    updateAdminProductImage,
    users,
    verifications
} from "../controllers/admin.controller";
import { requireAdmin } from "../middlewares/auth.middleware";
import { uploadProductImage } from "../middlewares/upload.middleware";
import { validateBody } from "../middlewares/validation.middleware";
import { updateProductSchema } from "../validators/product.validator";

const router = Router();

router.get("/summary", requireAdmin, summary);
router.get("/users", requireAdmin, users);
router.get("/orders", requireAdmin, orders);
router.get("/products", requireAdmin, products);
router.put("/products/:id", requireAdmin, validateBody(updateProductSchema), updateAdminProduct);
router.put("/products/:id/image", requireAdmin, uploadProductImage.single("image"), updateAdminProductImage);
router.get("/feedback", requireAdmin, feedback);
router.put("/feedback/:id/review", requireAdmin, reviewFeedback);
router.delete("/feedback/:id", requireAdmin, removeFeedback);
router.get("/verifications", requireAdmin, verifications);
router.put("/verifications/:id/approve", requireAdmin, approveVerificationSubmission);
router.put("/verifications/:id/reject", requireAdmin, rejectVerificationSubmission);
router.put("/verifications/:id/file/keep", requireAdmin, keepVerificationSubmissionFile);
router.put("/verifications/:id/file/remove", requireAdmin, removeVerificationSubmissionFile);

export default router;
