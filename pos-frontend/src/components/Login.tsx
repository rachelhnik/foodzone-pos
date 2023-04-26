import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div>
            <Link to="location">
                <button>login</button>
            </Link>
        </div>
    );
}
