import React from 'react'

function WordCheck( props) {
    const word = props.word.split('')
    const userInput = props.userInput.split('')

    return (
        <div>
            {
                word.map((symbol, index) => {
                    let color;
                    if (index < props.userInput.length){
                        color = symbol === userInput[index] ? '#00FF00' : "#FF0000";
                    }
                    return <span key ={index} style={{backgroundColor : color}}> {symbol} </span>
                })
            }
            
        </div>
    )
}

export default WordCheck
