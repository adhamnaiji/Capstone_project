import { async } from '@firebase/util';
import {useState} from 'react';
import '../sign-in-form/sign-in-form.styles.scss';
import FormInput from '../form-input/form-input.component';


import { UserContext } from '../../contexts/user.context';

import Button from '../button/button.component';
import { signInWithGooglePopup,createUserDocumentFromAuth ,signInAuthUserWithEmailAndPassword} from '../../routes/utils/firebase/firebase.utils';
const defaultFormFields={
      email: '',
      password: '',
};




const SignInForm = () =>{
    const [formFields,setFormFields]=useState(defaultFormFields);
    const{email,password}=formFields;

    //const {setCurrentUser} = useContext(UserContext);


    const resetFormFields=()=>{
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle= async () =>{

        signInWithGooglePopup();

        //setCurrentUser(user);
        //createUserDocumentFromAuth(user);
    
    };

    const handleSubmit = async (event)=>{
        event.preventDefault();
        try{ 
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            //setCurrentUser(user);

            resetFormFields();
        }catch(Error){
            if(Error.code == 'auth/wrong-password'){
                alert('incorrect password for email');
            }
            else console.log(Error);
        }
    };

    const handleChange = (event)=>{
        const {value, name} = event.target;
        //this.setState({value: event.target.value});
        setFormFields({...formFields,[name]:value})

    }
 
    return (
    <div className='sign-up-container'>
        <h2>Already have an account ?</h2>
<span>sign in with your email and password</span>
<form onSubmit={handleSubmit}>
   
<FormInput
    label="Email"
    type ="email" required
    onChange={handleChange}
    name='email'
    value={email}/>


<FormInput
    label="Password"
    type ="password" required
    onChange={handleChange}
    name='password'
    value={password}/>

<div className='buttons-container'>
    <Button  type="submit">Sign In</Button>
    <Button type ="button " buttontype='google' onClick={signInWithGoogle}>google Sign in</Button>
</div>

</form>
    </div>);
};
export default SignInForm;