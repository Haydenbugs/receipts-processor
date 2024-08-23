import { Receipt } from '../../entities/receipt.entity';

export function calculatePoints(receipt: Receipt): number {
    let points = 0;

    // 1 point for every alphanumeric character in the retailer name
    if (receipt.retailer) {
        points += receipt.retailer.replace(/[^a-zA-Z0-9]/g, '').length;
    }

    // 50 points if the total is a round dollar amount with no cents (and non-zero)
    if (receipt.total > 0 && Number.isInteger(receipt.total)) {
        points += 50;
    }

    // 25 points if the total is a multiple of 0.25 (and non-zero)
    if (receipt.total > 0 && receipt.total % 0.25 === 0) {
        points += 25;
    }

    // 5 points for every two items on the receipt
    points += Math.floor(receipt.items.length / 2) * 5;

    // Points based on item descriptions
    receipt.items.forEach((item) => {
        const trimmedDescription = item.shortDescription.trim();
        if (trimmedDescription.length % 3 === 0) {
            points += Math.ceil(item.price * 0.2);
        }
    });

    // 6 points if the day in the purchase date is odd
    if (receipt.purchaseDate) {
        const purchaseDay = parseInt(receipt.purchaseDate.split('-')[2], 10);
        if (purchaseDay % 2 !== 0) {
            points += 6;
        }
    }

    // 10 points if the time of purchase is after 2:00pm and before 4:00pm
    if (receipt.purchaseTime) {
        const purchaseTime = receipt.purchaseTime.split(':');
        const hour = parseInt(purchaseTime[0], 10);
        const minute = parseInt(purchaseTime[1], 10);
        if (hour === 14 || (hour === 15 && minute < 60)) {
            points += 10;
        }
    }

    return points;
}
