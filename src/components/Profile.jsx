import { useEffect } from "react";
import { dataProfil as data } from "../data/Profile";
import { dataHome } from "../data/Home";

export default function Profil({ lang, setProf, prof }) {
  useEffect(() => {
    const selectorSpan = document.querySelectorAll(".salam span");

    let i = 0;
    setInterval(() => {
      selectorSpan.forEach((span) => {
        span.classList.add("opacity-salam");
      });

      selectorSpan[i].classList.remove("opacity-salam");
      i++;
      if (i === selectorSpan.length) {
        i = 0;
      }
    }, 100);
  }, [lang, prof]);

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

  return (
    <section id="profile" style={{ display: "none" }}>
      <h1>{lang ? "My Profile" : "Profile Saya"}</h1>
      <div id="container-greetings">
        <span className="animation-border-greetings"></span>
        <span className="animation-border-greetings"></span>
        <span className="animation-border-greetings"></span>
        <span className="animation-border-greetings"></span>
        <span className="animation-border-greetings"></span>
        <span className="animation-border-greetings"></span>
        <span className="animation-border-greetings"></span>
        <span className="animation-border-greetings"></span>
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
      <Select />
    </section>
  );
}
