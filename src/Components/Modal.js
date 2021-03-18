import React from 'react'
import ReactDOM from 'react-dom'
class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
    this.el.className = 'modal-bg'
  }

  componentDidMount() {
    document.getElementById('modal').appendChild(this.el)
  }

  componentWillUnmount() {
    document.getElementById('modal').removeChild(this.el)
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}

export default Modal
