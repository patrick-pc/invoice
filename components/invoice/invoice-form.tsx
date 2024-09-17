"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation";
import BillingInfo from "./billing-info";
import ItemList from "./item-list";
import ShippingAndPayment from "./shipping-and-payment";
import InvoicePreview from "./invoice-preview";

// Add this constant
const VALID_PAYMENT_METHODS = [
  "bpi",
  "bdo",
  "gcash",
  "lbc",
  "cebuana",
  "palawan",
];

interface InvoiceData {
  name: string;
  address: string; // This should now be a province name
  items: Array<{ name: string; price: number }>;
  totalAmount: number;
  shippingFee: number;
  paymentMethod: (typeof VALID_PAYMENT_METHODS)[number];
  parcelSize: string;
}

const InvoiceForm = () => {
  const [step, setStep] = useState(1);
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    name: "",
    address: "",
    items: [],
    totalAmount: 0,
    parcelSize: "",
    shippingFee: 0,
    paymentMethod: "",
  });

  // const router = useRouter();

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const updateInvoiceData = (newData: Partial<InvoiceData>) => {
    setInvoiceData({ ...invoiceData, ...newData });
  };

  return (
    <div>
      {step === 1 && (
        <BillingInfo
          invoiceData={invoiceData}
          updateInvoiceData={updateInvoiceData}
          onNext={handleNext}
        />
      )}
      {step === 2 && (
        <ItemList
          invoiceData={invoiceData}
          updateInvoiceData={updateInvoiceData}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
      {step === 3 && (
        <ShippingAndPayment
          invoiceData={invoiceData}
          updateInvoiceData={updateInvoiceData}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
      {step === 4 && (
        <InvoicePreview invoiceData={invoiceData} onPrevious={handlePrevious} />
      )}
    </div>
  );
};

export default InvoiceForm;
