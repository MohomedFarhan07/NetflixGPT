export const checkSignIn = (email, password) => {
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  // Password validation regex
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const isPasswordValid = passwordRegex.test(password);

  if (!isEmailValid) {
    return "Please enter a valid email address.";
  }
  if (!isPasswordValid) {
    return "Please enter a valid password. ";
  }
  return null; // No validation errors
};


export const checkSignUp = (email, password, name) => {
  const message = checkSignIn(email, password);

  const nameRegex = /^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/;
  const isNameValid = nameRegex.test(name);

  if (!isNameValid) {
    return "Enter a valid username";
  }

  return message;
};
