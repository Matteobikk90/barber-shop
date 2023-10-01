import { FormEvent, useState } from "react";
import { FormDataTypes, InputTypes } from "types/contact-form.types";

const useContactForm = (
    initialState: FormDataTypes = {
        name: "",
        phone: null,
        email: "",
        message: ""
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
            message: ""
        });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        Email.send({
            SecureToken: "01da71eb-3a31-4daa-b6bd-4b71636bb929",
            To: "blendon.barbershop@gmail.com",
            From: "blendon.barbershop@gmail.com",
            Subject: `Informazioni da ${formData.name}`,
            Body: `
                <p>Nome: <strong>${formData.name}</strong>,</p>
                <p>Telefono: <strong>${formData.phone}</strong></p>
                <p>Email: <strong>${formData.email}</strong>:</p>
                <p>Messaggio: <strong>${formData.message}</strong></p>
            `
        }).then(
            (result: any) => {
                console.log(result.text);
                handleReset();
                alert(
                    `Grazie per averci contattato. Ti risponderemo il prima possibile`
                );
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
