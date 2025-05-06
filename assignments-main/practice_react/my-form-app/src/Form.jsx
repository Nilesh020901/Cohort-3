import { useState } from "react";

function Form() {
    const [form, setForm] = useState({ name: "", email: "" });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Email is invalid";
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            alert("Form Submitted!");
            console.log(form);
            setForm({ name: "", email: "" }); // Reset
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "300px", margin: "auto" }}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange} 
                />
                {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            </div>

            <div>
                <label>Email:</label>
                <input 
                    type="text"
                    name="email"
                    value={form.email}
                    onChange={handleChange} 
                />
                {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            </div>

            <button type="submit">Submit</button>
        </form>
    );
}

export default Form;
