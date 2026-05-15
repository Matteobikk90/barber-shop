import { socials } from "utils/items";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Footer = () => {
  return (
    <footer tw="bg-green text-cream">
      <div tw="grid grid-cols-4 lg:grid-cols-2 sm:grid-cols-1 gap-[3rem] p-[2rem 4rem] md:p-[3rem 2rem] sm:p-[2.5rem 1.5rem]">
        <div>
          <img
            width={180}
            src="https://blendon-barber-shop.it/assets/images/logo-footer.png"
            alt="Blendon Barber Shop"
          />
        </div>

        <div tw="flex flex-col gap-[0.4rem]">
          <p tw="text-xs font-bold uppercase tracking-widest opacity-50 mb-[0.5rem]">
            Dove siamo
          </p>
          <p>Via Manzoni 21/A</p>
          <p>Rivoli (TO), 10098</p>
          <a
            tw="hover:opacity-70 transition-opacity"
            href="mailto:blendon.barbershop@gmail.com">
            blendon.barbershop@gmail.com
          </a>
          <a tw="hover:opacity-70 transition-opacity" href="tel:+393428012955">
            +39 342 801 2955
          </a>
        </div>

        <div tw="flex flex-col gap-[0.4rem]">
          <p tw="text-xs font-bold uppercase tracking-widest opacity-50 mb-[0.5rem]">
            Orari
          </p>
          <p>Lunedì - Domenica chiuso</p>
          <p>Mar-Sab: 09:00 - 13:00 / 14:00 - 19:00</p>
          <p>Mercoledì: 11:00 - 13:00 / 14:00 - 20:30</p>
        </div>

        <div tw="flex flex-col gap-[0.75rem]">
          <p tw="text-xs font-bold uppercase tracking-widest opacity-50">
            Seguici su
          </p>
          <div tw="flex gap-[1rem]">
            {socials.map(({ url, src, id }) => (
              <a key={id} href={url} tw="hover:opacity-70 transition-opacity">
                <img
                  width={32}
                  height={32}
                  alt={`Blendon Barber Shop - ${id}`}
                  src={src}
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div tw="border-t border-[rgba(255,255,255,0.12)] px-[4rem] py-[1.25rem] md:px-[2rem] sm:px-[1.5rem] text-xs opacity-50 text-center">
        © {new Date().getFullYear()} Blendon Barbershop. Tutti i diritti
        riservati.
      </div>
    </footer>
  );
};

export default Footer;
