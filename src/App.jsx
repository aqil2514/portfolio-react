import { useState, useEffect, useRef, useId } from "react";
import { dataNav, dataHome, dataProfSection, dataProfil } from "./Data";
import "./css/main.css";

export default function App() {
  const [lang, setLang] = useState(false);
  const [prof, setProf] = useState("");

  return (
    <>
      <Nav setLang={setLang} lang={lang} />
      <Home lang={lang} />
      <Profil lang={lang} setProf={setProf} prof={prof} />
      <Prof lang={lang} prof={prof} />
      <Contact lang={lang} prof={prof} />
    </>
  );
}

function Nav({ setLang, lang }) {
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
            {dataNav.aboutEN} <span>{dataNav.meEN}</span>
          </h3>
        ) : (
          <h3 className="title">
            {dataNav.aboutID} <span>{dataNav.meID}</span>
          </h3>
        )}
        <ul className={active ? "navigation-list nav-mobile-active" : "navigation-list"}>
          <li>
            <a className="under-active" href="#home">
              {lang ? dataNav.homeEN : dataNav.homeID}
            </a>
          </li>
          <li>
            <a href="#profile">{lang ? dataNav.profilEN : dataNav.profilID}</a>
          </li>
          <li>
            <a href="#prof">{lang ? dataNav.portfolioEN : dataNav.portfolioID}</a>
          </li>
          <li>
            <a href="#contact">{lang ? dataNav.contactEN : dataNav.contactID}</a>
          </li>
        </ul>

        <svg id="ham-menu" onClick={menuClick}>
          <line x1="10" y1="5" x2="45" y2="5" stroke="white" strokeWidth="2" />
          <line x1="10" y1="15" x2="45" y2="15" stroke="white" strokeWidth="2" />
          <line x1="10" y1="25" x2="45" y2="25" stroke="white" strokeWidth="2" />
        </svg>
      </nav>
      <div id="nav-mobile" className={active && "nav-mobile-active"}></div>
    </>
  );
}

function Home({ lang }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const homeLeft = document.getElementById("home-left-side");
    const homeRight = document.getElementById("home-right-side");

    setTimeout(() => {
      homeLeft.classList.replace("hide", "show");
      homeRight.classList.replace("hide", "show");
    }, 1000);
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
      <div id="home-left-side" className="hide">
        <p id="home-hello">{lang ? dataHome.helloEN : dataHome.helloID}</p>

        <p className="typing" id="home-intro">
          {lang ? dataHome.introEN : dataHome.introID}
        </p>
        <p id="home-quotes">{lang ? dataHome.quotesEN : dataHome.quotesID}</p>
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
          {dataHome.medsos.map((medsos) => (
            <a key={medsos.id} href={medsos.href} target="_blank">
              <img src={medsos.src} alt={medsos.name} />
            </a>
          ))}
        </div>
      </div>
      <div id="home-right-side" className="hide">
        <img id="img-home" src={dataHome.imageUrl[index]} alt="Me" />
      </div>
    </section>
  );
}

function Profil({ lang, setProf, prof }) {
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
          <p>{lang ? dataProfil.descEn : dataProfil.descId}</p>
          <p>{lang ? dataProfil.purposeEn : dataProfil.purposeId}</p>
          <p>{lang ? dataProfil.educationEn : dataProfil.educationId}</p>
          <p>{lang ? dataProfil.codingEn : dataProfil.codingId}</p>
          <p>{lang ? dataProfil.writeEn : dataProfil.writeId}</p>
          <p>{lang ? dataProfil.videoEn : dataProfil.videoId}</p>
          <p>{lang ? dataProfil.closingEn : dataProfil.closingId}</p>
        </article>
      </div>
      <Select />
    </section>
  );
}

function Prof({ lang, prof }) {
  const checkProfName = (prof) => {
    const profMap = {
      penull: "psnull",
      pinull: "psnull",
      pefe: "psfed",
      pife: "psfed",
      piwr: "pswt",
      pewr: "pswt",
      pive: "psve",
      peve: "psve",
    };

    const mappedProf = profMap[prof];
    if (mappedProf) {
      const result = dataProfSection.find((r) => mappedProf === r.id);
      return result;
    }
  };

  const profTitle = useRef(null);
  const profSub = useRef(null);

  function animation() {
    const figures = document.querySelectorAll("figure");
    const subtitles = document.querySelectorAll(".prof-container h2");
    profTitle.current.classList.add("slide-right-to-left-in");
    profSub.current.classList.add("slide-right-to-left-in");

    subtitles.forEach((subtitle) => {
      subtitle.classList.add("figures-animation1");
    });

    figures.forEach((figure) => {
      figure.classList.add("figures-animation1");
    });

    setTimeout(() => {
      profTitle.current.classList.remove("slide-right-to-left-in");
      profSub.current.classList.replace("slide-right-to-left-in", "span-animation");

      figures.forEach((figure) => {
        figure.classList.remove("figures-animation1");
      });

      subtitles.forEach((subtitle) => {
        subtitle.classList.remove("figures-animation1");
      });
    }, 1000);
  }

  useEffect(() => {
    animation();
  }, [lang, prof]);

  const [profIndex, setProfIndex] = useState(0);

  function nextHandler() {
    const maxIndex = Object.keys(checkProfName(prof).data).length;

    if (profIndex >= maxIndex - 1) {
      setProfIndex(0);
    } else {
      setProfIndex(profIndex + 1);
    }
  }

  function prevHandler() {
    const maxIndex = Object.keys(checkProfName(prof).data).length;

    if (profIndex === 0) {
      setProfIndex(maxIndex - 1);
    } else {
      setProfIndex(profIndex - 1);
    }
  }

  function handlerClick(e) {
    const contact = document.getElementById("contact");
    contact.style.display = "block";
    const contactY = contact.getBoundingClientRect().top;
    e.target.parentElement.style.opacity = 0;
    e.target.parentElement.style.visibility = "hidden";
    e.target.parentElement.style.cursor = "default";

    window.scrollTo({
      top: window.scrollY + contactY,
      behavior: "smooth",
    });
  }

  return (
    <section id="prof" style={{ display: "none" }}>
      <h1 id="title-prof" ref={profTitle}>
        {lang ? (
          <>
            This is my portfolio in <span ref={profSub}>{checkProfName(prof)?.nameEn} field</span>
          </>
        ) : (
          <>
            Ini adalah portofolio saya di bidang <span ref={profSub}>{checkProfName(prof)?.nameId}</span>
          </>
        )}
      </h1>

      <div className="prof-container">
        <span className="prof-next-container" onClick={nextHandler}>
          &raquo;{" "}
        </span>
        <span className="prof-prev-container" onClick={prevHandler}>
          &laquo;{" "}
        </span>

        {checkProfName(prof)?.id === "psfed" && <FrontEndDeveloper lang={lang} profIndex={profIndex} check={checkProfName(prof)} />}
        {checkProfName(prof)?.id === "pswt" && <WriteAndTranslation lang={lang} profIndex={profIndex} check={checkProfName(prof)} />}
        {checkProfName(prof)?.id === "psve" && <VideoEditor lang={lang} profIndex={profIndex} check={checkProfName(prof)} />}
      </div>

      <div className="ct-contact" onClick={(e) => handlerClick(e)}>
        <p>︾</p>
        <p>{lang ? "Contact Me!" : "Kontak Saya"}</p>
      </div>
    </section>
  );
}

function FrontEndDeveloper({ lang, check, profIndex }) {
  const fedLang = useRef(null);
  const fedAch = useRef(null);
  const fedCrea = useRef(null);

  useEffect(() => {
    if (profIndex === 0) {
      fedLang.current.classList.remove("hide-prof");
      fedAch.current.classList.add("hide-prof");
      fedCrea.current.classList.add("hide-prof");

      setTimeout(() => {
        fedLang.current.style.display = "flex";
        fedAch.current.style.display = "none";
        fedCrea.current.style.display = "none";
      }, 500);
    } else if (profIndex === 1) {
      fedLang.current.classList.add("hide-prof");
      fedAch.current.classList.remove("hide-prof");
      fedCrea.current.classList.add("hide-prof");

      setTimeout(() => {
        fedLang.current.style.display = "none";
        fedAch.current.style.display = "flex";
        fedCrea.current.style.display = "none";
      }, 500);
    } else if (profIndex === 2) {
      fedLang.current.classList.add("hide-prof");
      fedAch.current.classList.add("hide-prof");
      fedCrea.current.classList.remove("hide-prof");

      setTimeout(() => {
        fedLang.current.style.display = "none";
        fedAch.current.style.display = "none";
        fedCrea.current.style.display = "flex";
      }, 500);
    }
  }, [profIndex]);

  return (
    <div>
      <FEDLanguage check={check} profIndex={profIndex} lang={lang} fedLang={fedLang} />
      <FEDAchievement check={check} profIndex={profIndex} lang={lang} fedAch={fedAch} />
      <FEDCreativity check={check} profIndex={profIndex} lang={lang} fedCrea={fedCrea} />
    </div>
  );
}

function FEDLanguage({ lang, check, fedLang }) {
  return (
    <div id="fed-language-images" ref={fedLang} className="prof-content">
      <h2 id="react-language-title">{lang ? "These are languages I mastered" : "Ini bahasa yang saya kuasai"}</h2>
      {check.data.lang.map((lang) => (
        <figure id={lang.id} key={lang.id}>
          <img src={lang.imgUrl} alt={lang.langName} />
          <figcaption>{lang.langName}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function FEDAchievement({ lang, check, fedAch }) {
  function clickHandler(e) {
    const id = e.target.parentElement.id;
    const dives = document.querySelectorAll("div[class=prof-detail]");

    dives.forEach((div) => {
      const divData = div.getAttribute("datatype");

      divData === id && div.classList.add("prof-detail-active");
    });
  }

  return (
    <div id="fed-achievement-images" style={{ display: "none" }} ref={fedAch} className="prof-content content-nofilter-image">
      <h2 id="react-achievement-title">{lang ? "These are my achievements" : "Ini penghargaan saya"}</h2>
      {check.data.achievement.map((ach) => (
        <figure id={ach.id} onClick={(e) => clickHandler(e)} datatype="achievement" key={ach.id}>
          <img src={ach.imgUrl} alt={ach.achievementaName} />
          <figcaption>{ach.achievementaName}</figcaption>
        </figure>
      ))}
      {check.data.achievement.map((achDetails) => (
        <div className="prof-detail" datatype={achDetails.id} key={useId()}>
          <h2>{achDetails.achievementaName}</h2>
          <img src={achDetails.imgUrl} alt={achDetails.achievementaName} />
          <article>{lang ? achDetails.descEn : achDetails.descId}</article>
          <button onClick={(e) => e.target.parentElement.classList.remove("prof-detail-active")}>{lang ? "Close" : "Tutup"}</button>
          <a href={achDetails.link} target="_blank">
            <button>{lang ? "See More" : "Lihat"}</button>
          </a>
        </div>
      ))}
    </div>
  );
}

function FEDCreativity({ lang, check, fedCrea }) {
  function clickHandler(e) {
    const id = e.target.parentElement.id;
    const dives = document.querySelectorAll("div[class=prof-detail]");

    dives.forEach((div) => {
      const divData = div.getAttribute("datatype");

      divData === id && div.classList.add("prof-detail-active");
    });
  }

  return (
    <div id="fed-creativity-images" style={{ display: "none" }} ref={fedCrea} className="prof-content content-nofilter-image">
      <h2 id="react-creativity-title">{lang ? "These are my projects" : "Ini project saya"}</h2>
      {check.data.creativity.map((cre) => (
        <figure id={cre.id} onClick={(e) => clickHandler(e)} datatype="creativity" key={cre.id}>
          <img src={cre.imgUrl} alt={cre.projectName} />
          <figcaption>{cre.projectName}</figcaption>
        </figure>
      ))}
      {check.data.creativity.map((cd) => (
        <div className="prof-detail" datatype={cd.id} key={useId()}>
          <h2>{cd.projectName}</h2>
          <img src={cd.imgUrl} alt={cd.projectName} />
          <article>
            <ul>
              <li>
                <strong>{lang ? "Languages : " : "Bahasa : "} </strong>
                {cd.languages}
              </li>
              <li>
                <strong>{lang ? "Date : " : "Tanggal : "} </strong>
                {cd.date}
              </li>
            </ul>
            <p>{lang ? cd.descEn : cd.descId}</p>
          </article>
          <button onClick={(e) => e.target.parentElement.classList.remove("prof-detail-active")}>{lang ? "Close" : "Tutup"}</button>
          <a href={cd.projectLink} target="_blank">
            <button>{lang ? "See More" : "Lihat"}</button>
          </a>
          <a href={cd.sourceLink} target="_blank">
            <button>Source Code</button>
          </a>
        </div>
      ))}
    </div>
  );
}

function WriteAndTranslation({ lang, check, profIndex }) {
  const watSkill = useRef(null);
  const watAch = useRef(null);
  const watCrea = useRef(null);

  useEffect(() => {
    if (profIndex === 0) {
      watSkill.current.classList.remove("hide-prof");
      watAch.current.classList.add("hide-prof");
      watCrea.current.classList.add("hide-prof");

      setTimeout(() => {
        watSkill.current.style.display = "flex";
        watAch.current.style.display = "none";
        watCrea.current.style.display = "none";
      }, 500);
    } else if (profIndex === 1) {
      watSkill.current.classList.add("hide-prof");
      watAch.current.classList.remove("hide-prof");
      watCrea.current.classList.add("hide-prof");

      setTimeout(() => {
        watSkill.current.style.display = "none";
        watAch.current.style.display = "flex";
        watCrea.current.style.display = "none";
      }, 500);
    } else if (profIndex === 2) {
      watSkill.current.classList.add("hide-prof");
      watAch.current.classList.add("hide-prof");
      watCrea.current.classList.remove("hide-prof");

      setTimeout(() => {
        watSkill.current.style.display = "none";
        watAch.current.style.display = "none";
        watCrea.current.style.display = "flex";
      }, 500);
    }
  }, [profIndex]);

  return (
    <div>
      <WATSkill check={check} profIndex={profIndex} lang={lang} watSkill={watSkill} />
      <WATAchievement check={check} profIndex={profIndex} lang={lang} watAch={watAch} />
      <WATCreativity check={check} profIndex={profIndex} lang={lang} watCrea={watCrea} />
    </div>
  );
}

function WATSkill({ lang, check, watSkill }) {
  return (
    <div id="wat-skill-images" ref={watSkill} className="prof-content">
      <h2 id="wat-skill-title">{lang ? "These are things I mastered" : "Ini hal yang saya kuasai"}</h2>
      {check.data.skill.map((s) => (
        <figure id={s.id} key={s.id}>
          <img src={s.imgUrl} alt={s.skillName} />
          <figcaption>{s.skillName}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function WATAchievement({ lang, check, watAch }) {
  function clickHandler(e) {
    const id = e.target.parentElement.id;
    const dives = document.querySelectorAll("div[class=prof-detail]");

    dives.forEach((div) => {
      const divData = div.getAttribute("datatype");

      divData === id && div.classList.add("prof-detail-active");
    });
  }

  return (
    <div id="fed-achievement-images" style={{ display: "none" }} ref={watAch} className="prof-content content-nofilter-image">
      <h2 id="react-achievement-title">{lang ? "These are my achievements" : "Ini penghargaan saya"}</h2>
      {check.data.achievement.map((ach) => (
        <figure id={ach.id} onClick={(e) => clickHandler(e)} datatype="achievement" key={ach.id}>
          <img src={ach.imgUrl} alt={lang ? ach.aNameEN : ach.aNameID} />
          <figcaption>{lang ? ach.figcaptionEN : ach.figcaptionID}</figcaption>
        </figure>
      ))}
      {check.data.achievement.map((achDetails) => (
        <div className="prof-detail" datatype={achDetails.id} key={useId()}>
          <h2>{lang ? achDetails.aNameEN : achDetails.aNameID}</h2>
          <img src={achDetails.imgUrl} alt={lang ? achDetails.aNameEN : achDetails.aNameID} />
          <article>{lang ? achDetails.descEn : achDetails.descId}</article>
          <button onClick={(e) => e.target.parentElement.classList.remove("prof-detail-active")}>{lang ? "Close" : "Tutup"}</button>
        </div>
      ))}
    </div>
  );
}

function WATCreativity({ lang, check, watCrea }) {
  function clickHandler(e) {
    const id = e.target.parentElement.id;
    const dives = document.querySelectorAll("div[class=prof-detail]");

    dives.forEach((div) => {
      const divData = div.getAttribute("datatype");

      divData === id && div.classList.add("prof-detail-active");
    });
  }

  return (
    <div id="fed-creativity-images" style={{ display: "none" }} ref={watCrea} className="prof-content content-nofilter-image">
      <h2 id="react-creativity-title">{lang ? "These are my projects" : "Ini project saya"}</h2>
      {check.data.creativity.map((cre) => (
        <figure id={cre.id} onClick={(e) => clickHandler(e)} datatype="creativity" key={cre.id}>
          <img src={cre.imgUrl} alt={cre.projectName} />
          <figcaption>{lang ? cre.figcaptionEN : cre.figcaptionID}</figcaption>
        </figure>
      ))}
      {check.data.creativity.map((cd) => (
        <div className="prof-detail" datatype={cd.id} key={useId()}>
          <h2>{lang ? cd.pNameEN : cd.pNameID}</h2>
          <img src={cd.imgUrl} alt={lang ? cd.pNameEN : cd.pNameID} />
          <article>
            <ul>
              <li>
                <strong>{lang ? "Languages : " : "Bahasa : "} </strong>
                {cd.languages}
              </li>
              <li>
                <strong>{lang ? "Date : " : "Tanggal : "} </strong>
                {cd.date}
              </li>
            </ul>
            <p>{lang ? cd.descEn : cd.descId}</p>
          </article>
          <button onClick={(e) => e.target.parentElement.classList.remove("prof-detail-active")}>{lang ? "Close" : "Tutup"}</button>
          <a href={cd.projectLink} target="_blank">
            <button>{lang ? "See More" : "Lihat"}</button>
          </a>
        </div>
      ))}
    </div>
  );
}

function VideoEditor({ lang, check, profIndex }) {
  const veSkill = useRef(null);
  const veAch = useRef(null);
  const veCrea = useRef(null);

  useEffect(() => {
    if (profIndex === 0) {
      veSkill.current.classList.remove("hide-prof");
      veAch.current.classList.add("hide-prof");
      veCrea.current.classList.add("hide-prof");

      setTimeout(() => {
        veSkill.current.style.display = "flex";
        veAch.current.style.display = "none";
        veCrea.current.style.display = "none";
      }, 500);
    } else if (profIndex === 1) {
      veSkill.current.classList.add("hide-prof");
      veAch.current.classList.remove("hide-prof");
      veCrea.current.classList.add("hide-prof");

      setTimeout(() => {
        veSkill.current.style.display = "none";
        veAch.current.style.display = "flex";
        veCrea.current.style.display = "none";
      }, 500);
    } else if (profIndex === 2) {
      veSkill.current.classList.add("hide-prof");
      veAch.current.classList.add("hide-prof");
      veCrea.current.classList.remove("hide-prof");

      setTimeout(() => {
        veSkill.current.style.display = "none";
        veAch.current.style.display = "none";
        veCrea.current.style.display = "flex";
      }, 500);
    }
  }, [profIndex]);

  return (
    <div>
      <VESkill check={check} profIndex={profIndex} lang={lang} veSkill={veSkill} />
      <VEAchievement check={check} profIndex={profIndex} lang={lang} veAch={veAch} />
      <VECreativity check={check} profIndex={profIndex} lang={lang} veCrea={veCrea} />
    </div>
  );
}

function VESkill({ lang, check, veSkill }) {
  return (
    <div id="ve-skill-images" ref={veSkill} className="prof-content">
      <h2 id="ve-skill-title">{lang ? "These are things I mastered" : "Ini hal yang saya kuasai"}</h2>
      {check.data.skill.map((s) => (
        <figure id={s.id} key={s.id}>
          <img src={s.imgUrl} alt={s.skillName} />
          <figcaption>{s.skillName}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function VEAchievement({ lang, check, veAch }) {
  function clickHandler(e) {
    const id = e.target.parentElement.id;
    const dives = document.querySelectorAll("div[class=prof-detail]");

    dives.forEach((div) => {
      const divData = div.getAttribute("datatype");

      divData === id && div.classList.add("prof-detail-active");
    });
  }

  return (
    <div id="fed-achievement-images" style={{ display: "none" }} ref={veAch} className="prof-content content-nofilter-image">
      <h2 id="react-achievement-title">{lang ? "These are my achievements" : "Ini penghargaan saya"}</h2>

      {check.data.achievement.length !== 0 ? (
        check.data.achievement.map((ach) => (
          <figure id={ach.id} onClick={(e) => clickHandler(e)} datatype="achievement" key={ach.id}>
            <img src={ach.imgUrl} alt={lang ? ach.aNameEN : ach.aNameID} />
            <figcaption>{lang ? ach.figcaptionEN : ach.figcaptionID}</figcaption>
          </figure>
        ))
      ) : lang ? (
        <h3>Not yet.</h3>
      ) : (
        <h3>Belum Ada</h3>
      )}
      {check.data.achievement.map((achDetails) => (
        <div className="prof-detail" datatype={achDetails.id} key={useId()}>
          <h2>{lang ? achDetails.aNameEN : achDetails.aNameID}</h2>
          <img src={achDetails.imgUrl} alt={lang ? achDetails.aNameEN : achDetails.aNameID} />
          <article>{lang ? achDetails.descEn : achDetails.descId}</article>
          <button onClick={(e) => e.target.parentElement.classList.remove("prof-detail-active")}>{lang ? "Close" : "Tutup"}</button>
        </div>
      ))}
    </div>
  );
}

function VECreativity({ lang, check, veCrea }) {
  function clickHandler(e) {
    const id = e.target.parentElement.id;
    const dives = document.querySelectorAll("div[class=prof-detail]");

    dives.forEach((div) => {
      const divData = div.getAttribute("datatype");

      divData === id && div.classList.add("prof-detail-active");
    });
  }

  return (
    <div id="fed-creativity-images" style={{ display: "none" }} ref={veCrea} className="prof-content content-nofilter-image">
      <h2 id="react-creativity-title">{lang ? "These are my projects" : "Ini project saya"}</h2>
      {check.data.creativity.map((cre) => (
        <figure id={cre.id} onClick={(e) => clickHandler(e)} datatype="creativity" key={cre.id}>
          <img src={cre.imgUrl} alt={cre.projectName} />
          <figcaption>{lang ? cre.figcaptionEN : cre.figcaptionID}</figcaption>
        </figure>
      ))}
      {check.data.creativity.map((cd) => (
        <div className="prof-detail" datatype={cd.id} key={useId()}>
          <h2>{lang ? cd.pNameEN : cd.pNameID}</h2>
          <img src={cd.imgUrl} alt={lang ? cd.pNameEN : cd.pNameID} />
          <article>
            <ul>
              <li>
                <strong>{lang ? "Languages : " : "Bahasa : "} </strong>
                {cd.languages}
              </li>
              <li>
                <strong>{lang ? "Date : " : "Tanggal : "} </strong>
                {cd.date}
              </li>
            </ul>
            <p>{lang ? cd.descEn : cd.descId}</p>
          </article>
          <button onClick={(e) => e.target.parentElement.classList.remove("prof-detail-active")}>{lang ? "Close" : "Tutup"}</button>
          <a href={cd.projectLink} target="_blank">
            <button>{lang ? "See More" : "Lihat"}</button>
          </a>
        </div>
      ))}
    </div>
  );
}

function Contact({ lang }) {
  return (
    <section id="contact" style={{ display: "none" }}>
      <h1>{lang ? "Contact Me" : "Kontak Saya"}</h1>
      <form id="contact-form" action="https://formspree.io/f/xyyqvjey" method="POST">
        <h2>{lang ? "This message will be sent to my email, muhamadaqil383@gmail.com" : "Pesan ini akan terkirim ke email saya, muhamadaqil383@gmail.com"}</h2>
        <label htmlFor={lang ? "input-name-en" : "input-name-id"}>
          {lang ? "Your Name" : "Nama Anda"} :
          <input id={lang ? "input-name-en" : "input-name-id"} type="text" name="name" placeholder={lang ? "Your Name" : "Nama Anda"} required />
        </label>
        <label htmlFor={lang ? "input-email-en" : "input-email-id"}>
          {lang ? "Your Email" : "Email Anda"} :
          <input id={lang ? "input-email-en" : "input-email-id"} type="email" name="email" placeholder={lang ? "Your Email" : "Email Anda"} required />
        </label>
        <label htmlFor={lang ? "input-message-en" : "input-message-id"}>
          {lang ? "Your Message" : "Pesan Anda"} :<textarea id={lang ? "input-message-en" : "input-message-id"} name="message" placeholder={lang ? "Your Message" : "Pesan Anda"} required></textarea>
        </label>
        <button type="submit">{lang ? "Send" : "Kirim"}</button>
      </form>
    </section>
  );
}
