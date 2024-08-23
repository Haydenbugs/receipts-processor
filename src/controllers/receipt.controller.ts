import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { processReceipt, getPoints } from '../services/receipt.service';
import { ReceiptResponseDto, PointsResponseDto } from '../dtos/receipt-response.dto';
import { ReceiptRequestDto } from '../dtos/receipt-request.dto';

export async function processReceiptController(req: Request, res: Response): Promise<void> {
    // Transform the incoming plain object into a ReceiptRequestDto instance
    const receipt = plainToClass(ReceiptRequestDto, req.body);

    // Validate the transformed object
    const errors = await validate(receipt);
    if (errors.length > 0) {
        // If there are validation errors, return a 400 response with the errors
        res.status(400).json({ errors });
        return;
    }

    // If validation passes, process the receipt
    const id: string = processReceipt(receipt);
    const response: ReceiptResponseDto = { id };
    res.status(200).json(response);
}

export function getPointsController(req: Request, res: Response): void {
    const { id } = req.params;
    const points = getPoints(id);
    if (points !== null) {
        const response: PointsResponseDto = { points };
        res.status(200).json(response);
    } else {
        res.status(404).json({ error: 'Receipt not found' });
    }
}
