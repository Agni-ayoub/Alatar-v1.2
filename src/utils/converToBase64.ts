import React, { SetStateAction } from "react";

export const convertToBase64 = (file: File, setBase64 : React.Dispatch<SetStateAction<string | null>>, setFormData : React.Dispatch<SetStateAction<object>>) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        setBase64(reader.result as string);
        setFormData((prev : object) => ({ ...prev, avatar: reader.result as string}));
    };
    reader.onerror = (error) => {
        console.error("Error converting file to base64:", error);
    };
};