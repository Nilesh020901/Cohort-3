import React from "react";

function FaqItem({ question, answer, isOpen, onClick }) {
    return (
        <div style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}>
            <h3
                onClick={onClick}
                style={{ cursor: "pointer", margin: "0", color: "#333" }}
            >
                {question}
            </h3>
            {isOpen && <p style={{ marginTop: "8px", color: "#555" }}>{answer}</p>}
        </div>
    )
}

export default FaqItem;