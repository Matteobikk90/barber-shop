import { NavLink } from "react-router-dom";
import Header from "components/Header";
import Footer from "components/Footer";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const TermsAndConditions = () => (
    <>
        <NavLink to="/">
            <Header toggleState={{ isBooking: false }} />
        </NavLink>
        <main tw="p-[10rem 1rem 3rem] md:p-[6rem 1rem 3rem] max-w-[50rem] m-auto text-xl">
            <section tw="flex flex-col gap-[1rem]">
                <h1>
                    <strong>Termini e condizioni</strong>
                </h1>
                <h2>
                    <strong>1. Utilizzo del Sito Web</strong>
                </h2>
                <p>
                    L'uso del nostro sito web è soggetto a questi Termini e
                    Condizioni. Accetti di rispettarli.
                </p>
                <h2>
                    <strong>2. Prenotazioni</strong>
                </h2>
                <p>
                    Le prenotazioni dei servizi sono vincolanti e soggette a
                    disponibilità. Accetti di fornire informazioni accurate
                    durante il processo di prenotazione.
                </p>
                <h2>
                    <strong>3. Modifiche e Cancellazioni</strong>
                </h2>
                <p>
                    Se desideri modificare o cancellare una prenotazione, ti
                    preghiamo di contattarci contattarci tramite email:{" "}
                    <a href="mailto:blendon.barbershop@gmail.com">
                        blendon.barbershop@gmail.com
                    </a>
                    , tramite il modulo di contatto presente qui:{" "}
                    <a href="https://blendon-barber-shop.it/#contatti">
                        https://blendon-barber-shop.it/#contatti
                    </a>{" "}
                    oppure al numero di telefono: +39 342 801 2955
                </p>
                <h2>
                    <strong>4. Comunicazioni</strong>
                </h2>
                <p>
                    Accetti di ricevere comunicazioni da noi relative alle
                    prenotazioni e ai servizi.
                </p>
                <h2>
                    <strong>5. Responsabilità</strong>
                </h2>
                <p>
                    Non siamo responsabili per eventuali danni o perdite
                    derivanti dall'uso del nostro sito web o dei servizi
                    prenotati.
                </p>
                <h2>
                    <strong>6. Legge Applicabile</strong>
                </h2>
                <p>
                    Questi Termini e Condizioni sono regolati dalla legge dell'
                    Italia.
                </p>
                <p>Ultimo aggiornamento: 19/10/2023</p>
            </section>
        </main>
        <Footer />
    </>
);

export default TermsAndConditions;
