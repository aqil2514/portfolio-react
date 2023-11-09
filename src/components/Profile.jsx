import { useEffect, useRef } from "react";
import { dataProfil as data } from "../data/Profile";
import { dataHome } from "../data/Home";
import { useState } from "react";

export default function Profil({ lang, setProf, prof }) {
  const [active, setActive] = useState(false);
  const bookIcon = useRef(null);
  const title = useRef(null);

  useEffect(() => {
    const salam = document.querySelector(".salam");
    const article = document.querySelector("article");
    const h1 = title.current;

    salam.classList.add("figures-animation1");
    h1.classList.add("left-slide-in");
    article.classList.add("bottom-slide-in");

    setTimeout(() => {
      salam.classList.remove("figures-animation1");
      h1.classList.remove("left-slide-in");
      article.classList.remove("bottom-slide-in");
    }, 2000);

    console.log(salam, h1, article);
  }, [lang, active]);

  function changeHandler(e) {
    const profSection = document.getElementById("prof");
    profSection.style.display = "block";
    const profSectionY = profSection.getBoundingClientRect().top;

    setProf(e.target.value);

    window.scrollTo({
      top: window.scrollY + profSectionY,
      behavior: "smooth",
    });
  }

  function Select() {
    return (
      <label id="home-select-container" htmlFor="home-select-prof">
        <select name="home-select-prof" value={prof} onChange={(e) => changeHandler(e)} id="home-select-prof">
          {lang
            ? dataHome.profEN.map((dh) => (
                <option key={dh.id} value={dh.id}>
                  {dh.profName}
                </option>
              ))
            : dataHome.profID.map((dh) => (
                <option key={dh.id} value={dh.id}>
                  {dh.profName}
                </option>
              ))}
        </select>
      </label>
    );
  }

  function buttonHandler() {
    const icon = bookIcon.current;
    const button = icon.parentElement;
    const text = button.lastChild;
    const spans = document.querySelectorAll("#container-greetings > span");

    setActive(!active);

    if (icon.classList.contains("bi-book")) {
      icon.classList.replace("bi-book", "bi-book-fill");
      button.classList.add("read-mode-button-click");
      text.innerText = lang ? "Off Mode" : "Matikan Mode";

      for (const span of spans) {
        span.classList.remove("animation-border-greetings");
      }
    } else {
      icon.classList.replace("bi-book-fill", "bi-book");
      button.classList.remove("read-mode-button-click");
      text.innerText = lang ? "Read Mode" : "Mode Baca";

      for (const span of spans) {
        span.classList.add("animation-border-greetings");
      }
    }
  }

  return (
    <section id="profile" style={{ display: "none" }}>
      <h1 ref={title}>{lang ? "My Profile" : "Profile Saya"}</h1>
      <div id="container-greetings">
        <Animations />
        <article>
          <Salam />
          <p>{lang ? data.descEn : data.descId}</p>
          <p>{lang ? data.purposeEn : data.purposeId}</p>
          <p>{lang ? data.educationEn : data.educationId}</p>
          <p>{lang ? data.codingEn : data.codingId}</p>
          <p>{lang ? data.writeEn : data.writeId}</p>
          <p>{lang ? data.videoEn : data.videoId}</p>
          <p>{lang ? data.closingEn : data.closingId}</p>
        </article>
      </div>
      <div id="read-mode">
        <button onClick={buttonHandler}>
          <i ref={bookIcon} className="bi bi-book"></i> <p>{lang ? "Read Mode" : "Mode Baca"}</p>
        </button>
      </div>
      <Select />
    </section>
  );
}

function Animations() {
  return (
    <>
      <span className="animation-border-greetings"></span>
      <span className="animation-border-greetings"></span>
      <span className="animation-border-greetings"></span>
      <span className="animation-border-greetings"></span>
      <span className="animation-border-greetings"></span>
      <span className="animation-border-greetings"></span>
      <span className="animation-border-greetings"></span>
      <span className="animation-border-greetings"></span>
    </>
  );
}

function Salam() {
  const salam = "Assalamu`alaikum Wr. Wb.";
  const splitSalam = salam.split("");
  let key = 0;
  const spanSalam = splitSalam.map((item) => <span key={key++}>{item}</span>);

  return (
    <h2 className="salam" onClick={() => console.log(splitSalam)}>
      {spanSalam}
    </h2>
  );
}
