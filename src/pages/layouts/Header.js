import home from "../../images/home.png";

function Header() {
  return (
    <header className="header">
      <a href="/Contests">
        <img src={home} alt="Contests" width={"50px"}></img>
      </a>
    </header>
  );
}

export { Header };
