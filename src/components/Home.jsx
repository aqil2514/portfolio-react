import { useState, useEffect } from "react";
import { dataHome as data } from "../data/Home";

export default function Home({ lang }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const homeLeft = document.getElementById("home-left-side");
    const homeRight = document.getElementById("home-right-side");

    homeLeft.classList.add("left-slide-in");
    homeRight.classList.add("right-slide-in");

    setTimeout(() => {
      homeLeft.classList.remove("left-slide-in");
      homeRight.classList.remove("right-slide-in");
    }, 1100);
  }, [lang]);

  function handlerClick() {
    const profil = document.getElementById("profile");
    profil.style.display = "block";
    const profilY = profil.getBoundingClientRect().top;

    window.scrollTo({
      top: window.scrollY + profilY,
      behavior: "smooth",
    });
  }

  return (
    <section id="home">
      <div id="home-left-side">
        <p id="home-hello">{lang ? data.helloEN : data.helloID}</p>

        <p className="typing" id="home-intro">
          {lang ? data.introEN : data.introID}
        </p>
        <p id="home-quotes">{lang ? data.quotesEN : data.quotesID}</p>
        <div className="home-button-container">
          <button onClick={handlerClick} className="button home-button">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            {lang ? "Get Started!" : "Lihat Profil!"}
          </button>
        </div>
        <div id="home-sosmed" className="show">
          {data.medsos.map((medsos) => (
            <a key={medsos.id} href={medsos.href} target="_blank">
              <img src={medsos.src} alt={medsos.name} />
            </a>
          ))}
        </div>
      </div>
      <div id="home-right-side">
        <img id="img-home" src={data.imageUrl[index]} alt="Me" />
      </div>
    </section>
  );
}
