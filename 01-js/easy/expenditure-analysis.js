/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  const totalSpentByCategory = [];
  const map = {};
  for (const transaction of transactions) {
    if (map.hasOwnProperty(transaction.category)) {
      map[transaction.category] += transaction.price;
    } else {
      map[transaction.category] = transaction.price
    }
  }

  for (const prop in map) {
    totalSpentByCategory.push({ category: prop, totalSpent: map[prop] });
  }
  return totalSpentByCategory;
}

module.exports = calculateTotalSpentByCategory;
