"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface BillingInfoProps {
  invoiceData: {
    name: string;
    address: string;
  };
  updateInvoiceData: (data: Partial<{ name: string; address: string }>) => void;
  onNext: () => void;
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
  "North Cotabato": { expressLetter: 132, onePounder: 162, threePounder: 311 },
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

const BillingInfo: React.FC<BillingInfoProps> = ({
  invoiceData,
  updateInvoiceData,
  onNext,
}) => {
  const [name, setName] = useState(invoiceData.name);
  const [address, setAddress] = useState(invoiceData.address);

  const handleNext = () => {
    updateInvoiceData({ name, address });
    onNext();
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="address">Address</Label>
        <Select value={address} onValueChange={setAddress}>
          <SelectTrigger>
            <SelectValue placeholder="Select an address" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(shippingRate).map((province) => (
              <SelectItem key={province} value={province}>
                {province}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={handleNext}>Next</Button>
    </div>
  );
};

export default BillingInfo;
