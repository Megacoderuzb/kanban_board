import "./nav.css";

const Navbar = () => {
  return (
    <div className="nav">
      <h2>Kanban Board</h2>
      <ul>
        <li>
          <a className="text-gray-200" href="#">
            Home
          </a>
        </li>
        <li>
          <a className="text-gray-200" href="#">
            Account
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
