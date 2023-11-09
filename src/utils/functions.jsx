export function loadData(ref1, ref2, ref3, profIndex) {
  if (profIndex === 0) {
    ref1.current.classList.remove("hide-prof");
    ref2.current.classList.add("hide-prof");
    ref3.current.classList.add("hide-prof");

    setTimeout(() => {
      ref1.current.style.display = "flex";
      ref2.current.style.display = "none";
      ref3.current.style.display = "none";
    }, 500);
  } else if (profIndex === 1) {
    ref1.current.classList.add("hide-prof");
    ref2.current.classList.remove("hide-prof");
    ref3.current.classList.add("hide-prof");

    setTimeout(() => {
      ref1.current.style.display = "none";
      ref2.current.style.display = "flex";
      ref3.current.style.display = "none";
    }, 500);
  } else if (profIndex === 2) {
    ref1.current.classList.add("hide-prof");
    ref2.current.classList.add("hide-prof");
    ref3.current.classList.remove("hide-prof");

    setTimeout(() => {
      ref1.current.style.display = "none";
      ref2.current.style.display = "none";
      ref3.current.style.display = "flex";
    }, 500);
  }
}
