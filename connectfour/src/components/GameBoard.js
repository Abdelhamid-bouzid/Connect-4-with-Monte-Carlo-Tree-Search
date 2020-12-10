import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import { gameboardSprite, avatars } from '../assetHelper'
import Column from './Column'
import PreviewSpace from './PreviewSpace'
import {spaceType} from '../types/types'
import './styles/GameBoard.css'

const {RED, BLACK} = spaceType

const GameBoard = ({onGameEnd}) => {
    const [hoveredCol, setHovered] = useState(null)
    const [winningPieces, setWinArray] = useState([])
    const [turn, setTurn] = useState(spaceType.RED)
    const [moves, setMoves] = useState([])
    const [selectedCol, setSelected] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [currentReplayMove, setReplayMove] = useState(0)

    const playerOne = useSelector(state => state.player1)
    const playerTwo = useSelector(state => state.player2)
    const gameId = useSelector(state => state.gameId)
    const replayMoves = useSelector(state => state.replayMoves)

    const playerOneAvatar = playerOne.avatar
    const playerTwoAvatar = playerTwo.avatar

    const setWinningPieces = (gameEnd) => {
        setWinArray(gameEnd.winning)
    }

    const concludeGame = ({endState, player}) => {
        onGameEnd({endState, player})
        setDisabled(true)

        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(this.readyState === 4) {
                let requestedJSON = JSON.parse(this.responseText)
            }
        }

        let requestObject = {
            'id': gameId,
            'firstPlayer': {
                'nickname': playerOne.color === RED ? playerOne.nickname : playerTwo.nickname,
                'color': 'RED',
                'avatar': playerOne.color === RED ? playerOne.avatar : playerTwo.avatar,
                'difficulty': playerOne.color === RED ? playerOne.difficulty : playerTwo.difficulty 
            },
            'secondPlayer': {
                'nickname': playerOne.color === BLACK ? playerOne.nickname : playerTwo.nickname,
                'color': 'BLACK',
                'avatar': playerOne.color === BLACK ? playerOne.avatar : playerTwo.avatar,
                'difficulty': playerOne.color === BLACK ? playerOne.difficulty : playerTwo.difficulty
            },
            'moves': moves,
            'timestamp': Date.now(),
            'inProgress': false
        }

        xhttp.open('POST', 'http://34.72.25.108/', true)
        xhttp.setRequestHeader('Content-Type', 'application/json')
        xhttp.send(JSON.stringify(requestObject))
    }

    const onHover = (e) => {
        setHovered(Number(e.target.id))
    }

    const onNotHover = () => {
        setHovered(null)
    }

    const toggleTurn = () => {
        setSelected(null)
        if (turn === spaceType.RED) {
            setTurn(spaceType.BLACK)
        } else {
            setTurn(spaceType.RED)
        }
    }

    const addMoveToList = (colId) => {
        setMoves([...moves, colId])
    }

    useEffect(() => {
        if(playerTwo.difficulty !== 'HUMAN' && turn === playerTwo.color) {
            //make post request
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if(this.readyState == 4) {
                    let requestedJSON = JSON.parse(this.responseText)
                    let AIMove = requestedJSON.moves.pop()
                    setSelected(AIMove)
                }
            }

            let requestObject = {
                'id': gameId,
                'firstPlayer': {
                    'nickname': playerOne.color === RED ? playerOne.nickname : playerTwo.nickname,
                    'color': 'RED',
                    'avatar': playerOne.color === RED ? playerOne.avatar : playerTwo.avatar,
                    'difficulty': playerOne.color === RED ? playerOne.difficulty : playerTwo.difficulty 
                },
                'secondPlayer': {
                    'nickname': playerOne.color === BLACK ? playerOne.nickname : playerTwo.nickname,
                    'color': 'BLACK',
                    'avatar': playerOne.color === BLACK ? playerOne.avatar : playerTwo.avatar,
                    'difficulty': playerOne.color === BLACK ? playerOne.difficulty : playerTwo.difficulty
                },
                'moves': moves,
                'timestamp': Date.now(),
                'inProgress': true
            }

            xhttp.open('POST', 'http://34.72.25.108/', true)
            xhttp.setRequestHeader('Content-Type', 'application/json')
            xhttp.send(JSON.stringify(requestObject))
        }
    },[turn])

    useEffect(() => {
    },[winningPieces])

    useEffect(() => {
        if(replayMoves.length > 0 && currentReplayMove < replayMoves.length) {
            setTimeout(() => setSelected(replayMoves[currentReplayMove]), 1000)
        }
    },[currentReplayMove])

    useEffect(() => {
        if(selectedCol !== null) setReplayMove(currentReplayMove + 1)
    },[selectedCol])

    return(
        <div className={
                !(replayMoves.length > 0) && 
                !disabled && 
                (playerTwo.difficulty === 'HUMAN' || playerOne.color === turn) 
                ? 'board-container' : 'board-container disabled'}
        >
            <div className='preview-box'>
                {
                    [...Array(7)].map((x, i) => 
                    <PreviewSpace key={i} id={i} shouldShow={hoveredCol === i} turn={turn} />)
                }
            </div>
            <img src={gameboardSprite} alt='img' />

            <div className='gameboard'>
                {
                    [...Array(7)].map((x, i) => 
                    <Column
                        key={i}
                        id={i}
                        turn={turn}
                        isSelected={selectedCol === i && selectedCol !== null}
                        onPlayerMove={addMoveToList}
                        winning={winningPieces}
                        toggleTurn={toggleTurn}
                        onHover={onHover}
                        onNotHover={onNotHover}
                        onEnd={concludeGame}
                        setWinningPieces={setWinningPieces} />)
                }
            </div>
            <div className='players-box'>
                <div className={turn === playerOne.color ? 'player-icon' : 'player-icon transparent'}>
                    <img className='avatar' src={avatars[playerOneAvatar]}/>
                    <div className='nickname text' style={{marginTop: 8}}>{playerOne.nickname}</div>
                </div>
                <div className={turn === playerTwo.color ? 'player-icon' : 'player-icon transparent'}>
                    <img className='avatar avatar-two' src={avatars[playerTwoAvatar]} />
                    <div className='nickname text' style={{marginTop: 8}}>{playerTwo.nickname}</div>
                </div>
            </div>
        </div>
    )
}

export default GameBoard;