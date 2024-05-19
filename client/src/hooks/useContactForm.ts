import { FormEvent, useState } from "react";
import { FormDataTypes, InputTypes } from "types/contact-form.types";

const useContactForm = (
    initialState: FormDataTypes = {
        name: "",
        phone: null,
        email: "",
        message: "",
        confirmation: false
    }
) => {
    const [formData, setFormData] = useState(initialState);

    const handleInputChange = ({ name, value, type, checked }: InputTypes) =>
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });

    const handleReset = () =>
        setFormData({
            name: "",
            phone: null,
            email: "",
            message: "",
            confirmation: false
        });

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const emailBody = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message
        };
        await fetch(
            "https://barber-shop-backend-efc4.onrender.com/send_contact_email",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                mode: "cors",
                body: JSON.stringify(emailBody)
            }
        )
            .then(() => {
                alert(
                    "Grazie per averci contattato. Ti risponderemo il prima possibile"
                );
                handleReset();
            })
            .catch(() => alert("Messaggio non inviato, riprovare più tardi"));
    };

    return { formData, handleInputChange, handleSubmit };
};

export default useContactForm;
