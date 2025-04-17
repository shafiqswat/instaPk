/** @format */

export const getErrorMessage = (code) => {
  const errorMap = {
    // Firebase errors
    "Firebase: Error (auth/invalid-credential).": "Invalid email or password",
    "Firebase: Error (auth/user-not-found).":
      "No account found with this email",
    "Firebase: Error (auth/wrong-password).": "Incorrect password",
    "Firebase: Error (auth/email-already-in-use).":
      "This email is already registered",
    "Firebase: Error (auth/too-many-requests).":
      "Too many attempts. Please wait and try again",
    "Firebase: Error (auth/network-request-failed).":
      "Internet connection problem. Please check your network",
    "Firebase: Error (auth/invalid-email).":
      "Please enter a valid email address",
    // Custom errors
    "Username is already taken.":
      "This username is not available. Please try another one.",

    // Default
    general: "Something went wrong. Please try again",
  };

  // Find matching error or use general default
  return (
    Object.keys(errorMap).find((key) => code.includes(key)) || errorMap.general
  );
};
