// src/services/receipt.service.ts
import { v4 as uuidv4 } from 'uuid';
import { Receipt } from '../entities/receipt.entity';
import { calculatePoints } from './helpers/receipt-point-calculation';

interface StoredReceipt {
    receipt: Receipt;
    points: number;
}

const receipts = new Map<string, StoredReceipt>();

export function processReceipt(receipt: Receipt): string {
    const id = uuidv4();
    const points = calculatePoints(receipt);
    receipts.set(id, { receipt, points });
    return id;
}

export function getPoints(id: string): number | null {
    const storedReceipt = receipts.get(id);
    return storedReceipt ? storedReceipt.points : null;
}
