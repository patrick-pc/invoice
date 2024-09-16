import { Button } from "@/components/ui/button";

interface InvoiceData {
  name: string;
  address: string;
  items: Array<{ name: string; price: number }>;
  totalAmount: number;
  parcelSize: string;
  shippingFee: number;
  paymentMethod: string;
}

interface InvoicePreviewProps {
  invoiceData: InvoiceData;
  onPrevious: () => void;
}

const user = {
  name: "Soniella Therese Yumang",
  phone: "+63 977 105 9115",
  address: "Macabebe, Pampanga",
};

const account = {
  bpi: {
    title: "BPI",
    accountName: "Soniella Therese Yumang",
    accountNumber: "0759 4400 48",
    accountAddress: "",
  },
  bdo: {
    title: "BDO",
    accountName: user.name,
    accountNumber: "0013 1124 6388",
    accountAddress: "",
  },
  gcash: {
    title: "GCash",
    accountName: user.name,
    accountNumber: user.phone,
    accountAddress: "",
  },
  lbc: {
    title: "LBC",
    accountName: user.name,
    accountNumber: user.phone,
    accountAddress: user.address,
  },
  cebuana: {
    title: "Cebuana Lhuillier",
    accountName: user.name,
    accountNumber: user.phone,
    accountAddress: user.address,
  },
  palawan: {
    title: "Palawan Express",
    accountName: user.name,
    accountNumber: user.phone,
    accountAddress: user.address,
  },
};

const InvoicePreview: React.FC<InvoicePreviewProps> = ({
  invoiceData,
  onPrevious,
}) => {
  const selectedAccount =
    account[invoiceData.paymentMethod as keyof typeof account] || null;

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("en-PH", {
      style: "currency",
      currency: "PHP",
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Invoice Preview</h2>
      <div>
        <p>
          <strong>Name:</strong> {invoiceData.name}
        </p>
        <p>
          <strong>Address:</strong> {invoiceData.address}
        </p>
      </div>
      <div>
        <h3 className="font-semibold">Items:</h3>
        {invoiceData.items.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span>{item.name}</span>
            <span>{formatCurrency(item.price)}</span>
          </div>
        ))}
      </div>
      <div>
        <p>
          <strong>Subtotal:</strong> {formatCurrency(invoiceData.totalAmount)}
        </p>
        <p>
          <strong>Shipping Fee:</strong>{" "}
          {formatCurrency(invoiceData.shippingFee)}
        </p>
        <p>
          <strong>Total:</strong>{" "}
          {formatCurrency(invoiceData.totalAmount + invoiceData.shippingFee)}
        </p>
      </div>
      <div>
        <h3 className="font-semibold">Payment Details:</h3>
        {selectedAccount ? (
          <>
            <p>
              <strong>Method:</strong> {selectedAccount.title}
            </p>
            <p>
              <strong>Account Name:</strong> {selectedAccount.accountName}
            </p>
            <p>
              <strong>Account Number:</strong> {selectedAccount.accountNumber}
            </p>
            {selectedAccount.accountAddress && (
              <p>
                <strong>Account Address:</strong>{" "}
                {selectedAccount.accountAddress}
              </p>
            )}
          </>
        ) : (
          <p>No payment method selected or invalid payment method.</p>
        )}
      </div>
      <Button onClick={onPrevious}>Previous</Button>
    </div>
  );
};

export default InvoicePreview;
