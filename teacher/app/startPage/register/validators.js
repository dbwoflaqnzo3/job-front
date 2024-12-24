export const validateName = (name) => {
    const forbiddenChars = /[0-9@#!%]/;

    if (!name.trim()) return "Name is required.";
    if (name.length < 2) return "Name must be at least 2 characters.";
    if (forbiddenChars.test(name))
        return "Name cannot contain the following characters: @, #, !, % and number.";
    return "";
};

export const validateBirthDate = (birthDate) => {
    const today = new Date();
    const inputDate = new Date(birthDate);

    if (!birthDate) return "Birthdate is required.";
    if (inputDate > today) return "Birthdate cannot be in the future.";
    const age = today.getFullYear() - inputDate.getFullYear();
    if (age < 18) return "You must be at least 18 years old.";
    return "";
};

export const validateSex = (sex) => {
    if (!sex) return "Sex is required.";
    if (!["Male", "Female", "Other"].includes(sex)) return "Invalid sex selection.";
    return "";
};

export const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneNumber) return "Phone number is required.";
    if (!phoneRegex.test(phoneNumber)) return "Invalid phone number.";
    return "";
};

export const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email) return "Email is required.";
    if (!emailRegex.test(email)) return "Invalid email address.";
    return "";
};

export const validateUserId = (userId) => {
    if (!userId.trim()) return "User ID is required.";
    if (userId.length < 5) return "User ID must be at least 5 characters.";
    return "";
};

export const validatePassword = (password) => {
    if (!password.trim()) return "Password is required.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    return "";
};

export const validatePasswordCheck = (passwordCheck, password) => {
    if(passwordCheck != password) return "입력하신 비밀번호와 다릅니다. 다시 입력해주세요."
    return ""
}