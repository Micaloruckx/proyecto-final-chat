import React from "react";
import "./SearchBox.css";
import PropTypes from "prop-types";

export default function SearchBox({ value, onChange }) {
    return (
        <div className="searchBoxWrap">
            <input
                className="searchBox"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Buscar contacto..."
            />
            {value ? (
                <button
                    type="button"
                    className="searchClearBtn"
                    onClick={() => onChange("")}
                    aria-label="Limpiar búsqueda"
                >
                    ×
                </button>
            ) : null}
        </div>
    );
}

SearchBox.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};