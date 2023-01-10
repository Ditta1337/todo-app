package database

import (
	"database/sql"
	_ "github.com/mattn/go-sqlite3"
)

// DB is the database connection (global)
var DB *sql.DB

func Connect() {
	// Open the database
	db, err := sql.Open("sqlite3", "./users.db")
	if err != nil {
		panic(err)
	}

	DB = db

	// Create the users table if it doesn't exist
	statement, err := db.Prepare("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)")
	if err != nil {
		panic(err)
	}

	// Execute the statement
	statement.Exec()
}
