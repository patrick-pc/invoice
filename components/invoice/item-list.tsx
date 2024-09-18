"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Item {
  name: string;
  price: number;
}

interface ItemListProps {
  invoiceData: {
    items: Item[];
  };
  updateInvoiceData: (
    data: Partial<{ items: Item[]; totalAmount: number }>
  ) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const ItemList: React.FC<ItemListProps> = ({
  invoiceData,
  updateInvoiceData,
  onNext,
  onPrevious,
}) => {
  const [items, setItems] = useState<Item[]>(invoiceData.items);
  const [newItem, setNewItem] = useState<Item>({ name: "", price: 0 });

  const addItem = () => {
    if (newItem.name && newItem.price) {
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      setNewItem({ name: "", price: 0 });
      updateInvoiceData({ items: updatedItems });
    }
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("en-PH", {
      style: "currency",
      currency: "PHP",
    });
  };

  const handleSubmit = () => {
    if (items.length === 0) {
      toast.error("At least one item is required.");
      return;
    }
    updateInvoiceData({ items, totalAmount: calculateTotal() });
    onNext();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Items</h2>
      {items.map((item, index) => (
        <div key={index} className="flex space-x-2">
          <span>{item.name}</span>
          <span>{formatCurrency(item.price)}</span>
        </div>
      ))}
      <div className="flex space-x-2">
        <Input
          type="text"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          placeholder="Item name"
        />
        <Input
          type="number"
          value={newItem.price}
          onChange={(e) =>
            setNewItem({ ...newItem, price: parseFloat(e.target.value) })
          }
          placeholder="Price"
        />
        <Button onClick={addItem}>Add</Button>
      </div>
      <div>
        <strong>Total: {formatCurrency(calculateTotal())}</strong>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button onClick={handleSubmit}>Next</Button>
      </div>
    </div>
  );
};

export default ItemList;
