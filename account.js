const Transaction = require("./transaction");

class Account {
	constructor() {
		this.balance = 0;
		this.transactions = [];
	}

	deposit(amount, date) {
		this.validateDateAndAmount(date, amount);
		if (amount > 0) {
			this.balance += amount;
			const dateString = this.dateStringFormatter(date);
			const newTransaction = new Transaction(
				dateString,
				amount.toFixed(2),
				null,
				this.balance.toFixed(2)
			);
			this.transactions.push(newTransaction);
		}
	}

	withdraw(amount, date) {
		this.validateDateAndAmount(date, amount);
		if (this.balance < amount) {
			throw new Error(
				"You do not have enough balance to make this withdrawal"
			);
		}
		if (amount > 0) {
			this.balance -= amount;
			const dateString = this.dateStringFormatter(date);
			const newTransaction = new Transaction(
				dateString,
				null,
				amount.toFixed(2),
				this.balance.toFixed(2)
			);
			this.transactions.push(newTransaction);
		}
	}

	printStatement() {
		// set the statement header
		const statementHeader = "date || credit || debit || balance";
		let statement = statementHeader;
		// return statement header if no transactions
		if (!this.transactions.length) {
			return statement;
		}
		//reverse order of transactions array
		const statementTransactions = this.transactions.toReversed();
		// create string for each transaction and push to statement
		statementTransactions.forEach((transaction) => {
			if (transaction.credit === null) {
				const stringTransaction = `\n${transaction.date} || || ${transaction.debit} || ${transaction.balance}`;
				statement += stringTransaction;
			} else {
				const stringTransaction = `\n${transaction.date} || ${transaction.credit} || || ${transaction.balance}`;
				statement += stringTransaction;
			}
		});
		console.log(statement);
		return statement;
	}

	dateStringFormatter(date) {
		const dateString = date.toLocaleString("en-GB");
		return dateString.split(",")[0];
	}

	validateDateAndAmount(date, amount) {
		if (!date instanceof Date || isNaN(date)) {
			throw new Error("Date must be provided as a date object");
		}
		if (typeof amount !== "number") {
			throw new Error("amount must be a number");
		}
	}
}

module.exports = Account;
