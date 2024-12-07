import "./nav.css";

const Navbar = () => {
  return (
    <div className="nav">
      <h2>Kanban Board</h2>
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Account</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
