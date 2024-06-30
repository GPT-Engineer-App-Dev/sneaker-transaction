import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

const placeholderTransactions = [
  { id: 1, date: "2023-10-01", amount: 200, type: "income", brand: "Nike" },
  { id: 2, date: "2023-10-02", amount: 150, type: "expense", brand: "Adidas" },
];

function Index() {
  const [transactions, setTransactions] = useState(placeholderTransactions);
  const [newTransaction, setNewTransaction] = useState({
    date: "",
    amount: "",
    type: "",
    brand: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const addTransaction = () => {
    setTransactions([
      ...transactions,
      { ...newTransaction, id: transactions.length + 1 },
    ]);
    setNewTransaction({ date: "", amount: "", type: "", brand: "" });
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={newTransaction.date}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                value={newTransaction.amount}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Select
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="brand">Brand</Label>
              <Select
                onValueChange={(value) => handleSelectChange("brand", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nike">Nike</SelectItem>
                  <SelectItem value="Adidas">Adidas</SelectItem>
                  <SelectItem value="Puma">Puma</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={addTransaction}>Add Transaction</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.brand}</TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      onClick={() => deleteTransaction(transaction.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}

export default Index;