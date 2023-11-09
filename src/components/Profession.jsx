import { useRef, useState, useEffect, useId } from "react";
import { dataProfSection as data } from "../data/Profession";

export default function Prof({ lang, prof }) {
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
      const result = data.find((r) => mappedProf === r.id);
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
          <figcaption>{ach.figcaption}</figcaption>
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
