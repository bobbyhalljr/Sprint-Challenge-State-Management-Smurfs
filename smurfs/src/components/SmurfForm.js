import React from "react";
import ReactDOM from "react-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { SmurfContext } from '../contexts/SmurfContext';

function LoginForm({ values, errors, touched, isSubmitting }) {
  return (
    <div className='App'>
      <Form>
        <div>
          {touched.name && errors.name && <p>{errors.name}</p>}
          <Field type="text" name="name" placeholder="name" />
        </div>
        <div>
          {touched.age && errors.age && <p>{errors.age}</p>}
          <Field type="text" name="age" placeholder="age" />
        </div>
        <div>
          {touched.height && errors.height && <p>{errors.height}</p>}
          <Field type="text" name="height" placeholder="height" />
        </div>
        <button type='submit' disabled={isSubmitting}>Submit</button>
      </Form>
    </div>
  );
}

const FormikLoginForm = withFormik({
  mapPropsToValues({ name, age, height }) {
    return {
      name: name || "",
      age: age || "",
      height: height || '',
    };
  },
  // validationSchema: Yup.object().shape({
  //   email: Yup.string()
  //     .email("Email not valid")
  //     .required("Email is required"),
  //   password: Yup.string()
  //     .min(16, "Password must be 16 characters or longer")
  //     .required("Password is required")
  // }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    if (values.email === "alreadytaken@atb.dev") {
      setErrors({ email: "That email is already taken" });
    } else {
      axios
        .post("http://localhost:3333/smurfs", values)
        .then(res => {
          console.log(res); // Data was created successfully and logs to console
          resetForm();
          setSubmitting(false);
        })
        .catch(err => {
          console.log(err.response); // There was an error creating the data and logs to console
          setSubmitting(false);
        });
    }
  }
})(LoginForm);

export default FormikLoginForm;