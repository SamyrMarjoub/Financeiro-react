import React, { Component } from "react";
import dollar from '../images/dollar.svg'
class Header extends Component {

    render() {
        return (
            <header className='header'>
                <div className='header-container'>
                    <div className='container-name-div'>
                        <div className='dollar-div'> <img src={dollar} alt='..' /> </div>
                        <h2>Quasar</h2>
                    </div>
                    <div className='container-name-div end'>
                        <h2>Controle de Finanças</h2>
                    </div>
                </div>
            </header>
        )
    }

}
export default Header