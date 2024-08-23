import { processReceipt, getPoints } from '../services/receipt.service';
import { Receipt } from '../entities/receipt.entity';
import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid', () => ({
    v4: jest.fn().mockReturnValue('mock-uuid'),
}));

describe('Receipt Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should process receipt and return a UUID', () => {
        const receipt: Receipt = {
            retailer: 'Store',
            purchaseDate: '2022-01-01',
            purchaseTime: '12:00',
            items: [
                { shortDescription: 'Bread', price: 2.00 },
            ],
            total: 2.00,
        };

        const id = processReceipt(receipt);
        expect(id).toBe('mock-uuid');
        expect(uuidv4).toHaveBeenCalled();
    });

    test('should store receipt and points correctly', () => {
        const receipt: Receipt = {
            retailer: 'Store',
            purchaseDate: '2022-01-01',
            purchaseTime: '12:00',
            items: [
                { shortDescription: 'Bread', price: 2.00 },
            ],
            total: 2.00,
        };

        const id = processReceipt(receipt);
        const points = getPoints(id);
        expect(points).toBe(86);  // 5 for 'Store', 50 for round dollar amount, 25 for multiple of 0.25 and 6 for Odd dayte
    });

    test('should return null for non-existent receipt ID', () => {
        const points = getPoints('non-existent-id');
        expect(points).toBeNull();
    });
});
