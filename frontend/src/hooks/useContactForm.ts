import { FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";
import { FormDataTypes, InputTypes } from "types/contact-form.types";

const useContactForm = (
    initialState: FormDataTypes = {
        name: "",
        phone: null,
        email: "",
        message: ""
    },
    contactFormRef: any
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
            message: ""
        });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        emailjs
            .sendForm(
                process.env.REACT_APP_EMAIL_JS_SERVICE!,
                process.env.REACT_APP_EMAIL_JS_CONTACTFORM_TEMPLATE!,
                contactFormRef.current!,
                process.env.REACT_APP_EMAIL_JS_API
            )
            .then(
                (result: any) => {
                    console.log(result.text);
                    handleReset();
                    alert(`Grazie per averci contattato.
                        Ti risponderemo il prima possibile
                    `);
                },
                (error: any) => {
                    alert("Messaggio non inviato, riprovare più tardi");
                    console.log(error.text);
                }
            );
    };

    return { formData, handleInputChange, handleReset, handleSubmit };
};

export default useContactForm;
