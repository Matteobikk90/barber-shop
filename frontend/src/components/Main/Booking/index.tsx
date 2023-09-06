import { FormEvent, useState, useEffect } from "react";
import { db } from "db/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import Step1 from "components/Main/Booking/Step1";
import Step2 from "components/Main/Booking/Step2";
import Step3 from "components/Main/Booking/Step3";
import { BookingTypes } from "types/booking.types";
import useMultiStepForm from "hooks/useMultiStepForm";
/** @jsxImportSource @emotion/react */
import tw from "twin.macro";

const Booking = ({ handleToggleState }: any) => {
    const {
        back,
        currentStepIndex,
        next,
        isFirstStep,
        isLastStep,
        step,
        steps
    } = useMultiStepForm([<Step1 />, <Step2 />, <Step3 />]);
    const [newBooking, setNewBooking] = useState<BookingTypes>({
        service: "",
        name: "",
        surname: "",
        email: "",
        phone: "",
        message: "",
        start_time: "",
        end_time: ""
    });
    const [bookings, setBookings] = useState<any>([]);

    /* function to get all bookings from firestore in realtime */
    useEffect(() => {
        const q = query(collection(db, "bookings"), orderBy("created", "desc"));
        onSnapshot(q, (querySnapshot) => {
            console.log(
                querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                }))
            );
            setBookings(
                querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                }))
            );
        });
    }, []);

    const submitBooking = (e: FormEvent) => {
        e.preventDefault();
        next();
    };

    return (
        <form
            onSubmit={submitBooking}
            css={[
                tw`relative text-center bg-green text-cream shadow min-h-[450px] p-[2rem 5rem 4rem]`,
                currentStepIndex === 1 && tw`p-[2rem 5rem 5rem]`
            ]}
        >
            <button
                tw="absolute top-[1rem] left-[1rem] text-xxl"
                onClick={() => handleToggleState("isBooking")}
                type="button"
            >
                Chiudi X
            </button>
            <div tw="absolute top-[1rem] right-[1rem] text-xxl">
                {currentStepIndex + 1} / {steps.length}
            </div>
            {step}
            <div tw="text-xxl flex gap-[1rem] absolute bottom-[1rem] right-[1rem] mt-[1rem]">
                {!isFirstStep && (
                    <button type="button" onClick={back}>
                        Indietro
                    </button>
                )}
                <button type="submit">
                    {isLastStep ? "Prenota" : "Avanti"}
                </button>
            </div>
        </form>
    );
};

export default Booking;
