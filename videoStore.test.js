const { Movie, Rental, Customer } = require('./videoStore_new')

describe(
	'Check video store functionality',
	() => {
		const testCases = [
			{
				function: () => {
					movie = new Movie('Tomorrow', Movie.NEW_RELEASE);
					rental = new Rental(movie, 5);
					customer = new Customer('David');
					customer.addRental(rental);
					return customer.statement();
				},
				inString: 'Test1',
				expected: 'Rental Record for David\n\tTomorrow\t15\nAmount owed is 15\nYou earned 2 frequent renter points'
			},
			{
				function: () => {
					movie = new Movie('Tomorrow', Movie.REGULAR);
					rental = new Rental(movie, 3);
					customer = new Customer('David');
					customer.addRental(rental);
					return customer.statement();
				},
				inString: 'Test2',
				expected: 'Rental Record for David\n\tTomorrow\t3.5\nAmount owed is 3.5\nYou earned 1 frequent renter points'
			},
			{
				function: () => {
					movie = new Movie('Tomorrow', Movie.REGULAR);
					rental = new Rental(movie, 1);
					customer = new Customer('David');
					customer.addRental(rental);
					return customer.statement();
				},
				inString: 'Test3',
				expected: 'Rental Record for David\n\tTomorrow\t2\nAmount owed is 2\nYou earned 1 frequent renter points'
			},
			{
				function: () => {
					movie = new Movie('Tomorrow', Movie.CHILDRENS);
					rental = new Rental(movie, 4);
					customer = new Customer('David');
					customer.addRental(rental);
					return customer.statement();
				},
				inString: 'Test4',
				expected: 'Rental Record for David\n\tTomorrow\t3\nAmount owed is 3\nYou earned 1 frequent renter points'
			},
			{
				function: () => {
					movie = new Movie('Tomorrow', Movie.CHILDRENS);
					rental = new Rental(movie, 2);
					customer = new Customer('David');
					customer.addRental(rental);
					return customer.statement();
				},
				inString: 'Test5',
				expected: 'Rental Record for David\n\tTomorrow\t1.5\nAmount owed is 1.5\nYou earned 1 frequent renter points'
			},
			{
				function: () => {
					movie = new Movie('Harry Potter', Movie.CHILDRENS);
					return movie.getPriceCode();
				},
				inString: 'Test6',
				expected: Movie.CHILDRENS
			},
			{
				function: () => {
					movie = new Movie('Harry Potter', Movie.REGULAR);
					return movie.getPriceCode();
				},
				inString: 'Test7',
				expected: Movie.REGULAR
			},
			{
				function: () => {
					movie = new Movie('Harry Potter', Movie.NEW_RELEASE);
					return movie.getPriceCode();
				},
				inString: 'Test8',
				expected: Movie.NEW_RELEASE
			}
		]
		testCases.forEach(test => {
			it(
				`'${test.inString}', expect '${test.expected}'`,
				() => {
					const res = test.function()
					expect(res).toBe(test.expected)
				}
			)
		})
	}
)