import Map from "components/Main/Contact/Map";
import ContactForm from "components/Main/Contact/ContactForm";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Contact = () => (
    <section
        id="contatti"
        tw="bg-cream text-black py-[5rem] px-[2rem] sm:py-[3rem] sm:px-[1rem]"
    >
        <h2 tw="text-xxl text-center mb-[3rem] sm:mb-[2rem]">
            <strong>Contatti</strong>
        </h2>
        <div tw="grid grid-cols-[repeat(2,1fr)] mt-[3rem] gap-[3rem] md:grid-cols-1 items-start text-xl">
            <Map />
            <ContactForm />
        </div>
    </section>
);

export default Contact;
