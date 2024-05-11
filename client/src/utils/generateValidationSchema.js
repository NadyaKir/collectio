import * as Yup from "yup";

const generateValidationSchema = (title) => {
  let schema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  if (title === "Register") {
    schema = schema.shape({
      username: Yup.string().required("Username is required"),
    });
  }

  return schema;
};

export default generateValidationSchema;
