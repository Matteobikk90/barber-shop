import Map from "components/Main/Contact/Map";
import ContactForm from "components/Main/Contact/ContactForm";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Contact = () => (
    <section
        id="contatti"
        tw="bg-cream text-black p-[2rem] md:p-[1rem] sm:p-[2rem 1rem]"
    >
        <h2 tw="text-xxl text-center">
            <strong>Contatti</strong>
        </h2>
        <div tw="grid grid-cols-[repeat(2, 1fr)] mt-[3rem] gap-[3rem] md:grid-cols-[repeat(1, 1fr)]auto-rows-fr justify-between items-center h-full text-xl">
            <Map />
            <ContactForm />
        </div>
    </section>
);

export default Contact;
