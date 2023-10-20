import { NavLink } from "react-router-dom";
import Footer from "components/Footer";
import Header from "components/Header";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const PrivacyAndPolicy = () => (
    <>
        <NavLink to="/">
            <Header toggleState={{ isBooking: false }} />
        </NavLink>
        <main tw="p-[10rem 1rem 3rem] md:p-[6rem 1rem 3rem] max-w-[50rem] m-auto text-xl">
            <section tw="flex flex-col gap-[1rem]">
                <h1>
                    <strong>Informativa sulla Privacy</strong>
                </h1>

                <h2>
                    <strong>Data dell'ultima modifica: 19/10/2023</strong>
                </h2>
                <p>
                    Benvenuti su Blendon Barber Shop
                    ("https://blendon-barber-shop.it"). La vostra privacy è
                    importante per noi e ci impegniamo a proteggere e rispettare
                    i vostri dati personali. Questa Informativa sulla Privacy
                    spiega come raccogliamo, utilizziamo e condividiamo i vostri
                    dati personali quando visitate il nostro Sito Web.
                </p>

                <h2>
                    <strong>1. Dati Raccolti</strong>
                </h2>
                <p>
                    Raccogliamo i seguenti dati personali quando prenoti un
                    servizio tramite il nostro sito web:
                </p>
                <ul>
                    <li>Nome</li>
                    <li>Cognome</li>
                    <li>Telefono</li>
                    <li>Email</li>
                    <li>Tipo di taglio</li>
                    <li>Data della prenotazione</li>
                </ul>

                <h2>
                    <strong>2. Finalità della Raccolta dei Dati</strong>
                </h2>
                <p>
                    Utilizziamo i dati personali raccolti per le seguenti
                    finalità:
                </p>
                <ul>
                    <li>
                        Gestire e confermare le prenotazioni dei servizi
                        richiesti.
                    </li>
                    <li>
                        Comunicare con te in merito alle tue prenotazioni e ai
                        servizi.
                    </li>
                </ul>

                <h2>
                    <strong>3. Condivisione dei Dati</strong>
                </h2>
                <p>
                    Non condivideremo i vostri dati personali con terze parti al
                    di fuori dei casi previsti dalla legge o con il vostro
                    esplicito consenso.
                </p>

                <h2>
                    <strong>4. Sicurezza dei Dati</strong>
                </h2>
                <p>
                    Adottiamo misure di sicurezza per proteggere i tuoi dati
                    personali da accessi non autorizzati o perdite.
                </p>

                <h2>
                    <strong>5. Retenzione dei Dati</strong>
                </h2>
                <p>
                    I vostri dati personali verranno conservati solo per il
                    tempo strettamente necessario per le finalità per cui sono
                    stati raccolti o in conformità con le leggi applicabili. La
                    prenotazione e i relativi dati vengono automaticamente
                    cancellati una volta passate le 24 ore precedenti alla
                    giornata odierna.
                </p>

                <h2>
                    <strong>6. I Vostri Diritti</strong>
                </h2>
                <p>Avete il diritto di:</p>
                <ul>
                    <li>Accedere ai vostri dati personali</li>
                    <li>Ottenere una copia dei dati che deteniamo su di voi</li>
                    <li>Cancellare i vostri dati personali</li>
                    <li>
                        Ritirare il vostro consenso in qualsiasi momento, se
                        applicabile
                    </li>
                </ul>

                <h2>
                    <strong>7. Contatti</strong>
                </h2>
                <p>
                    Se avete domande o richieste riguardo a questa Informativa
                    sulla Privacy o al trattamento dei vostri dati personali,
                    potete contattarci tramite email:{" "}
                    <a href="mailto:blendon.barbershop@gmail.com">
                        blendon.barbershop@gmail.com
                    </a>{" "}
                    o tramite il modulo di contatto presente qui:{" "}
                    <a href="https://blendon-barber-shop.it/#contatti">
                        https://blendon-barber-shop.it/#contatti
                    </a>
                </p>
            </section>
        </main>
        <Footer />
    </>
);

export default PrivacyAndPolicy;
