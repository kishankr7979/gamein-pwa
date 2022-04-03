import React from 'react'
import '.././styles/buttonComponent.css';
const ButtonComponents = (props) => {
    return (
        <div>
            <div className="next-button-container">
                    <button type="submit" className="submit-btn"><img src={props.buttonImage} alt="Next" height="30" width="30" onClick={props.buttonAction}/></button>
                </div>
        </div>
    )
}

export default ButtonComponents;
 