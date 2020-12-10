import React, { useState } from 'react'
import Spritesheet from 'react-responsive-spritesheet'
import { redPiece, blackPiece, redWinSpriteSheet, blackWinSpriteSheet } from '../assetHelper'


const GamePiece = ({color, shouldChange, isPreview, delay}) => {
    const [spriteSheetInstance, setInstance] = useState(null)

    if(shouldChange && spriteSheetInstance !== null) {
        if(delay !== null) {
            setTimeout(() => spriteSheetInstance.play(), delay)
        } else {
            spriteSheetInstance.play()
        }
    }

    if(isPreview) {
        return color === 'red' ? (
            <img src={redPiece} />
        ) : (
            <img src={blackPiece} />
        )
    }

    return color === 'red' ? (
        <Spritesheet
            className='game-sprite'
            image={redWinSpriteSheet}
            widthFrame={56}
            heightFrame={56}
            steps={7}
            fps={10}
            autoplay={false}
            loop={false}
            onInit={spritesheet => setInstance(spritesheet)}
        />
    ) : (
        <Spritesheet
            className='game-sprite'
            image={blackWinSpriteSheet}
            widthFrame={56}
            heightFrame={56}
            steps={7}
            fps={10}
            autoplay={false}
            loop={false}
            onInit={spritesheet => setInstance(spritesheet)}
        />
    )
}

export default GamePiece