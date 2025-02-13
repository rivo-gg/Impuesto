"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Client {
  id: string;
  name: string;
  email: string;
  type: "b2c" | "b2b";
  company?: string;
}

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddClient: (client: Client) => void;
}

export function ClientModal({ isOpen, onClose, onAddClient }: ClientModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState<"b2c" | "b2b">("b2c");
  const [company, setCompany] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddClient({ id: "", name, email, type, company: type === "b2b" ? company : undefined });
    onClose();
    // Reset form
    setName("");
    setEmail("");
    setType("b2c");
    setCompany("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Type</Label>
            <RadioGroup value={type} onValueChange={(value: "b2c" | "b2b") => setType(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="b2c" id="b2c" />
                <Label htmlFor="b2c">B2C</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="b2b" id="b2b" />
                <Label htmlFor="b2b">B2B</Label>
              </div>
            </RadioGroup>
          </div>
          {type === "b2b" && (
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>
          )}
          <Button type="submit">Add Client</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
