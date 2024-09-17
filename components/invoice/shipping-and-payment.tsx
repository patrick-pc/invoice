"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface ShippingAndPaymentProps {
  invoiceData: {
    address: string;
    totalAmount: number;
    paymentMethod: string;
    shippingFee: number;
  };
  updateInvoiceData: (
    data: Partial<{
      shippingFee: number;
      paymentMethod: string;
    }>
  ) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const ShippingAndPayment: React.FC<ShippingAndPaymentProps> = ({
  invoiceData,
  updateInvoiceData,
  onNext,
  onPrevious,
}) => {
  const [paymentMethod, setPaymentMethod] = useState(invoiceData.paymentMethod);
  const [shippingFee, setShippingFee] = useState(invoiceData.shippingFee || 0);

  const handleShippingFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFee = parseFloat(e.target.value);
    setShippingFee(newFee || 0);
    updateInvoiceData({ shippingFee: newFee || 0 });
  };

  const handleNext = () => {
    updateInvoiceData({ paymentMethod, shippingFee });
    onNext();
  };

  const total = invoiceData.totalAmount + shippingFee;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Shipping and Payment</h2>
        <p>Subtotal: ₱{invoiceData.totalAmount.toFixed(2)}</p>
        <p>Shipping Address: {invoiceData.address}</p>
      </div>
      <div>
        <Label>Shipping Fee</Label>
        <Input
          type="number"
          value={shippingFee}
          onChange={handleShippingFeeChange}
          placeholder="Enter shipping fee"
        />
      </div>
      <div>
        <Label>Payment Method</Label>
        <Select value={paymentMethod} onValueChange={setPaymentMethod}>
          <SelectTrigger>
            <SelectValue placeholder="Select a payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bpi">BPI</SelectItem>
            <SelectItem value="bdo">BDO</SelectItem>
            <SelectItem value="gcash">GCash</SelectItem>
            <SelectItem value="lbc">LBC</SelectItem>
            <SelectItem value="cebuana">Cebuana Lhuillier</SelectItem>
            <SelectItem value="palawan">Palawan Express</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <p className="font-semibold">Total: ₱{total.toFixed(2)}</p>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};

export default ShippingAndPayment;
