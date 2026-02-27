import "./SearchBox.css";

export default function SearchBox({ value, onChange }) {
    return (
        <input
            className="searchBox"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Buscar Stark..."
        />
    );
}