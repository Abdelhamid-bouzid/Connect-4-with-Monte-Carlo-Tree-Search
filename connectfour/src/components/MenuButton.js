import React from 'react';
import {buttonLong, buttonShort, disabledButton} from '../assetHelper'
import './styles/MenuButton.css';

const MenuButton =  ({label, isShort, onButtonClick, onHover, onLeave, disabled}) => {

    return (
        <div className='left-menu-button-box'>
            {!disabled ? (
                <>
                    <img src={!isShort ? buttonLong : buttonShort} style={!isShort ? {height: 56, width: 224} : {height: 56, width: 144}} alt='img' />
                    <div
                        className={!isShort ? 'button-box' : 'button-box short'}
                        onClick={onButtonClick}
                        onMouseEnter={() => onHover && onHover(label)}
                        onMouseLeave={() => onLeave && onLeave()}
                    >
                        <div className='text' >{label}</div>
                    </div>
                </>
            ) : (
                <>
                    <img src={disabledButton} style={{height: 56, width: 224}} alt='img' />
                    <div
                        className='button-box-disabled'
                        onMouseEnter={() => onHover && onHover(label)}
                        onMouseLeave={() => onLeave && onLeave()}
                    >
                        <div className='text'>{label}</div>
                    </div>
                </>
            )}
        </div>
    )
}

export default MenuButton