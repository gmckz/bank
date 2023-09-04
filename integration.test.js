const Account = require("./account");

test.skip("date, debit, credit and balance all display correctly in statement after a deposit is made", () => {
	const myAccount = new Account();
	myAccount.deposit(500, "4/09/2023");
	const statement = myAccount.printStatement();
	expect(statement).toBe(
		"date || credit || debit || balance\n4/09/2023 || 500.00 || || 500.00"
	);
});
