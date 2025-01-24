const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const port = 3000;
const SecretKey = "User";

app.use(bodyParser.json());
app.use(express.static("public"));

let users = [];

// Serve the HTML file
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});

// Signup route
app.post("/signup", (req, res) => {
	try {
		const { username, password } = req.body;

		// Check if user already exists
		if (users.find((user) => user.username === username)) {
			return res.status(400).json({ message: "User already exists" });
		}

		// Add the user
		users.push({ username, password });
		res.status(201).json({ message: "You are signed up!" });
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
});

// Signin route
app.post("/signin", (req, res) => {
	try {
		const { username, password } = req.body;

		// Check if the user exists and password matches
		const user = users.find((user) => user.username === username && user.password === password);
		if (!user) {
			return res.status(400).json({ message: "Invalid Credentials" });
		}

		// Generate token
		const payload = { username };
		const token = jwt.sign(payload, SecretKey, { expiresIn: "1h" });

		res.json({ token });
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
});

// Get user details route
app.get("/me", (req, res) => {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({ message: "No token provided!" });
	}

	try {
		// Verify token
		const decoded = jwt.verify(token, SecretKey);
		const user = users.find((u) => u.username === decoded.username);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.status(200).json({ username: user.username });
	} catch (error) {
		res.status(400).json({ message: "Invalid token!" });
	}
});

// Start the server
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
