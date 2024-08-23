import { Receipt } from '../entities/receipt.entity';
import { calculatePoints } from '../services/helpers/receipt-point-calculation';
describe('calculatePoints', () => {
    test('should calculate points correctly for a simple receipt', () => {
        const receipt: Receipt = {
            retailer: 'Target',
            purchaseDate: '2022-01-02',
            purchaseTime: '13:13',
            items: [
                { shortDescription: 'Pepsi', price: 1.11 },
            ],
            total: 1.11,
        };

        const points = calculatePoints(receipt);
        expect(points).toBe(6);  // 6 points for 'Target'
    });

    test('should add 50 points for round dollar amount', () => {
        const receipt: Receipt = {
            retailer: 'Store',
            purchaseDate: '2022-02-02',
            purchaseTime: '13:00',
            items: [
                { shortDescription: 'Water', price: 3.00 },
            ],
            total: 3.00,
        };

        const points = calculatePoints(receipt);
        expect(points).toBe(80);  // 5 for 'Store', 50 for round dollar amount, 25 for multiple of 0.25
    });

    test('should add 25 points for total being multiple of 0.25', () => {
        const receipt: Receipt = {
            retailer: 'Grocery',
            purchaseDate: '2022-02-02',
            purchaseTime: '10:00',
            items: [
                { shortDescription: 'Milk', price: 2.25 },
            ],
            total: 2.25,
        };

        const points = calculatePoints(receipt);
        expect(points).toBe(32);  // 7 for 'Grocery', 25 for total being multiple of 0.25
    });

    test('should add points for odd day purchase', () => {
        const receipt: Receipt = {
            retailer: '',
            purchaseDate: '2022-03-01',  // March 1st (odd day)
            purchaseTime: '13:00',
            items: [
                { shortDescription: 'Juice', price: 1.11 },
            ],
            total: 1.11,
        };

        const points = calculatePoints(receipt);
        expect(points).toBe(6);  // 6 for odd day
    });

    test('should return 0 points for empty receipt', () => {
        const receipt: Receipt = {
            retailer: '',
            purchaseDate: '',
            purchaseTime: '',
            items: [],
            total: 0,
        };

        const points = calculatePoints(receipt);
        expect(points).toBe(0);
    });
});





