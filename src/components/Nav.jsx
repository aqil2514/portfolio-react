import { useState } from "react";
import { dataNav as data } from "../data/Nav";

export default function Nav({ setLang, lang }) {
  const [active, setActive] = useState(false);

  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY || window.pageYOffset;
    const home = document.getElementById("home").offsetTop;
    const profile = document.getElementById("profile").offsetTop + 50;
    const portfolio = document.getElementById("prof").offsetTop + 50;
    const contact = document.getElementById("contact").offsetTop + 50;
    const navLinks = document.querySelectorAll("#navigation a");

    if (scrollPosition <= home) {
      updateNav(navLinks, 0);
    } else if (scrollPosition < profile) {
      updateNav(navLinks, 1);
    } else if (scrollPosition < portfolio) {
      updateNav(navLinks, 2);
    } else if (scrollPosition < contact) {
      updateNav(navLinks, 3);
    }
  });

  function updateNav(navLinks, activeIndex) {
    navLinks.forEach((link, index) => {
      if (index === activeIndex) {
        link.classList.add("under-active");
      } else {
        link.classList.remove("under-active");
      }
    });
  }

  function handlerClick(e) {
    e.target.classList.contains("toggle-lang") ? e.target.classList.remove("toggle-lang") : e.target.classList.add("toggle-lang");
  }

  function menuClick() {
    setActive(!active);
  }

  return (
    <>
      <nav id="navigation" className="navigation">
        <label htmlFor="lang-setting">
          {lang ? <p onClick={(e) => handlerClick(e)}>ID</p> : <p onClick={(e) => handlerClick(e)}>EN</p>}
          <input type="checkbox" onChange={() => setLang(!lang)} name="lang-setting" id="lang-setting" />
        </label>

        {lang ? (
          <h3 className="title">
            {data.aboutEN} <span>{data.meEN}</span>
          </h3>
        ) : (
          <h3 className="title">
            {data.aboutID} <span>{data.meID}</span>
          </h3>
        )}
        <ul className={Boolean(active) ? "navigation-list nav-mobile-active" : "navigation-list"}>
          <li>
            <a className="under-active" href="#home">
              {lang ? data.homeEN : data.homeID}
            </a>
          </li>
          <li>
            <a href="#profile">{lang ? data.profilEN : data.profilID}</a>
          </li>
          <li>
            <a href="#prof">{lang ? data.portfolioEN : data.portfolioID}</a>
          </li>
          <li>
            <a href="#contact">{lang ? data.contactEN : data.contactID}</a>
          </li>
        </ul>

        <svg id="ham-menu" onClick={menuClick}>
          <line x1="10" y1="5" x2="45" y2="5" stroke="white" strokeWidth="2" />
          <line x1="10" y1="15" x2="45" y2="15" stroke="white" strokeWidth="2" />
          <line x1="10" y1="25" x2="45" y2="25" stroke="white" strokeWidth="2" />
        </svg>
      </nav>
      <div id="nav-mobile" className={Boolean(active) ? "nav-mobile-active" : ""}></div>
    </>
  );
}
