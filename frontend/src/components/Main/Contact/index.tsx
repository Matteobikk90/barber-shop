import Map from "components/Main/Contact/Map";
import ContactForm from "components/Main/Contact/ContactForm";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Contact = () => (
    <section
        id="contact"
        tw="bg-cream text-black p-[2rem] md:p-[1rem] sm:p-[2rem 0]"
    >
        <h2 tw="text-xxl text-center">
            <strong>Contatti</strong>
        </h2>
        <div>
            <Map />
            <ContactForm />
        </div>
    </section>
);

export default Contact;
