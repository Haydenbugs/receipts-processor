// src/routes/receipts.router.ts
import { Router } from 'express';
import { processReceiptController, getPointsController } from '../controllers/receipt.controller';

const router = Router();

router.post('/process', processReceiptController);
router.get('/:id/points', getPointsController);

export default router;
