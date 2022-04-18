import github from "../../images/github.png";
import linkedInLogo from "../../images/linkedin.png";

function Footer() {
  return (
    <footer className="footer">
      <hr />
      <div className="footer-content">
        Rong
        <a href="https://github.com/mecon2000">
          <img src={github} alt="github"></img>
        </a>
        <a href="https://www.linkedin.com/in/ronnie-ganot-9065b613/">
          <img src={linkedInLogo} alt="LinkedIn"></img>
        </a>
      </div>
    </footer>
  );
}

export { Footer };
