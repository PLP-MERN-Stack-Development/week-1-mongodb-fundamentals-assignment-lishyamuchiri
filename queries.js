
//TASK 1

//finding all books in a genre
db.books.find({genre: "Fantasy"})

//Find books published after a certain year
db.books.find({ published_year: { $gt: 1851 } })

// Find books by a specific author
db.books.find({ author: "George Orwell" })

 //Update the price of a specific book
db.books.updateOne(
  { title: "The Alchemist" },
  { $set: { price: 15.99 } }
)

//Delete a book by its title
db.books.deleteOne({ title: "Moby Dick" })



//TASK2
// Find all books that are in a specific genre 
db.books.find({ genre: "Fantasy" })

// Find all books published after a certain year
db.books.find({ published_year: { $gt: 1950 } })

// Find all books by a specific author
db.books.find({ author: "George Orwell" })

// Update the price of a specific book
db.books.updateOne(
  { title: "The Alchemist" },
  { $set: { price: 12.99 } }
)
// Delete a book by its title
db.books.deleteOne({ title: "Moby Dick" })


//TASK3
//Find books that are in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 1851 } })

//Use projection (title, author, price only)
db.books.find(
  {},
  { _id: 0, title: 1, author: 1, price: 1 }
)

//Sort books by price
//Ascending order
db.books.find().sort({ price: 1 })

//Descending order
db.books.find().sort({ price: -1 })


// Pagination (limit + skip)
//Page 1 (first 5 books)
db.books.find().limit(5)

//Page 2 (next 5 books)
db.books.find().skip(5).limit(5)

//TASK4

//Average of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
])

//Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", bookCount: { $sum: 1 } } },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
])

//Group books by publication decade
db.books.aggregate([
  {
    $group: {
      _id: { $floor: { $divide: ["$published_year", 10] } },
      books: { $push: "$title" }
    }
  },
  { $sort: { _id: 1 } }
])


//TASK5

//Create an index on the title
db.books.createIndex({ title: 1 })

//Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 })

//Use explain()to show performance
db.books.find({ title: "The Alchemist" }).explain("executionStats")


