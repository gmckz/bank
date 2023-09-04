const Account = require("./account");
const Transaction = require("./transaction");

jest.mock("./transaction", () => {
	return class Transaction {
		constructor(date, credit, debit, balance) {
			this.date = date;
			this.credit = credit;
			this.debit = debit;
			this.balance = balance;
		}
	};
});

test("an instance of Account initially has a balance of 0 and transactions is an empty array", () => {
	const myAccount = new Account();
	expect(myAccount.balance).toBe(0);
	expect(myAccount.transactions).toEqual([]);
});

test("calling deposit(amount, date) adds the amount to the balance and adds a transaction instance to the transactions array", () => {
	const myAccount = new Account();
	myAccount.deposit(1000, "4/9/2023");
	expect(myAccount.balance).toBe(1000);
	expect(myAccount.transactions.length).toBe(1);
	expect(myAccount.transactions[0]).toBeInstanceOf(Transaction);
});

test("calling deposit(0) does not change the balance or add to the transactions array", () => {
	const myAccount = new Account();
	myAccount.deposit(0, "4/9/2023");
	expect(myAccount.transactions.length).toBe(0);
});

test("calling deposit(-1) does not change the balance or add to the transactions array", () => {
	const myAccount = new Account();
	myAccount.deposit(-1, "4/9/2023");
	expect(myAccount.transactions.length).toBe(0);
});
