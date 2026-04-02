function Menu({ menu = [], selectedId, setMenuSelected }) {
  return (
    <ul className="menu-grid">
      {menu.map((item) => (
        <li key={item.id}>
          <button
            className={`menu-chip ${selectedId === item.id ? "is-active" : ""}`}
            onClick={() => setMenuSelected(item)}
            type="button"
          >
            <span className="menu-chip-title">{item.name}</span>
            <span className="menu-chip-copy">{item.eyebrow}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Menu;
