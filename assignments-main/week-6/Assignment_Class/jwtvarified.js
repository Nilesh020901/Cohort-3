const jwt require("jsonwebtoken");
const jwtPassword = "secret";
const zod require("zod");

const emailSchema zod.string().email();
const passwordSchema zod.string().min(5);
function signjwt(username, password) {
	try {
		emailSchema.parse(username);
		passwordSchema.parse(password);
	}
	catch (err) {
		console.error("Validation error", error);
		return null;
	}
	const signature jwt.sign({username}, jwtPassword);
	return signature;
}
const ans signjwt("feijf@example.com", "dsto123");
console.log(ans);