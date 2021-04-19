import React, {FC, useEffect} from 'react'
import ReactDOM from 'react-dom'
const Modal: FC = props => {
  useEffect(() => {
    document.getElementById('modal')!.appendChild(el)
    return () => {
      document.getElementById('modal')!.removeChild(el)
    }
  }, [])

  const el = document.createElement('div')
  el.className = 'modal-bg'

  return ReactDOM.createPortal(props.children, el)
}

export default Modal
