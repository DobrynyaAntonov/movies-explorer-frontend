import React from 'react';

export function useFormWithValidation() {
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setValues({ ...values, [name]: value });
        
        // Проверяем валидность email
        if (name === 'email') {
            const isValidEmail = emailPattern.test(value);
            setErrors({ ...errors, [name]: isValidEmail ? '' : 'Введите корректный email' });
            
            // Устанавливаем состояние isValid в зависимости от валидности email
            setIsValid(isValidEmail);
        } else {
            setErrors({ ...errors, [name]: target.validationMessage });
            
            // Проверяем валидность всей формы и устанавливаем isValid соответственно
            setIsValid(target.closest("form").checkValidity());
        }
    };

    const resetForm = React.useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );

    return { values, handleChange, errors, isValid, resetForm, setIsValid };
}
