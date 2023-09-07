class Statement {
	constructor(account) {
		this.account = account;
	}

	printStatement() {
		const statementHeader = "date || credit || debit || balance";
		let statement = statementHeader;
		if (!this.account.transactions.length) return statement;

		const statementTransactions = this.account.transactions.toReversed();
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
}

module.exports = Statement;
