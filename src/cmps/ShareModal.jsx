import { useSelector } from 'react-redux'
import emailjs from 'emailjs-com'
import { useState } from 'react'

export function ShareModal({ note, onClose, link }) {
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)

  const [content, setConten] = useState(note.info.txt)

  const sendEmail = (e) => {
    e.preventDefault()
    const friendEmail = e.target.elements.friendEmail.value

    const templateParams = {
      from_name: user.name,
      note_content: content,
      friend_email: friendEmail,
      user_email: user.email,
      reply_to: user.email,
      curr_link: link,
    }

    switch (note.type) {
      case 'NoteTxt':
        setConten(note.info.txt)
        break
      case 'NoteTodos':
        const todosText = note.info.todos.map((todo) => todo.txt).join(', ')
        setConten(todosText)
        break
      case 'NoteImg':
        setConten('Image note')
        break
      case 'NoteAudio':
        setConten('Audio note')
        break
      case 'NoteVideo':
        setConten('Video note')
        break
      default:
    }

    emailjs
      .send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_KEEP_ID,
        templateParams,
        process.env.REACT_APP_USER_ID
      )
      .then(
        (result) => {
          onClose()
        },
        (error) => {
          console.log(error.text)
        }
      )
  }

  return (
    <div className="backdrop">
      <div className="share-modal">
        <button className="close-modal" onClick={onClose}>
          X
        </button>
        <h1>Share with friend</h1>
        <form onSubmit={sendEmail}>
          <input
            type="email"
            name="friendEmail"
            placeholder="enter friend email"
            required
          />
          <button type="submit">send</button>
        </form>
      </div>
    </div>
  )
}
