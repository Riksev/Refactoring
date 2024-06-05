'use strict';

class Movie {
  static CHILDRENS = 2;
  static REGULAR = 0;
  static NEW_RELEASE = 1;

	#title;
	#price;

  constructor(title, priceCode) {
    this.#title = title;
    this.setPriceCode(priceCode);
  }

  getTitle() {
    return this.#title;
  }

	getPriceCode() {
		return this.#price.getPriceCode();
	}

	getCharge(daysRented) {
		return this.#price.getCharge(daysRented);
	}

	getFrequentRenterPoints(daysRented) {
		return this.#price.getFrequentRenterPoints(daysRented);
	}

	setPriceCode(arg) {
		switch(arg) {
			case Movie.REGULAR:
				this.#price = new RegularPrice();
				break;
			case Movie.CHILDRENS:
				this.#price = new ChildrensPrice();
				break;
			case Movie.NEW_RELEASE:
				this.#price = new NewReleasePrice();
				break;
			default:
				throw new ReferenceError("Incorrect Price Code");
		}
	}
}

class Price {
	getPriceCode() {}

	getCharge(daysRented) {}

	getFrequentRenterPoints(daysRented) {
		return 1;
	}
}

class ChildrensPrice extends Price {
	getPriceCode() {
		return Movie.CHILDRENS;
	}

	getCharge(daysRented) {
		let charge = 1.5;
		if (daysRented > 3) {
			charge += (daysRented - 3) * 1.5;
		}
		return charge;
	}
}

class NewReleasePrice extends Price {
	getPriceCode() {
		return Movie.NEW_RELEASE;
	}

	getCharge(daysRented) {
		return daysRented * 3;
	}

	getFrequentRenterPoints(daysRented) {
		return (daysRented > 1) ? 2 : 1;
	}
}

class RegularPrice extends Price {
	getPriceCode() {
		return Movie.REGULAR;
	}

	getCharge(daysRented) {
		let charge = 2;
		if (daysRented > 2) {
			charge += (daysRented- 2) * 1.5;
		}
		return charge;
	}
}

class Rental {
	#movie;
	#daysRented;

  constructor(movie, daysRented) {
    this.#movie = movie;
    this.#daysRented = daysRented;
  }s

  getMovie() {
    return this.#movie;
  }

	getFrequentRenterPoints() {
		return this.#movie.getFrequentRenterPoints(this.#daysRented);
	}

	getCharge() {
		return this.#movie.getCharge(this.#daysRented);
	}
}

class Customer {
	#name;
	#rentals;

  constructor(name) {
    this.#name = name;
    this.#rentals = [];
  }

  addRental(arg) {
    this.#rentals.push(arg);
  }

  getName() {
    return this.#name;
  }

	// Collects and calculates all data across customer library
  statement() {
    let record = "Rental Record for " + this.getName() + "\n";
		this.#rentals.forEach(aRental => {
			record +=
			"\t" +
			aRental.getMovie().getTitle() +
			"\t" +
			aRental.getCharge() +
			"\n";
		});
    record += "Amount owed is " + this.getTotalCharge() + "\n";
    record +=
      "You earned " +
      this.getTotalFrequentRenterPoints() +
      " frequent renter points";
    return record;
  }

	getTotalCharge() {
		let charge = 0;
		this.#rentals.forEach(aRental => {
			charge += aRental.getCharge();
		});
		return charge;
	}

	getTotalFrequentRenterPoints() {
		let points = 0;
		this.#rentals.forEach(aRental => {
			points += aRental.getFrequentRenterPoints();
		});
		return points;
	}
}

module.exports = {
	Movie,
	Rental,
	Customer
};