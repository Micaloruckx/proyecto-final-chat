import React from "react";
import "./SearchBox.css";
import PropTypes from "prop-types";

export default function SearchBox({ value, onChange }) {
    return (
        <input
            className="searchBox"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Buscar contacto..."
        />
    );
}

SearchBox.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};