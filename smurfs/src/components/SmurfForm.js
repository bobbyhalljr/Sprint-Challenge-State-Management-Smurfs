import React, { useContext } from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { SmurfContext } from '../contexts/SmurfContext';

import { Form as antForm, Icon, Input, Button, Checkbox } from 'antd';


const SmurfForm = ({ values, errors, touched, isSubmitting }) => {
    
  const smurfForm = useContext(SmurfContext);

    // const { getFieldDecorator } = this.props.form;

    return (
      <>
      {/* //  <withFormik> */}
          <antForm className="login-form" style={{ width: '50%' }}>
            {touched.name && errors.name && <p>{errors.name}</p>}
            <Field type='text' name='name' placholder='Name'/>
        <Form.Item>
            {touched.age && errors.age && <p>{errors.age}</p>}
            <Field type='text' name='age' placeholder='Age' />
        </Form.Item>
        <Form.Item>
            {touched.height && errors.height && <p>{errors.height}</p>}
            <Field type='text' name='height' placeholder='Height' />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Add Smurf
          </Button>
        </Form.Item>
      </antForm>
      </>
    )
  }
       {/* </withFormik> */}
        
      {/* // <form>
        //     <input type='text' placeholder='name'/>
        //     <input type='text' placeholder='age'/>
        //     <input type='text' placeholder='height' />
        //     <button>Submit</button>
        // </form> */}

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