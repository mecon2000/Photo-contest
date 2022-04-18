import home from "../../images/home.png";

function Header() {
  return (
    <header className="Header">
      
      <div className="header-content">
        <a href="/Contests">
          <img src={home} alt="Contests" width={"50px"}></img>
        </a>        
      </div>
      <hr />
    </header>
  );
}

export { Header };
