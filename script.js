const emailUser = "anthonykwawu";
const emailHost = "gmail.com";
const emailAddress = `${emailUser}@${emailHost}`;
const whatsappUrl = "https://wa.me/447300357929";

const emailLink = document.getElementById("email-link");
const footerEmailLink = document.getElementById("footer-email-link");
const whatsappLink = document.getElementById("whatsapp-link");
const contactForm = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");

function wireEmailLink(link) {
  if (!link) return;
  link.href = `mailto:${emailAddress}`;
  link.setAttribute("aria-label", "Email Anthony Kwawu");
}

wireEmailLink(emailLink);
wireEmailLink(footerEmailLink);

if (whatsappLink) {
  whatsappLink.href = whatsappUrl;
  whatsappLink.setAttribute("aria-label", "Open WhatsApp chat");
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      statusEl.textContent = "Please complete the required fields.";
      return;
    }

    const name = contactForm.elements.namedItem("name")?.value?.trim() ?? "";
    const email = contactForm.elements.namedItem("email")?.value?.trim() ?? "";
    const company = contactForm.elements.namedItem("company")?.value?.trim() ?? "";
    const message = contactForm.elements.namedItem("message")?.value?.trim() ?? "";

    const subject = encodeURIComponent(`Consultancy enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company || "N/A"}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    statusEl.textContent = "Thanks - I'll be in touch within 24 hours.";
    contactForm.reset();
  });
}
