const Account = require("./account");

test("date, debit, credit and balance all display correctly in statement after a deposit is made", () => {
	const myAccount = new Account();
	myAccount.deposit(500, "4/09/2023");
	const statement = myAccount.printStatement();
	expect(statement).toBe(
		"date || credit || debit || balance\n4/09/2023 || 500.00 || || 500.00"
	);
});

test("date, debit, credit and balance all display correctly in statement after a withdrawal is made", () => {
	const myAccount = new Account();
	myAccount.withdraw(500, "4/09/2023");
	const statement = myAccount.printStatement();
	expect(statement).toBe(
		"date || credit || debit || balance\n4/09/2023 || || 500.00 || -500.00"
	);
});

test("acceptance critera", () => {
	const myAccount = new Account();
	myAccount.deposit(1000, "10-01-2023");
	myAccount.deposit(2000, "13-01-2023");
	myAccount.withdraw(500, "14-01-2023");
	const statement = myAccount.printStatement();
	expect(statement).toBe(
		"date || credit || debit || balance\n14/01/2023 || || 500.00 || 2500.00\n13/01/2023 || 2000.00 || || 3000.00\n10/01/2023 || 1000.00 || || 1000.00"
	);
});
