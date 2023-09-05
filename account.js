const Transaction = require("./transaction");

class Account {
	constructor() {
		this.balance = 0;
		this.transactions = [];
	}

	deposit(amount, date) {
		if (amount > 0) {
			this.balance += amount;
			const newTransaction = new Transaction(
				date,
				amount.toFixed(2),
				null,
				this.balance.toFixed(2)
			);
			this.transactions.push(newTransaction);
		}
	}

	withdraw(amount, date) {
		if (amount > 0) {
			this.balance -= amount;
			const newTransaction = new Transaction(
				date,
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
		return statement;
	}
}

module.exports = Account;
