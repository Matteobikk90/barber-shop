import shampo from "assets/images/products/shampo.jpg";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Thumbnail = () => {
    return (
        <article tw="h-full p-[1rem] bg-cream text-black">
            <div tw="w-full h-full bg-white flex items-center justify-between p-[1rem]">
                <div tw="flex flex-col gap-[1rem]">
                    <h3 tw="font-semiBold">Shampoo Bain Divalent</h3>
                    <em tw="text-sm leading-5">
                        Shampoo equilibrante per radici grasse e lunghezze
                        sensibilizzate. I prodotti essenziali per completare una
                        perfetta routine per detergere, trattare, texturizzare e
                        preparare i capelli per la notte.
                    </em>
                </div>
                <img
                    loading="lazy"
                    tw="max-w-[190px]"
                    src={shampo}
                    alt="Shampo"
                />
            </div>
        </article>
    );
};

export default Thumbnail;
