import {
    IsString,
    IsNumber,
    IsArray,
    Matches,
    ValidateNested,
  } from 'class-validator';
  import { Transform, Type } from 'class-transformer';
  
  const priceNumberOptions = {
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 2,
  };
  
  export const ReceiptDateStringFormat =
    /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
  
  export const ReceiptTimeStringFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;
  
  class ReceiptItem {
    @IsString()
    shortDescription!: string;
  
    @Transform(({ value }) => parseFloat(value)) // Transform string to number
    @IsNumber(priceNumberOptions)
    price!: number;
  }
  
  export class ReceiptRequestDto {
    @IsString()
    retailer!: string;
  
    @Matches(ReceiptDateStringFormat)
    purchaseDate!: string;
  
    @Matches(ReceiptTimeStringFormat)
    purchaseTime!: string;
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ReceiptItem)
    items!: ReceiptItem[];
  
    @Transform(({ value }) => parseFloat(value)) // Transform string to number
    @IsNumber(priceNumberOptions)
    total!: number;
  }
  