
const SortDropdown = ({ sortBy, setSortBy }) => (
    <div className="my-4">
        <label>Sort by:</label>
        <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border p-1 text-black"
        >
            <option value="all">All</option>
            <option value="price">Price</option>
            <option value="savings">Savings Percentage</option>
        </select>
    </div>
);

export default SortDropdown;
