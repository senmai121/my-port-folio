import React from 'react';

// สร้างฟังก์ชัน Button Component
const Button = ({ label, onClick }) => {
    return (
        <button className="my-button" onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;