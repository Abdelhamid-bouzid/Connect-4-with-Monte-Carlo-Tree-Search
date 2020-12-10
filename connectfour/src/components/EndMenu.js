import React, { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import {animated, useSpring, config} from 'react-spring'
import {setScreen, setPlayerOne, setPlayerTwo} from '../redux/Actions'
import MenuButton from './MenuButton'
import { avatars, leftMenu, playerMenu } from '../assetHelper'
import { setTurns } from '../helpers/gameLogic'
import './styles/EndMenu.css'

const EndMenu = ({changeMenuState}) => {
    const dispatch = useDispatch()

    const [modeHovered, setModeHover] = useState(null)
    const [gameType, setGameType] = useState(null)
    const [selectedAvatar, setAvatar] = useState({
        player1: null,
        player2: null
    })
    const [nickname, setName] = useState({
        player1: null,
        player2: null
    })
    const [difficulty, setDifficulty] = useState({
        player1: null,
        player2: null
    })
    const [isReady, setReady] = useState({
        player1: false,
        player2: false
    })


    /************************************* */
    //Animation stuff, don't need to do anything here
    const [visible, setVisible] = useState({
        startForm: false,
        endMenu: true
    })
    const [shouldAnimate, setAnimate] = useState({
        leftMenu: false,
        players: false,
        start: false
    })

    const leftTranlate = useSpring({
        config: {...config.stiff},
        transform: shouldAnimate.leftMenu ? 'translateX(0%)' : 'translateX(-300%)'
    })

    const playerOpacity = useSpring({
        config: {...config.stiff},
        opacity: shouldAnimate.players ? 1 : 0
    })

    const animateStartButton = useSpring({
        config: {...config.stiff},
        transform: shouldAnimate.start ? 'translateY(0%)' : 'translateY(80%)'
    })
    /******************************************/


    const onModeSelectHover = (label) => {
        setModeHover(label)
    }

    const onModeSelectLeave = () => {
        setModeHover(null)
    }

    const onModeSelect = (type) => {
        if(type === gameType) {
            return
        }

        setGameType(null)
        setAvatar({...selectedAvatar, player2: null})
        setReady({...isReady, player2: false})

        if(shouldAnimate.players) {
            setAnimate({...shouldAnimate, players: false})
        }
        setTimeout(() => setGameType(type), 200)
    }

    const onP1Select = (av) => {
        setAvatar({...selectedAvatar, player1: av})
    }

    const onP2Select = (av) => {
        setAvatar({...selectedAvatar,player2: av})
    }

    const handleTextChange = (e) => {
        setName({...nickname, player1: e.target.value})
    }

    const handleTextChangeTwo = (e) => {
        setName({...nickname, player2: e.target.value})
    }


    const handleReadySubmit = () => {
        setReady({...isReady, player1: true})
    }

    const onGoButtonClick = () => {
        dispatch(setScreen('loading'))
    }

    //Some description about the game modes goes here I guess
    const renderModeDescription = () => {
        if(modeHovered === 'Local') {
            return <div className='text' >Play your friends locally in a game of connect four</div>
        } else if (modeHovered === 'Online') {
            return <div className='text' >Coming soon...</div>
        } else if(modeHovered === 'vs CPU') {
            return <div className='text' >Play a CPU player in a game of connect four</div>
        }
    }
    const renderGameModeSelect = () => {
        return (
            <div className='left-menu-box'>
                <img src={leftMenu} style={{height: 808, width: 256}} alt='img' />
                <div className='select-mode-box'>
                    <div className='mode-header text'>Game Modes</div>
                    <MenuButton label="Local" onHover={onModeSelectHover} onLeave={onModeSelectLeave} onButtonClick={() => onModeSelect('local')} />
                    <MenuButton label="vs CPU" onHover={onModeSelectHover} onLeave={onModeSelectLeave} onButtonClick={() => onModeSelect('cpu')} />
                    <MenuButton label="Online" onHover={onModeSelectHover} onLeave={onModeSelectLeave} onButtonClick={() => onModeSelect('online')} disabled />
                    <div style={{marginTop: 80, fontSize: 32, marginLeft: 16, marginRight: 16}}>{renderModeDescription()}</div>
                    <div className='back-menu-button text' onClick={() => changeMenuState()}>
                        Go Back
                    </div>
                </div>
            </div>
        )
    }

    //Only render both player menus if local game, might save us some time 
    //since the user can't touch the player two menu if not local

    const renderPlayerInfo = () => {
        const renderPlayerTwoInfo = () => {
            return gameType === 'local' ? (
                <div className='player-box'>
                    <img src={playerMenu} style={{height: 540, width: 264}} alt='img' />
                    <div className='player-info-box'>
                        <div className='nickname-input text'>
                            <input className='text' type='text' maxLength={8} minLength={1} onChange={handleTextChangeTwo} placeholder='Player 2' />
                        </div>
                        <div className='avatar-select'>
                            <div className='avatar-row-box'>
                                <div className={selectedAvatar.player2 === 'cowboy' ? 'avatar-box left selected' : 'avatar-box left'}  onClick={() => onP2Select('cowboy')}>
                                    <img className='avatar' src={avatars.cowboy} />
                                </div>
                                <div className={selectedAvatar.player2 === 'cat' ? 'avatar-box selected' : 'avatar-box'} onClick={() => onP2Select('cat')}>
                                    <img className='avatar' src={avatars.cat} />
                                </div>
                            </div>
                            <div className='avatar-row-box'>
                                <div className={selectedAvatar.player2 === 'shoe' ? 'avatar-box left selected' : 'avatar-box left'} onClick={() => onP2Select('shoe')}>
                                    <img className='avatar' src={avatars.shoe} />
                                </div>
                                <div className={selectedAvatar.player2 === 'ninja' ? 'avatar-box selected' : 'avatar-box'} onClick={() => onP2Select('ninja')}>
                                    <img className='avatar' src={avatars.ninja} />
                                </div>
                            </div>
                            <div className='avatar-row-box'>
                                <div className={selectedAvatar.player2 === 'skeleton' ? 'avatar-box left selected' : 'avatar-box left'} onClick={() => onP2Select('skeleton')}>
                                    <img className='avatar' src={avatars.skeleton} />
                                </div>
                                <div className={selectedAvatar.player2 === 'eye' ? 'avatar-box selected' : 'avatar-box'} onClick={() => onP2Select('eye')}>
                                    <img className='avatar' src={avatars.eye} />
                                </div>
                            </div>
                        </div>
                        <div 
                            className={selectedAvatar.player2 !== null && nickname.player2 != null && nickname.player2.length > 0 ? (isReady.player2 ? 'ready-button clicked text' : 'ready-button text') : 'ready-button hidden'} 
                            onClick={() => setReady({...isReady, player2: true})}
                        >
                            {isReady.player2 ? 'Ready!' : 'Ready?'}
                        </div>
                    </div>
                </div>
            ) : (
                <div className='player-box'>
                    <img src={playerMenu} style={{height: 540, width: 264}} alt='img' />
                    <div className='player-info-box'>
                        <div className='difficulty-header text'>Difficulty</div>
                        <div 
                            className={difficulty.player2 === 'EASY' ? 'difficulty-button clicked text' : 'difficulty-button text'}
                            onClick={() => {
                                setReady({...isReady, player2: true})
                                setDifficulty({...difficulty, player2: 'EASY'})
                            }}
                        >
                            Recruit
                        </div>
                        <div
                            className={difficulty.player2 === 'MEDIUM' ? 'difficulty-button clicked text' : 'difficulty-button text'}
                            onClick={() => {
                                setReady({...isReady, player2: true})
                                setDifficulty({...difficulty, player2: 'MEDIUM'})
                            }}
                        >
                            Hardened
                        </div>
                        <div
                            className={difficulty.player2 === 'HARD' ? 'difficulty-button clicked text' : 'difficulty-button text'}
                            onClick={() => {
                                setReady({...isReady, player2: true})
                                setDifficulty({...difficulty, player2: 'HARD'})
                            }}
                            style={{marginBottom: 64}}
                        >
                            Veteran
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className='box-container'>
                <div className='player-box'>
                    <img src={playerMenu} style={{height: 540, width: 264}} alt='img' />
                    <div className='player-info-box'>
                        <div className='nickname-input text'>
                            <input className='text' type='text' maxLength={8} minLength={1} onChange={handleTextChange} placeholder='Player 1' />
                        </div>
                        <div className='avatar-select'>
                            <div className='avatar-row-box'>
                                <div className={selectedAvatar.player1 === 'cowboy' ? 'avatar-box left selected' : 'avatar-box left'} onClick={() => onP1Select('cowboy')}>
                                    <img className='avatar' src={avatars.cowboy} />
                                </div>
                                <div className={selectedAvatar.player1 === 'cat' ? 'avatar-box selected' : 'avatar-box'} onClick={() => onP1Select('cat')}>
                                    <img className='avatar' src={avatars.cat} />
                                </div>
                            </div>
                            <div className='avatar-row-box'>
                                <div className={selectedAvatar.player1 === 'shoe' ? 'avatar-box left selected' : 'avatar-box left'} onClick={() => onP1Select('shoe')}>
                                    <img className='avatar' src={avatars.shoe} />
                                </div>
                                <div className={selectedAvatar.player1 === 'ninja' ? 'avatar-box selected' : 'avatar-box'} onClick={() => onP1Select('ninja')}>
                                    <img className='avatar' src={avatars.ninja} />
                                </div>
                            </div>
                            <div className='avatar-row-box'>
                                <div className={selectedAvatar.player1 === 'skeleton' ? 'avatar-box left selected' : 'avatar-box left'} onClick={() => onP1Select('skeleton')}>
                                    <img className='avatar' src={avatars.skeleton} />
                                </div>
                                <div className={selectedAvatar.player1 === 'eye' ? 'avatar-box selected' : 'avatar-box'} onClick={() => onP1Select('eye')}>
                                    <img className='avatar' src={avatars.eye} />
                                </div>
                            </div>
                        </div>
                        <div className={selectedAvatar.player1 !== null && nickname.player1 != null && nickname.player1.length > 0  ?  (isReady.player1 ? 'ready-button clicked text' : 'ready-button text') : 'ready-button hidden'} onClick={handleReadySubmit}>
                        {isReady.player1 ? 'Ready!' : 'Ready?'}
                        </div>
                    </div>
                </div>
                {renderPlayerTwoInfo()}
            </div>
        )
    }

    //Only for refresh for now
    useEffect(() => {

    }, [modeHovered])

    //Setting the game type for refresh and so it can be refenced else
    useEffect(() => {
        //Force player names to P1 and P2 if local
        if(gameType === 'local') {
            setName("Player 1")
        }
        if(gameType === 'cpu') {
            setAvatar({...selectedAvatar, player2: 'cpu'})
        }
        
        //Animation
        if(gameType !== null) {
            setAnimate({...shouldAnimate, players: true})
        }
    }, [gameType])

    //For refresh and collecting player data
    useEffect(() => {
    }, [selectedAvatar, nickname, difficulty])

    //Checking if both players are ready, not sure how
    //this will work with an online player
    useEffect(() => {
        const {player1, player2} = isReady
        if(player1 && player2) {
            const turn = setTurns()
            /**************************************/
            // Create/Push player object to context
            /**************************************/
            if(gameType === 'local') {
                dispatch(setPlayerOne(nickname.player1, turn.P1, selectedAvatar.player1, 'HUMAN'))
                dispatch(setPlayerTwo(nickname.player2, turn.P2, selectedAvatar.player2, 'HUMAN'))
            } else if (gameType === 'cpu') {
                dispatch(setPlayerOne(nickname.player1, turn.P1, selectedAvatar.player1, 'HUMAN'))
                dispatch(setPlayerTwo('CPU', turn.P2, selectedAvatar.player2, difficulty.player2))
            } else  {
                // dispatch(setPlayerOne(nickname, turn.P1, selectedAvatar.player1, 'HUMAN'))
                //How are we doing the second player
            }
            setVisible({...visible, startForm: true})
        }
    },[isReady])

    //This useEffect is only for animations for right now
    useEffect(() => {
        if(visible.endMenu) {
            setAnimate({...shouldAnimate, leftMenu: true})
        }
        if(visible.startForm) {
            setAnimate({...shouldAnimate, start: true})
        }
    },[visible])

    return (
        <>
        <div className='end-container'>
            <animated.div className='animated-container-left' style={leftTranlate}>
                {renderGameModeSelect()}
            </animated.div>
            <animated.div className='animated-container-right' style={playerOpacity}>
                {renderPlayerInfo(gameType)}
            </animated.div>
        </div>
        {visible.startForm ? (

            //On the GO button, create click listener function to set screen the game
            //and pass player object(s) into context so that we can send them to the backend
            //and use the info for the game screen

            //this will initiate some kind of loading sequence also, so the the front and back end have
            //time to process the player objects

            <animated.div className='start-form' style={animateStartButton}>
                <img className='avatar' src={avatars[selectedAvatar.player1]} alt='img' />
                <MenuButton label='GO' isShort onButtonClick={onGoButtonClick} />
                <img className='avatar avatar-two' src={avatars[selectedAvatar.player2]} alt='img' />
            </animated.div>
        ) : null}
        </>
    )
}

export default EndMenu