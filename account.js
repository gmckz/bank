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
				amount,
				null,
				this.balance
			);
			this.transactions.push(newTransaction);
		}
	}
}

module.exports = Account;
