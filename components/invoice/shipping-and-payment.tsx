"use client";

import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
    parcelSize: string;
    paymentMethod: string;
    shippingFee: number;
  };
  updateInvoiceData: (
    data: Partial<{
      parcelSize: string;
      shippingFee: number;
      paymentMethod: string;
    }>
  ) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const shippingRate = {
  Abra: { expressLetter: 107, onePounder: 130, threePounder: 238 },
  "Agusan del Norte": {
    expressLetter: 132,
    onePounder: 162,
    threePounder: 311,
  },
  "Agusan del Sur": { expressLetter: 132, onePounder: 162, threePounder: 311 },
  Aklan: { expressLetter: 128, onePounder: 156, threePounder: 298 },
  Albay: { expressLetter: 107, onePounder: 130, threePounder: 238 },
  Antique: { expressLetter: 128, onePounder: 156, threePounder: 298 },
  Apayao: { expressLetter: 107, onePounder: 130, threePounder: 238 },
  Aurora: { expressLetter: 107, onePounder: 130, threePounder: 238 },
  Basilan: { expressLetter: 132, onePounder: 162, threePounder: 311 },
  Bataan: { expressLetter: 107, onePounder: 130, threePounder: 238 },
  Batanes: { expressLetter: 107, onePounder: 130, threePounder: 238 },
  Batangas: { expressLetter: 107, onePounder: 130, threePounder: 238 },
  Benguet: { expressLetter: 107, onePounder: 130, threePounder: 238 },
  Biliran: { expressLetter: 128, onePounder: 156, threePounder: 298 },
  Bohol: { expressLetter: 128, onePounder: 156, threePounder: 298 },
  Bukidnon: { expressLetter: 132, onePounder: 162, threePounder: 311 },
  Bulacan: { expressLetter: 107, onePounder: 130, threePounder: 238 },
  Cagayan: { expressLetter: 107, onePounder: 130, threePounder: 238 },
  "Camarines Norte": { expressLetter: 107, onePounder: 130, threePounder: 238 },
  "Camarines Sur": { expressLetter: 107, onePounder: 130, threePounder: 238 },
  Camiguin: { expressLetter: 132, onePounder: 162, threePounder: 311 },
  Capiz: { expressLetter: 128, onePounder: 156, threePounder: 298 },
  Catanduanes: { expressLetter: 107, onePounder: 130, threePounder: 238 },
  Cavite: { expressLetter: 107, onePounder: 130, threePounder: 238 },
  Cebu: { expressLetter: 128, onePounder: 156, threePounder: 298 },
  "Compostela Valley": {
    expressLetter: 132,
    onePounder: 162,
    threePounder: 311,
  },
  "Davao del Norte": { expressLetter: 132, onePounder: 162, threePounder: 311 },
  "Davao del Sur": { expressLetter: 132, onePounder: 162, threePounder: 311 },
  "Davao Oriental": { expressLetter: 132, onePounder: 162, threePounder: 311 },
  "Dinagat Islands": { expressLetter: 128, onePounder: 156, threePounder: 298 },
  "Eastern Samar": { expressLetter: 0, onePounder: 0, threePounder: 0 },
  Guimaras: { expressLetter: 128, onePounder: 156, threePounder: 298 },
  Ifugao: { expressLetter: 107, onePounder: 130, threePounder: 238 },
  "Ilocos Norte": { expressLetter: 107, onePounder: 130, threePounder: 238 },
  "Ilocos Sur": { expressLetter: 107, onePounder: 130, threePounder: 238 },
  Iloilo: { expressLetter: 128, onePounder: 156, threePounder: 298 },
  Isabela: { expressLetter: 107, onePounder: 130, threePounder: 238 },
  Kalinga: { expressLetter: 107, onePounder: 130, threePounder: 238 },
  "La Union": { expressLetter: 107, onePounder: 130, threePounder: 238 },
  Laguna: { expressLetter: 107, onePounder: 130, threePounder: 238 },
  "Lanao del Norte": { expressLetter: 132, onePounder: 162, threePounder: 311 },
  "Lanao del Sur": { expressLetter: 132, onePounder: 162, threePounder: 311 },
  Leyte: { expressLetter: 128, onePounder: 156, threePounder: 298 },
  Maguindanao: { expressLetter: 132, onePounder: 162, threePounder: 311 },
  Marinduque: { expressLetter: 107, onePounder: 130, threePounder: 238 },
  Masbate: { expressLetter: 107, onePounder: 130, threePounder: 238 },
  "Metro Manila": { expressLetter: 120, onePounder: 145, threePounder: 266 },
  "Misamis Occidental": {
    expressLetter: 132,
    onePounder: 162,
    threePounder: 311,
  },
  "Misamis Oriental": {
    expressLetter: 132,
    onePounder: 162,
    threePounder: 311,
  },
  "Mountain Province": {
    expressLetter: 107,
    onePounder: 130,
    threePounder: 238,
  },
  "Negros Occidental": {
    expressLetter: 128,
    onePounder: 156,
    threePounder: 298,
  },
  "Negros Oriental": { expressLetter: 128, onePounder: 156, threePounder: 298 },
  "North Coabato": { expressLetter: 132, onePounder: 162, threePounder: 311 },
  "Northern Samar": { expressLetter: 128, onePounder: 156, threePounder: 298 },
  "Nueva Ecija": { expressLetter: 107, onePounder: 130, threePounder: 238 },
  "Nueva Vizcaya": { expressLetter: 107, onePounder: 130, threePounder: 238 },
  "Occidental Mindoro": {
    expressLetter: 107,
    onePounder: 130,
    threePounder: 238,
  },
  "Oriental Mindoro": {
    expressLetter: 107,
    onePounder: 130,
    threePounder: 238,
  },
  Palawan: { expressLetter: 107, onePounder: 130, threePounder: 238 },
  Pampanga: { expressLetter: 107, onePounder: 130, threePounder: 238 },
  Pangasinan: { expressLetter: 107, onePounder: 130, threePounder: 238 },
  Quezon: { expressLetter: 107, onePounder: 130, threePounder: 238 },
  Quirino: { expressLetter: 107, onePounder: 130, threePounder: 238 },
  Rizal: { expressLetter: 107, onePounder: 130, threePounder: 238 },
  Romblon: { expressLetter: 107, onePounder: 130, threePounder: 238 },
  Samar: { expressLetter: 128, onePounder: 156, threePounder: 298 },
  Sarangani: { expressLetter: 132, onePounder: 162, threePounder: 311 },
  "Shariff Kabunsuan": {
    expressLetter: 132,
    onePounder: 162,
    threePounder: 311,
  },
  Siquijor: { expressLetter: 128, onePounder: 156, threePounder: 298 },
  Sorsogon: { expressLetter: 107, onePounder: 130, threePounder: 238 },
  "South Cotabato": { expressLetter: 132, onePounder: 162, threePounder: 311 },
  "Southern Leyte": { expressLetter: 128, onePounder: 156, threePounder: 298 },
  "Sultan Kudarat": { expressLetter: 132, onePounder: 162, threePounder: 311 },
  Sulu: { expressLetter: 132, onePounder: 162, threePounder: 311 },
  "Surigao del Norte": {
    expressLetter: 132,
    onePounder: 162,
    threePounder: 311,
  },
  "Surigao del Sur": { expressLetter: 132, onePounder: 162, threePounder: 311 },
  Tarlac: { expressLetter: 107, onePounder: 130, threePounder: 238 },
  "Tawi-Tawi": { expressLetter: 132, onePounder: 162, threePounder: 311 },
  Zambales: { expressLetter: 107, onePounder: 130, threePounder: 238 },
  "Zamboanga del Norte": {
    expressLetter: 132,
    onePounder: 162,
    threePounder: 311,
  },
  "Zamboanga del Sur": {
    expressLetter: 132,
    onePounder: 162,
    threePounder: 311,
  },
  "Zamboanga Sibugay": {
    expressLetter: 132,
    onePounder: 162,
    threePounder: 311,
  },
};

const ShippingAndPayment: React.FC<ShippingAndPaymentProps> = ({
  invoiceData,
  updateInvoiceData,
  onNext,
  onPrevious,
}) => {
  const [parcelSize, setParcelSize] = useState(
    invoiceData.parcelSize || "expressLetter"
  );
  const [paymentMethod, setPaymentMethod] = useState(invoiceData.paymentMethod);
  const [shippingFee, setShippingFee] = useState(invoiceData.shippingFee || 0);

  const calculateShippingFee = (size: string) => {
    const provinceRates =
      shippingRate[invoiceData.address as keyof typeof shippingRate];
    if (!provinceRates) return 0;

    switch (size) {
      case "expressLetter":
        return provinceRates.expressLetter;
      case "onePounder":
        return provinceRates.onePounder;
      case "threePounder":
        return provinceRates.threePounder;
      default:
        return 0;
    }
  };

  useEffect(() => {
    if (parcelSize !== "custom") {
      const calculatedFee = calculateShippingFee(parcelSize);
      setShippingFee(calculatedFee);
      updateInvoiceData({ shippingFee: calculatedFee, parcelSize });
    }
  }, [parcelSize, invoiceData.address]);

  const handleShippingFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const value = e.target.value.replace(/[^0-9.]/g, "");
    // const newFee = value === "" ? 0 : parseFloat(value);
    const newFee = parseFloat(e.target.value);
    setShippingFee(newFee || 0);
    updateInvoiceData({ shippingFee: newFee || 0 });
  };

  const handleParcelSizeChange = (newSize: string) => {
    setParcelSize(newSize);
    if (newSize === "custom") {
      setShippingFee(0);
      updateInvoiceData({ shippingFee: 0, parcelSize: newSize });
    } else {
      const calculatedFee = calculateShippingFee(newSize);
      setShippingFee(calculatedFee);
      updateInvoiceData({ shippingFee: calculatedFee, parcelSize: newSize });
    }
  };

  const handleNext = () => {
    updateInvoiceData({ parcelSize, paymentMethod, shippingFee });
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
        <Label>Parcel Size</Label>
        <RadioGroup value={parcelSize} onValueChange={handleParcelSizeChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="expressLetter" id="expressLetter" />
            <Label htmlFor="expressLetter">Express Letter (Default)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="onePounder" id="onePounder" />
            <Label htmlFor="onePounder">1 Pounder</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="threePounder" id="threePounder" />
            <Label htmlFor="threePounder">3 Pounder</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="custom" id="custom" />
            <Label htmlFor="custom">Custom Fee</Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <Label>Shipping Fee</Label>
        <Input
          type="text"
          value={shippingFee}
          onChange={handleShippingFeeChange}
          disabled={parcelSize !== "custom"}
          placeholder={parcelSize === "custom" ? "Enter custom fee" : ""}
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
