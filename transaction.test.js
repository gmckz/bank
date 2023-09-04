const Transaction = require("./transaction");

test("creating an instance of Transaction with a date, credit, debit and balance sets the properties of the transaction to those values", () => {
	const newTransaction = new Transaction("4/09/2023", null, 500, -500);
	expect(newTransaction.date).toBe("4/09/2023");
	expect(newTransaction.credit).toBe(null);
	expect(newTransaction.debit).toBe(500);
	expect(newTransaction.balance).toBe(-500);
});
