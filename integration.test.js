const Account = require("./account");
const Statement = require("./statement");

test("date, debit, credit and balance all display correctly in statement after a deposit is made", () => {
	const myAccount = new Account();
	myAccount.deposit(500, new Date("2023-09-04"));
	const myStatement = new Statement(myAccount);
	const statement = myStatement.printStatement();
	expect(statement).toBe(
		"date || credit || debit || balance\n04/09/2023 || 500.00 || || 500.00"
	);
});

test("date, debit, credit and balance all display correctly in statement after a withdrawal is made", () => {
	const myAccount = new Account();
	myAccount.deposit(500, new Date("2023-09-04"));
	myAccount.withdraw(500, new Date("2023-09-04"));
	const myStatement = new Statement(myAccount);
	const statement = myStatement.printStatement();
	expect(statement).toBe(
		"date || credit || debit || balance\n04/09/2023 || || 500.00 || 0.00\n04/09/2023 || 500.00 || || 500.00"
	);
});

test("acceptance critera", () => {
	const myAccount = new Account();
	myAccount.deposit(1000, new Date("2023-01-10"));
	myAccount.deposit(2000, new Date("2023-01-13"));
	myAccount.withdraw(500, new Date("2023-01-14"));
	const myStatement = new Statement(myAccount);
	const statement = myStatement.printStatement();
	expect(statement).toBe(
		"date || credit || debit || balance\n14/01/2023 || || 500.00 || 2500.00\n13/01/2023 || 2000.00 || || 3000.00\n10/01/2023 || 1000.00 || || 1000.00"
	);
});
