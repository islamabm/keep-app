import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginSocialFacebook } from 'reactjs-social-login'
import { FacebookLoginButton } from 'react-social-login-buttons'
import { useGoogleLogin } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import LocationModal from '../cmps/LocationModal'
import emailjs from 'emailjs-com'
import { setUser, signup } from '../store/actions/user.actions'
import { AddMap } from '../store/actions/note.actions'
import {
  eventBus,
  showErrorMsg,
  showSuccessMsg,
} from '../services/event-bus.service'
import axios from 'axios'
const Signup = (props) => {
  const [userState, setUserState] = useState([])
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setUser())
  }, [fullname, email])

  const doSignup = async (event) => {
    event.preventDefault()
    try {
      const userPosition = await getUserLocation()

      dispatch(signup(fullname, email))
      dispatch(
        AddMap(userPosition.coords.latitude, userPosition.coords.longitude, 10)
      )
      navigate('/notes')
    } catch (error) {
      console.error('Error:', error.message)
    }
    let synth = window.speechSynthesis
    let utterThis = new SpeechSynthesisUtterance(
      `Hello ${fullname} welcomt to note  application`
    )

    synth.speak(utterThis)
    if (email) {
      emailjs
        .send(
          process.env.REACT_APP_SERVICE_ID,
          process.env.REACT_APP_TEMPLATE_ID,
          {
            user_name: fullname,
            user_email: email,
          },
          process.env.REACT_APP_USER_ID
        )
        .then((response) => {
          showSuccessMsg('Email successfully sent! Check your email')
        })
        .catch((error) => {
          showErrorMsg('Email failed sent!', error)
        })
    } else {
      console.error('Error: email is empty or undefined')
    }
  }

  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'))
      } else {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      }
    })
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleResolve = async (res) => {
    try {
      const userPosition = await getUserLocation()

      dispatch(signup(res.data.first_name, res.data.email))
      dispatch(
        AddMap(userPosition.coords.latitude, userPosition.coords.longitude, 10)
      )

      navigate('/notes')
      let synth = window.speechSynthesis
      let utterThis = new SpeechSynthesisUtterance(
        `Hello ${res.data.given_name} welcomt to note  application`
      )
      synth.speak(utterThis)
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleReject = (error) => {
    console.log('error', error)
  }

  const handleFullnameChange = (event) => {
    setFullname(event.target.value)
  }

  async function getSignupWithGoogle(userName, userEmail) {
    try {
      const userPosition = await getUserLocation()
      dispatch(signup(userName, userEmail))
      dispatch(
        AddMap(userPosition.coords.latitude, userPosition.coords.longitude, 10)
      )

      navigate('/notes')
      let synth = window.speechSynthesis
      let utterThis = new SpeechSynthesisUtterance(
        `Hello ${userName} welcomt to notes  application`
      )
      synth.speak(utterThis)
    } catch (error) {
      console.log('error', error)
    }
  }

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUserState(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  })
  useEffect(() => {
    if (userState) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userState.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${userState.access_token}`,
              Accept: 'application/json',
            },
          }
        )
        .then((res) => {
          getSignupWithGoogle(res.data.given_name, res.data.email)
        })
        .catch((err) => console.log(err))
    }
  }, [userState])

  return (
    <>
      <LocationModal onAllow={getUserLocation} />
      <div className="signup-container">
        <section className="signup-modal">
          <form className="signup-form" onSubmit={doSignup}>
            <h2>Signup</h2>
            <input
              type="text"
              value={fullname}
              placeholder="Your fullname"
              onChange={handleFullnameChange}
            />
            <input
              type="email"
              value={email}
              placeholder="Your email"
              onChange={handleEmailChange}
            />
            <button type="submit">Signup</button>
          </form>
          <div className="divider">
            <div className="line"></div>
            <span>OR</span>
            <div className="line"></div>
          </div>
          <LoginSocialFacebook
            appId={process.env.REACT_APP_FACEBOOK_APP_ID}
            onResolve={handleResolve}
            onReject={handleReject}
          >
            <FacebookLoginButton className="facebook-button"></FacebookLoginButton>
          </LoginSocialFacebook>
          <div className="divider">
            <div className="line"></div>
            <span>OR</span>
            <div className="line"></div>
          </div>
          <div onClick={() => login()} className="google-btn">
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              />
            </div>
            <p className="btn-text">Log in with google</p>
          </div>
        </section>
      </div>
    </>
  )
}

export default Signup
