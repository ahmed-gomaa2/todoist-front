import formValidator from "./form.validator";

export default (e, formData, className) => {
    const changedInput = e.target.closest(`.${className}`);
    if(!changedInput) return;
    const updatedInputKey = changedInput.dataset.key;
    const updatedFormData = {
        ...formData
    }

    const updatedFormElement = {
        ...updatedFormData[updatedInputKey]
    }

    updatedFormElement.value = e.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = formValidator(updatedFormElement.value, updatedFormElement.validation);
    updatedFormData[updatedInputKey] = updatedFormElement;
    let formIsValid = true;
    for (let inputKey in updatedFormData) {
        formIsValid = updatedFormData[inputKey].valid && formIsValid;
    }
    return {formIsValid, updatedFormData};
}