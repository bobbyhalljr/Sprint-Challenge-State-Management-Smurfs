import React, { useContext } from 'react';
import { Formik, withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { SmurfContext } from '../contexts/SmurfContext';

const SmurfForm = ({ values, errors, touched, isSubmitting }) => {

  const smurfForm = useContext(SmurfContext);

  return (
    <>
      <Formik>
        <Form>
          <Field name='name' type='text' placeholder='Name' />
          {touched.username && errors.username && <p>{errors.username}</p>}
          
          <Field name='age' type='text' placeholder='Age' />
          {touched.email && errors.email && <p>{errors.email}</p>}

          <Field name='height' type='text' placeholder='Height' />
          {touched.password && errors.password && <p>{errors.password}</p>}

          <button type='submit'>Submit!</button>
        </Form>
      </Formik>
      </>
  )
}

const FormikSmurfForm = withFormik({
  mapStateToValues({ name, age, height }) {
    return {
      name: name || '',
      age: age || '',
      height: height || ''
    }
  },
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    axios.post('http://localhost:3333/smurfs')
      .then(res => {
        console.log(res);
        resetForm();
        // setSubmitting: false
      })
  }
})(SmurfForm)



export default FormikSmurfForm;