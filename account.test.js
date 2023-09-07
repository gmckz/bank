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
	expect(myAccount.transactions).toEqual([]);
	expect(myAccount.getBalance()).toBe(0);
});

test("calling deposit(amount, date) adds the calculates the new balance and adds a transaction instance to the transactions array", () => {
	const myAccount = new Account();
	myAccount.deposit(1000, new Date("2023-09-04"));
	expect(myAccount.transactions.length).toBe(1);
	expect(myAccount.transactions[0]).toBeInstanceOf(Transaction);
	expect(myAccount.getBalance()).toBe(1000);
});

test("calling deposit(0) throws an error", () => {
	const myAccount = new Account();
	expect(() => myAccount.deposit(0, new Date("2023-09-04"))).toThrow(
		"Amount must be greater than 0"
	);
});

test("calling deposit(-1) throws an error", () => {
	const myAccount = new Account();
	expect(() => myAccount.deposit(-1, new Date("2023-09-04"))).toThrow(
		"Amount must be greater than 0"
	);
});

test("calling withdraw(amount, date) when there is enough balance subtracts the amount from the balance and adds a transaction to the transactions array", () => {
	const myAccount = new Account();
	myAccount.deposit(100, new Date("2023-09-04"));
	expect(myAccount.getBalance()).toBe(100);
	myAccount.withdraw(100, new Date("2023-09-05"));
	expect(myAccount.transactions.length).toBe(2);
	expect(myAccount.transactions[1]).toBeInstanceOf(Transaction);
	expect(myAccount.getBalance()).toBe(0);
});

test("calling withdraw(amount, date) when there is not enough balance in the account throws an error", () => {
	const myAccount = new Account();
	expect(() => myAccount.withdraw(100, new Date("2023-09-04"))).toThrow(
		"You do not have enough balance to make this withdrawal"
	);
});

test("calling deposit(amount, date) or withdraw(amount, date) throws error if date given is not a date object", () => {
	const myAccount = new Account();
	expect(() => myAccount.deposit(200, "05/09/2023")).toThrow(
		"Date must be provided as a date object"
	);
	expect(() => myAccount.withdraw(200, "05/09/2023")).toThrow(
		"Date must be provided as a date object"
	);
});

test("dateStringFormatter() returns a date as a string when given a date object", () => {
	const myAccount = new Account();
	const dateString = myAccount.dateStringFormatter(new Date("2023-09-05"));
	expect(dateString).toBe("05/09/2023");
});

test("calling deposit or withdraw with amount that isnt a number throws an error", () => {
	const myAccount = new Account();
	expect(() => myAccount.deposit("200", new Date("2023-09-05"))).toThrow(
		"amount must be a number"
	);
	expect(() => myAccount.withdraw("200", new Date("2023-09-05"))).toThrow(
		"amount must be a number"
	);
});

test("validateDateAndAmount() throws error when date is not a date object", () => {
	const myAccount = new Account();
	expect(() => myAccount.validateDateAndAmount("05/09/2023", 200)).toThrow(
		"Date must be provided as a date object"
	);
});

test("validateDateAndAmount() throws error when amount is not a number", () => {
	const myAccount = new Account();
	expect(() =>
		myAccount.validateDateAndAmount(new Date("2023-09-05"), "200")
	).toThrow("amount must be a number");
});
