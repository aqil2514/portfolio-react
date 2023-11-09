import { useState } from "react";
import "./css/main.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Profil from "./components/Profile";
import Contact from "./components/Contact";
import Profession from "./components/Profession";

export default function App() {
  const [lang, setLang] = useState(false);
  const [prof, setProf] = useState("");

  return (
    <>
      <Nav setLang={setLang} lang={lang} />
      <Home lang={lang} />
      <Profil lang={lang} setProf={setProf} prof={prof} />
      <Profession lang={lang} prof={prof} />
      <Contact lang={lang} prof={prof} />
    </>
  );
}
