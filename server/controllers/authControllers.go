package controllers

import (
	"encoding/json"
	"example.com/m/database"
	"example.com/m/models"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"strconv"
	"time"
)

// Secret Key used to sign the token
const SecretKey = "secretsecret"

// Register a new user
func Register(w http.ResponseWriter, r *http.Request) {
	// Allows the client to access the response 
	w.Header().Set("Access-Control-Allow-Origin", "*")
	

	// Decode the request body into a map
	var data map[string]string
	if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// Close the request body
	defer r.Body.Close()

	// Connect to the database
	database.Connect()

	// Close the database connection
	defer database.DB.Close()

	// Hash the password
	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)

	// Create a new user
	user := models.User{
		Username: data["username"],
		Password: password,
	}

	// Insert the user into the database
	statement, err := database.DB.Prepare("INSERT INTO users (username, password) VALUES (?, ?)")
	if err != nil {
		panic(err)
	}

	// Execute the statement
	_, err = statement.Exec(user.Username, user.Password)
	if err != nil {
		panic(err)
	}

	// Encode the user as JSON and send it to the client
	json.NewEncoder(w).Encode(user)
}

// Login a user
func Login(w http.ResponseWriter, r *http.Request) {
	// Decode the request body into a map
	var data map[string]string
	if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// Close the request body
	defer r.Body.Close()

	// Connect to the database
	database.Connect()

	// Close the database connection
	defer database.DB.Close()

	// Get the user from the database
	var user models.User
	database.DB.QueryRow("SELECT id, username, password FROM users WHERE username = ?", data["username"]).Scan(&user.Id, &user.Username, &user.Password)

	// Compare the password
	err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"]))
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	// Create a new JWT token
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.RegisteredClaims{
		// Set the token subject to the user ID
		Issuer: strconv.Itoa(int(user.Id)),
		// Set the token expiration time
		ExpiresAt: jwt.NewNumericDate(time.Unix(time.Now().Unix()+3600, 0)),
	})

	// Sign the token
	token, err := claims.SignedString([]byte(SecretKey))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Create a new cookie
	cookie := http.Cookie{
		Name:  "token",
		Value: token,
		// Set the cookie expiration time to one day
		Expires: time.Now().Add(time.Hour * 24),
		// Set the cookie to be accessible only through HTTP (HTTP only cookies)
		HttpOnly: true,
	}

	// Send the cookie to the client
	http.SetCookie(w, &cookie)

	// Send a response to the client
	json.NewEncoder(w).Encode("Logged in successfully")
}

// Return the user data
func User(w http.ResponseWriter, r *http.Request) {
	// Get the cookie from the request
	cookie, err := r.Cookie("token")
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	// Parse the cookie
	token, err := jwt.ParseWithClaims(cookie.Value, &jwt.RegisteredClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	// Get the claims
	claims, ok := token.Claims.(*jwt.RegisteredClaims)
	if !ok {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	// Connect to the database
	database.Connect()

	// Close the database connection
	defer database.DB.Close()

	// Get the user with claims.Issuer as the ID
	var user models.User
	database.DB.QueryRow("SELECT id, username, password FROM users WHERE id = ?", claims.Issuer).Scan(&user.Id, &user.Username, &user.Password)

	// Send the user data to the client
	json.NewEncoder(w).Encode(user)
}

// Logout the user
func Logout(w http.ResponseWriter, r *http.Request) {
	// Create a new cookie with an empty value and an expiration time of one hour ago (the cookie with the token will be deleted)
	cookie := http.Cookie{
		Name:     "token",
		Value:    "",
		Expires:  time.Now().Add(time.Hour * -1),
		HttpOnly: true,
	}

	// Send the cookie to the client
	http.SetCookie(w, &cookie)

	// Send a response to the client
	json.NewEncoder(w).Encode("Logged out successfully")
}
