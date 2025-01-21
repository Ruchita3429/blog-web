export const validateSignupForm = (user) => {
  if (!user.email) return "Email is required.";
  if (!user.username) return "Username is required.";
  if (!user.password) return "Password is required.";
  if (user.password.length < 6)
    return "Password must be at least 6 characters long.";
  if (user.password !== user.confirmpassword)
    return "Passwords do not match.";
  if (!user.signupAs) return "Please select 'User' or 'Admin'.";
  if (!user.country || user.country === "Select Country")
    return "Please select a valid country.";
  return null; // No errors
};
