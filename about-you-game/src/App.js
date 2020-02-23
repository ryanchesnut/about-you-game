import React, {useState} from 'react';
import './App.css';

function App() {

  const[gender, setGender] = useState({boy: false, girl: false})
  const[startButton, setStartButton] = useState(true)
  const[radioValue, setRadioValue] = useState({})
  const[submitState, setSubmitState] = useState(false)
  const[favoriteNumber, setFavoriteNumber] = useState()
  const[radioButtonArray] = useState([
    "Hugs and Kisses", "High Fives", "Say Hi!", "Say Bonjour!"
  ])

  const numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const resultsMessage = [ 'Worst', 'Super Duper Bad', 'Super Bad', 'Bad', 'Ok', 'Not Bad' , 'Awesome', 'Great', 'Outstanding' ]

  
  const handleSubmit = () => {
    setSubmitState(true)
  }

  const handleNumberClick = (event) => {
    const favNum = event.target.value
    setFavoriteNumber(favNum)
  }

  let numberButtons = numbers.map(num => {
    return <button key={num} value={num} onClick={handleNumberClick}>{num}</button>
  })

  const handleRadioButton = (event) => {
    let value = event.target.value
    const newradioButtons = radioButtonArray.map(radioButton => {
      let newRadioButton
      if (value !== radioButton) {
        newRadioButton = <li>
          <input key={radioButton} type="radio" value={radioButton} onChange={handleRadioButton} checked={false} />
          <label key={radioButton + 'key'}  htmlFor={radioButton}>{radioButton}</label>
        </li>
      }
      else {
        newRadioButton = <li>
          <input key={radioButton} type="radio" value={radioButton} onChange={handleRadioButton} checked={true} />
          <label key={radioButton + 'key'} for={radioButton}>{radioButton}</label>
        </li>
      }
      return newRadioButton

    })
    setRadioValue(value)
    setRadioButtons(newradioButtons)
  }

  const rb = radioButtonArray.map(radioButton => {
    return (
      <li>
        <input type="radio" value={radioButton} onClick={handleRadioButton} />
        <label for={radioButton}>{radioButton}</label>
      </li>
    )
  })
  const [radioButtons, setRadioButtons] = useState(rb)

  const restartGame = () => {
    setStartButton(true)
    setGender({ boy: false, girl: false })
    setSubmitState(false)
    setFavoriteNumber()
  }

  const startButtonHandler = () => {
    setStartButton(false)
  }

  const handleBoyGirlButton = (e) => {
      let name = e.target.name
    setGender({[name]: true})
  }


  const style = { textAlign: 'center' }

  return (
    <div className="App">
      <header className="App-header">

        {startButton && <div style={style}>
          <h3> About You
            <br/>
          </h3><button  onClick={startButtonHandler}>Push</button>
          </div>
        }
        <br/>

        {!startButton && !gender.boy && !gender.girl &&
          <div style={style}>
            <h3>Are you a boy or a girl?</h3>
            
          <button name="boy" onClick={handleBoyGirlButton}>Boy</button>
          <button name="girl" onClick={handleBoyGirlButton}>Girl</button>
          </div>         
        }

        {(gender.boy === true || gender.girl === true) && !startButton && !submitState &&
          <div style={style}>
            <h3>What Kind of Greeting Do you Like?</h3>
            <ul style={{ textAlign: 'left', listStyleType: 'none'}}>
              {radioButtons}
            </ul>
            <button onClick={handleSubmit}> Submit </button>
          </div>
        }

        {(gender.boy === true || gender.girl === true) && !startButton && submitState && !favoriteNumber &&
          <div style={style}>
            <h3>What Is Your Favorite Number? </h3>
              {numberButtons}
          </div>
        }
        {(gender.boy === true || gender.girl === true) && !startButton && submitState && favoriteNumber &&
          <div style={style}>
            <h3>Results!</h3>
            <h5> Gender: {gender.boy === true && <>Boy</>} {gender.girl === true && <>Girl</>}</h5>
            <h5>What Kind of Greeting Do you Like? {radioValue}</h5>
          <h5>Score: {resultsMessage[favoriteNumber - 1]}</h5>
          </div>
        }

          <br></br>
          <br></br>
        <button onClick={restartGame}> Restart Game</button> 
      </header>
    </div>
  );
}

export default App;
