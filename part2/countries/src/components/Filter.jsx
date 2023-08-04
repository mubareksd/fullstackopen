const Filter = ({ filter, handleFilterChange }) => (
  <div className="Filter">
    find countries <input value={filter} onChange={handleFilterChange} />
  </div>
);

export default Filter;
