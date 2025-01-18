import React, { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface PDFViewerProps {
  content: string;
}

export function PDFViewer({ content }: PDFViewerProps) {
  const [filteredContent, setFilteredContent] = useState(content);
  const [dateFilter, setDateFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [invoiceNumberFilter, setInvoiceNumberFilter] = useState('');

  const applyFilters = () => {
    let newContent = content;

    if (dateFilter) {
      const dateRegex = new RegExp(dateFilter, 'g');
      newContent = newContent.replace(dateRegex, match => `<mark class="bg-yellow-200">${match}</mark>`);
    }

    if (priceFilter) {
      const priceRegex = new RegExp(priceFilter, 'g');
      newContent = newContent.replace(priceRegex, match => `<mark class="bg-green-200">${match}</mark>`);
    }

    if (invoiceNumberFilter) {
      const invoiceRegex = new RegExp(invoiceNumberFilter, 'g');
      newContent = newContent.replace(invoiceRegex, match => `<mark class="bg-blue-200">${match}</mark>`);
    }

    setFilteredContent(newContent);
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          placeholder="Date regex (e.g., \d{2}\.\d{2}\.\d{4})"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
        <Input
          placeholder="Price regex (e.g., \d+,\d{2} €)"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        />
        <Input
          placeholder="Invoice number regex (e.g., \d{9})"
          value={invoiceNumberFilter}
          onChange={(e) => setInvoiceNumberFilter(e.target.value)}
        />
        <Button onClick={applyFilters}>Apply Filters</Button>
      </div>
      <div className="bg-white p-4 rounded-md shadow max-h-[600px] overflow-auto">
        <pre className="whitespace-pre-wrap font-mono text-sm" dangerouslySetInnerHTML={{ __html: filteredContent }} />
      </div>
    </div>
  );
}

