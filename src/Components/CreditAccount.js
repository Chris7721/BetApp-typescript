import React, {useState} from 'react'
import * as Yup from "yup";
import {connect} from 'react-redux'
import { ErrorMessage, useFormik } from "formik";
import { PaystackButton } from 'react-paystack'
import '../css/creditAccount.scss'
import { authUser } from '../reducers/userReducers';
import {updateBetAmount} from '../actions/auth'

const PAYSTACK_PUBLIC_KEY = 'pk_test_98fd65341f193151b11213ad43bd7e8504dcbfc8'

const CreditAccount = (props)=> {
    const [betAmount, setBetAmount] = useState(0)
    const {
        values,
        handleSubmit,
        getFieldProps,
        touched,
        errors,
        setFieldValue
      } = useFormik({
        initialValues: {
            credit: 0
        },
        validationSchema: Yup.object().shape({
            credit: Yup.number()
              .min(100)
              .required("Required")
          }),
          async onSubmit(values) {
            try{
                console.log("clicked")
                
            }
            catch(err){
                
            }
          
        }
      });

      const componentProps = {
        email: props.authUser.email,
        amount: values.credit*100,
        publicKey: PAYSTACK_PUBLIC_KEY,
        text: "Credit Account",
        onSuccess: () =>{
            props.updateBetAmount(props.betAmount+values.credit)
           props.close()
        } ,
        onClose: () => props.close(),
      }
    return (
        <div className="creditAccount">
            <form onSubmit={handleSubmit}>
                <div class="creditAccount__input">
                    <label className="">Amount</label>
                    <input class="uk-input uk-form-width-medium" type="number" placeholder="min. NGN100"                    
                    {...getFieldProps("credit")}/> 
                    <span className="error">
                        {touched["credit"] && errors["credit"]}
                    </span>            
                </div>
                <div className="uk-margin">
                    { values.credit < 100 ? <button className={`uk-button uk-button-default pay ${(!errors.credit &&  (touched["credit"])) ? 'active' : ''}`} type="submit">Credit Account</button> : <PaystackButton {...componentProps} className={`uk-button uk-button-default pay ${(!errors.credit &&  (touched["credit"])) ? 'active' : ''}`} type="submit">Credit</PaystackButton>}
                   {/* <PaystackButton {...componentProps} className={`uk-button uk-button-default pay ${(!errors.credit &&  (touched["credit"])) ? 'active' : ''}`} type="submit">Credit</PaystackButton>  */}
                </div>
                
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        authUser: state.authUser,
        betAmount: state.betAmount
    }
}

export default connect(mapStateToProps, {updateBetAmount})(CreditAccount)
