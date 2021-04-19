import React, {ChangeEvent, useState} from 'react'

const BookBet = () => {
  const [bookingCode, setBookingCode] = useState<string>('')
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBookingCode(e.target.value)
  }
  return (
    <div className="book-bet">
      <p className="book-bet__info">To place a bet, click on the odds. Or insert a booking code</p>

      <div className="">
        <select className="uk-select">
          <option>Nigeria</option>
          <option>Kenya</option>
          <option>Ghana</option>
        </select>
      </div>
      <div className="">
        <input className="uk-input" type="text" placeholder="Booking Code" value={bookingCode} onChange={onInputChange} />
      </div>
      <button className={`uk-button uk-button-default uk-width-1-1 ${bookingCode ? 'active' : 'inactive'}`}>Load</button>
      <p className="book-bet__detail">A booking code enables one to transfer a betslip between different devices.</p>
    </div>
  )
}
export default BookBet
