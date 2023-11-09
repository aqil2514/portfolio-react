export default function Contact({ lang }) {
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
