import React, {useState, useEffect, useMemo} from 'react'
import Space from './Space'
import {spaceType, endType} from '../types/types'
import {useSelector} from 'react-redux'
import {checkEnd} from '../helpers/gameLogic'

const Column = ({id, turn, onPlayerMove, isSelected, toggleTurn, winning, onHover, onNotHover, onEnd, setWinningPieces}) => {

    const gameMoveArray = useSelector(state => state.moveArray)

    const {EMPTY} = spaceType
    const {NONE, TIE, WIN} = endType
    
    const [selected, setSelected] = useState(false)
    const [nextIndex, setIndex] = useState(0)
    const [array, setArray] = useState([
        EMPTY, 
        EMPTY, 
        EMPTY, 
        EMPTY, 
        EMPTY, 
        EMPTY
    ])

    const spaceArray = array

    const onColumnSelect = (e) => {
        setSelected(true)
    }

    useEffect(() => {
        if( (isSelected || selected) && nextIndex < 6) {
            onPlayerMove(id)
            spaceArray[nextIndex] = turn
            setArray([...array, spaceArray])
        }
    }, [selected, isSelected])

    useEffect(() => {
        setSelected(false)
        if(!gameMoveArray.every(column => column.every(space => space === EMPTY))) {
            const gameEnd = checkEnd(gameMoveArray, id, 5 - nextIndex)
            if(gameEnd.end === NONE) {
                setIndex(nextIndex + 1)
                toggleTurn()
            } else if (gameEnd.end === TIE) {
                onEnd({
                    endState: TIE,
                    player: null
                })
            } else if (gameEnd.end === WIN) {
                setWinningPieces(gameEnd)
                onEnd({
                    endState: WIN,
                    player: turn
                })
            }
        }
    }, [array])

    useEffect(() => {
    },[nextIndex])

    return (
        <div className='column' key={id} id={id} onClick={onColumnSelect} onMouseEnter={onHover} onMouseLeave={onNotHover}>
        {
            useMemo(() => [...Array(6)].map((x, i) => 
            <Space key={`${id}${i}`} id={i} colId={id} color={array[5 - i]} winning={winning} />), [array, winning])
        }
        </div>
    )
}

export default Column