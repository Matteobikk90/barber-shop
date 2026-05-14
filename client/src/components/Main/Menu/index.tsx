import { services } from "utils/items";
/** @jsxImportSource @emotion/react */
import tw from "twin.macro";

const Menu = () => (
  <section
    id="servizi"
    tw="bg-black text-cream py-[5rem] px-[2rem] sm:py-[3rem] sm:px-[1rem]">
    <h2 tw="text-xxl text-center mb-[3rem] sm:mb-[2rem]">
      <strong>Servizi</strong>
    </h2>
    <article tw="p-[1rem] border border-green max-w-[950px] mx-auto">
      <ul
        tw="text-[2.5rem] uppercase md:text-lg sm:text-sm"
        style={{
          backgroundImage:
            "url(https://blendon-barber-shop.it/assets/images/prism.png)",
        }}>
        {services.map(({ id, price, text, src }) => (
          <li
            style={{
              backgroundImage:
                "radial-gradient(circle closest-side, rgba(255,255,255,0.05) 99%, transparent 1%)",
              backgroundSize: "5px 3px",
            }}
            key={id}
            tw="font-medium sm:p-[1rem 0.5rem] p-[1rem] flex justify-between items-center bg-bottom bg-repeat-x">
            <div
              css={[
                tw`flex items-center gap-[1rem]`,
                id === "cut&shave" && tw`gap-[0.25rem]`,
              ]}>
              {id === "cut&shave" && (
                <>
                  <img
                    width={32}
                    src={services[0].src}
                    alt={`Blendon Barber Shop Services - ${id}`}
                  />
                  <span>+</span>
                </>
              )}
              <img
                width={32}
                src={src}
                alt={`Blendon Barber Shop Services - ${id}`}
              />
              <span>{text}</span>
            </div>
            <span tw="font-bold ml-[1rem]">€ {price}</span>
          </li>
        ))}
      </ul>
    </article>
  </section>
);

export default Menu;
