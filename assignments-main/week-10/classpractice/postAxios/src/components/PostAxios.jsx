import React, { useState } from "react";
import axios from 'axios';

const PostRequestExample = () => {
    const [formData, setFormData] = useState({ title: '', body: '' });
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        try {
            const res = await axios.post('https://jsonplaceholder.typicode.com/posts', formData);
            setResponse(res.data);
        } catch (error) {
            console.error('Error posting data', error);
        }
    };

    // Styling
    const containerStyle = {
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
    };

    const titleStyle = {
        fontSize: "24px",
        textAlign: "center",
        marginBottom: "20px",
        color: "#333",
    };

    const formStyle = {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
    };

    const inputStyle = {
        width: "100%",
        padding: "12px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "16px",
    };

    const buttonStyle = {
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        padding: "12px",
        borderRadius: "4px",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    };

    const buttonHoverStyle = {
        backgroundColor: "#0056b3",
    };

    const responseStyle = {
        marginTop: "20px",
        padding: "20px",
        backgroundColor: "#f4f4f4",
        borderRadius: "8px",
        border: "1px solid #ddd",
    };

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>Create a Post</h1>
            <form style={formStyle} onSubmit={handleSubmit}>
                <input
                    style={inputStyle}
                    type="text"
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                <textarea
                    style={{ ...inputStyle, height: "100px", resize: "none" }}
                    placeholder="Body"
                    value={formData.body}
                    onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                ></textarea>
                <button
                    type="submit"
                    style={buttonStyle}
                    onMouseOver={(e) =>
                        (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)
                    }
                    onMouseOut={(e) =>
                        (e.target.style.backgroundColor = buttonStyle.backgroundColor)
                    }
                >
                    Submit
                </button>
            </form>
            {response && (
                <div style={responseStyle}>
                    <h3>Response</h3>
                    <p>Title: {response.title}</p>
                    <p>Body: {response.body}</p>
                </div>
            )}
        </div>
    );
};

export default PostRequestExample;
