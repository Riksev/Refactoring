class Movie {
  static CHILDRENS = 2;
  static REGULAR = 0;
  static NEW_RELEASE = 1;

  constructor(title, priceCode) {
    this._title = title;
    this._priceCode = priceCode;
  }

  getPriceCode() {
    return this._priceCode;
  }

  getTitle() {
    return this._title;
  }

	setPriceCode(arg) {
		this._priceCode = arg;
	}
}

class Rental {
  constructor(movie, daysRented) {
    this._movie = movie;
    this._daysRented = daysRented;
  }

  getDaysRented() {
    return this._daysRented;
  }

  getMovie() {
    return this._movie;
  }
}

class Customer {
  constructor(name) {
    this._name = name;
    this._rentals = [];
  }

  addRental(arg) {
    this._rentals.push(arg);
  }

  getName() {
    return this._name;
  }

  statement() {
    let totalAmount = 0;
    let frequentRenterPoints = 0;
    let result = "Rental Record for " + this.getName() + "\n";
    for (let i = 0; i < this._rentals.length; i++) {
      let thisAmount = 0;
      const each = this._rentals[i];
      switch (each.getMovie().getPriceCode()) {
        case Movie.REGULAR:
          thisAmount += 2;
          if (each.getDaysRented() > 2)
            thisAmount += (each.getDaysRented() - 2) * 1.5;
          break;
        case Movie.NEW_RELEASE:
          thisAmount += each.getDaysRented() * 3;
          break;
        case Movie.CHILDRENS:
          thisAmount += 1.5;
          if (each.getDaysRented() > 3)
            thisAmount += (each.getDaysRented() - 3) * 1.5;
          break;
      }
      frequentRenterPoints++;
      if (
        each.getMovie().getPriceCode() === Movie.NEW_RELEASE &&
        each.getDaysRented() > 1
      )
        frequentRenterPoints++;
      result +=
        "\t" +
        each.getMovie().getTitle() +
        "\t" +
        thisAmount +
        "\n";
      totalAmount += thisAmount;
    }
    result += "Amount owed is " + totalAmount + "\n";
    result +=
      "You earned " +
      frequentRenterPoints +
      " frequent renter points";
    return result;
  }
}

module.exports = {
	Movie,
	Rental,
	Customer
};