import { FormDataTypes, InputTypes } from "types/contact-form.types";
import { FormEvent, useState } from "react";

const useContactForm = (
    initialState: FormDataTypes = {
        name: "",
        phone: null,
        email: "",
        message: ""
    }
    // onValidated: any
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
        // onValidated({
        //     name: formData.name,
        //     phone: formData.phone,
        //     email: formData.email,
        //     message: formData.message
        // });
    };

    return { formData, handleInputChange, handleReset, handleSubmit };
};

export default useContactForm;
