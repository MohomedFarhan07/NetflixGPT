import { checkSignIn, checkSignUp } from "../utils/validation";

describe("Checking the Sign In validation works properly", () => {
  test("emailId check", () => {
    expect(checkSignIn("farhan@gmail.com", "Farhan@123")).toBe(null);
    expect(checkSignIn("farhangmail.com", "Farhan@123")).toBe(
      "Please enter a valid email address.",
    );
    expect(checkSignIn("f@com", "Farhan@123")).toBe(
      "Please enter a valid email address.",
    );
  });

  test("Password check", () => {
    expect(checkSignIn("farhan@gmail.com", "Farhan@123")).toBe(null);
    expect(checkSignIn("farhan@gmail.com", "F")).toBe(
      "Please enter a valid password. ",
    );
    expect(checkSignIn("farhan@gmail.com", "23")).toBe(
      "Please enter a valid password. ",
    );
  });
});

describe("Checking the Sign Up validation works properly", () => {
  test("Full name check", () => {
    expect(checkSignUp("farhan@gmail.com", "Farhan@123", "12")).toBe(
      "Enter a valid username",
    );
    expect(checkSignUp("farhan@gmail.com", "Farhan@123", "Mo")).toBe(null);
    expect(
      checkSignUp("farhan@gmail.com", "Farhan@123", "Mohomed Farhan"),
    ).toBe(null);
  });
  test("emailId check", () => {
    expect(checkSignUp("farhan@gmail.com", "Farhan@123")).toBe(null);
    expect(checkSignUp("farhangmail.com", "Farhan@123")).toBe(
      "Please enter a valid email address.",
    );
    expect(checkSignUp("f@com", "Farhan@123")).toBe(
      "Please enter a valid email address.",
    );
  });
  test("Password check", () => {
    expect(checkSignUp("farhan@gmail.com", "Farhan@123")).toBe(null);
    expect(checkSignUp("farhan@gmail.com", "F")).toBe(
      "Please enter a valid password. ",
    );
    expect(checkSignUp("farhan@gmail.com", "23")).toBe(
      "Please enter a valid password. ",
    );
  });
});
