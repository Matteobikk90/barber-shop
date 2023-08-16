/* eslint-disable max-len */
import background_mobile from "components/ErrorBoundary/assets/images/background_mobile.svg";
import arrow from "components/ErrorBoundary/assets/images/chevronRight.svg";
import desktopLingkaran from "components/ErrorBoundary/assets/images/desktopLingkaran.svg";
import gradient from "components/ErrorBoundary/assets/images/gradientDesktop.png";
import logo from "components/ErrorBoundary/assets/images/logo.svg";
import scientist from "components/ErrorBoundary/assets/images/scientist.png";
import workInProgress from "components/ErrorBoundary/assets/images/workInProgress.svg";
import React from "react";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const currentYear = new Date().getFullYear();

const ErrorFallback = () => (
    <>
        <header tw="absolute flex justify-between w-full items-center p-[1rem 3rem] lg:p-[1rem] font-medium text-black z-[1]">
            <h1 tw="flex justify-between items-center gap-[0.5rem] md:text-sm">
                <img loading="lazy" src={logo} alt="Logo" />
                WORLD DATA LAB
            </h1>
            <a
                tw="font-medium text-sm md:block hidden absolute right-[1rem] z-[999]"
                href="https://worlddata.io/who-we-are"
            >
                About us
            </a>
        </header>
        <section
            style={{ backgroundImage: `url(${gradient})` }}
            tw="bg-cover bg-center text-[#2B3081] text-center md:flex flex-col justify-between h-[100vh] bg-[#F5F5F5] relative md:p-[2rem 1rem 1rem]"
        >
            <img
                tw="hidden md:block w-full max-w-[23.5rem] m-auto"
                alt="Mobile screen"
                src={background_mobile}
            />
            <article tw="left-[3rem] lg:left-[1rem] flex flex-col gap-[1rem] text-left max-w-[32rem] w-full relative top-[50%] translate-y-[-50%] z-[2] md:translate-y-0 sm:max-w-full md:m-auto md:top-[unset] md:left-[unset]">
                <h2 tw="text-[#EFB840] text-[2rem] md:hidden">
                    Very high demand is creating
                    <br />
                    <strong tw="text-[3rem] leading-[3rem] lg:text-[2rem]">
                        Technical Difficulties
                    </strong>
                </h2>
                <p tw="lg:text-[1.125rem] lg:leading-[1.5rem] text-xxl sm:pb-[1rem] font-light">
                    Our support team is currently working to fix the issue.
                    <br />
                    Thanks for your patience!
                </p>
                <button
                    onClick={() => window.location.reload()}
                    tw="border border-[#2B3081] bg-[#2B3081] text-white font-semiBold w-full md:max-w-full max-w-[6.813rem] py-[1rem] lg:p-[0.5rem] rounded uppercase hover:bg-[#375EC0]"
                >
                    go back
                </button>
                <div tw="flex flex-col gap-[1rem] font-light mt-[1rem]">
                    <p tw="text-xl lg:text-[1rem] lg:leading-[1.25rem]">
                        While you wait, why not take a look at our blog or World
                        Data Pro?
                    </p>
                    <div tw="max-w-[23.5rem] md:max-w-full w-full flex justify-between items-center">
                        <a
                            href="https://worlddata.pro/"
                            tw="font-semiBold text-center rounded border border-[#2B3081] p-[1rem] lg:p-[0.5rem] w-full max-w-[11.625rem] hover:text-white hover:bg-[#2B3081] md:max-w-full"
                        >
                            WORLD DATA PRO
                        </a>
                        <a
                            href="https://worlddata.io/news/in-the-news"
                            tw="md:hidden font-semiBold text-lg gap-[1rem] text-center flex justify-between items-center hover:border-b border-b-[#2B3081] py-[0.5rem] lg:text-[1rem]"
                        >
                            WDL BLOG
                            <img loading="lazy" src={arrow} alt="Chevron" />
                        </a>
                    </div>
                </div>
            </article>
            <img
                src={desktopLingkaran}
                alt="Lingkaran"
                tw="absolute top-0 right-0 lg:w-[15.62rem] md:hidden"
            />
            <img
                width={500}
                src={workInProgress}
                alt="Work in progress"
                tw="absolute z-[1] top-0 right-0 lg:w-[21rem] md:hidden"
            />
            <img
                width={850}
                src={scientist}
                alt="Human"
                tw="absolute z-[1] bottom-[3rem] lg:bottom-[5rem] right-0 lg:w-[34.37rem] md:hidden"
            />
        </section>
        <footer tw="md:hidden p-[1rem 3rem] lg:p-[1rem] absolute w-full bottom-0 border-t-[0.5px] border-t-[#2B3081] flex justify-between items-center">
            <p tw="text-sm">Copy rights to World Data Lab {currentYear}</p>
            <a href="https://worlddata.io/who-we-are">About us</a>
        </footer>
    </>
);

export default ErrorFallback;
