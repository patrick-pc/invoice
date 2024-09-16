import InvoiceForm from "@/components/invoice/invoice-form";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Wear Classica</h1>
      <InvoiceForm />
    </div>
  );
}
