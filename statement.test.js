const Statement = require("./statement");
const Account = require("./account");

jest.mock("./Account", () => {
	return jest.fn().mockImplementation(() => {
		return {
			deposit: jest.fn(),
			withdraw: jest.fn(),
			transactions: [
				{
					// Mock transaction object
					date: "05/09/2023",
					credit: "500.00",
					debit: null,
					balance: "500.00",
				},
				{
					// Mock transaction object
					date: "06/09/2023",
					credit: null,
					debit: "200.00",
					balance: "300.00",
				},
			],
		};
	});
});

test("an instance of Statement initially has an account property", () => {
	const mockAccount = {
		transactions: jest.fn(),
	};
	const myStatement = new Statement(mockAccount);
	expect(myStatement.account).toBe(mockAccount);
});

test("calling printStatement() when transactions array is populated returns full statement", () => {
	const myAccount = new Account();
	myAccount.deposit(500, new Date("2023-09-05"));
	myAccount.withdraw(200, new Date("2023-09-06"));
	const myStatement = new Statement(myAccount);
	const statement = myStatement.printStatement();
	expect(statement).toBe(
		"date || credit || debit || balance\n06/09/2023 || || 200.00 || 300.00\n05/09/2023 || 500.00 || || 500.00"
	);
});
