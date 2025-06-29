import React, { useEffect, useRef, useState } from 'react'
import calculateWpm from '../wpmCalculator';
import Score from '../Score';
import { finalScoring, updateScore } from '../../store/scoreSlice'

import { useDispatch } from 'react-redux';
import ProgressMP from './ProgressMP';
import AvatarRaceTrack from './AvatarRaceTrack';

function MPTypeTesting({ par, socket, time }) {
    const [ind, setInd] = useState(0);
    const wpmMeter = useRef({});
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const [wpm, setWpm] = useState(0);
    const [wrg, setWrg] = useState(0);
    let accuracy = (Math.max((1 - ((wrg * 2) / (wrg + par.length))) * 100, 0)).toFixed(2);
    const allowedKeys = [...'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM, ."!@-_/;:']
    const keyDownFunc = (e) => {
        e.preventDefault();
        if (!allowedKeys.includes(e.key)) return;
        // calculateWpm(par, opp, ind);

        setInd(prevInd => {
            if (e.key === 'Backspace') {
                if (prevInd > 0) {
                    setOpp(oldOpp => {
                        const updated = [...oldOpp];
                        updated[prevInd - 1] = '';
                        return updated;
                    });
                    return prevInd - 1;
                }
                return prevInd;
            }

            if (prevInd === par.length) return prevInd;
            if (e.key != par[prevInd]) {
                setWrg(prev => prev + 1);
            }
            setOpp(oldOpp => {
                const updated = [...oldOpp];
                updated[prevInd] = e.key;
                return updated;
            });

            return prevInd + 1;
        });
    };
    const [opp, setOpp] = useState((new Array(par.length)).fill(''));
    useEffect(() => {
        calculateWpm(par, opp, ind, setWpm)
    }, [opp, par, ind, setInd, setOpp, setWpm])
    useEffect(() => {
        allowedKeys.push('Backspace');
        allowedKeys.push("'");
        setWpm(0)
        // socket.on('game-stop', (data) => {
        //     console.log('server asked to stop the game', data)
        // })
        socket.on('roomScore-update', (data) => {
            // console.log(data)
            setUsers(data.users)
        })
        window.addEventListener('keydown', keyDownFunc);
        return () => {
            window.removeEventListener('keydown', keyDownFunc)
        }
    }, [])
    useEffect(() => {
        socket.emit('score-update', {
            progress: Number((opp.reduce((prev, cur, i) => {
                return cur === par[i] ? prev + 1 : prev
            }, 0) / par.length) * 100).toFixed(2)
        });
        if (ind <= par.length) {
            wpmMeter.current[ind] = wpm;
            dispatch(updateScore({
                wpmMeter: { ...wpmMeter.current },
                accuracy,
                mistypes: wrg
            }));
            if (ind === par.length) {
                dispatch(finalScoring({
                    opp, par
                }))
                // navigate('/score')
            }
        }
    }, [wpm, ind, wrg]);
    const [remainingTime, setRemainingTime] = useState(Number.parseInt(time / 1000) - 1);

    // useEffect(() => {
    //     if (remainingTime <= 0) return;

    //     const interval = setInterval(() => {
    //         setRemainingTime(prev => prev - 1);
    //     }, 1000);

    //     return () => clearInterval(interval);
    // }, [remainingTime]);

    useEffect(() => {
        const handleTimeUpdate = (time) => {
            setRemainingTime(time);
        };

        socket.on('time-update', handleTimeUpdate);

        return () => {
            socket.off('time-update', handleTimeUpdate);
        };
    }, []);

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    // return (
    //     <>
    //         <div className='w-screen h-screen flex justify-center items-start p-20 bg-black'>
    //             <div className='w-1/2 text-white'>
    //                 <div className='mt-7 text-lg'>
    //                     {par.map((e, i) => {
    //                         return <span key={`${e}${i}`} className={`${i == ind ? 'text-yellow-500' : opp[i] === par[i] ? 'text-gray-50' : opp[i] === '' ? 'text-gray-500' : 'text-red-500'}`}>{e == ' ' && i == ind ? `_` : e == ' ' && ind > i && opp[i] != ' ' ? '_' : e}</span>
    //                     })}
    //                 </div>
    //                 <Score wpm={wpm} />
    //                 <ProgressMP users={users} />
    //             </div>
    //         </div>
    //     </>
    // )
    return (
        <div className="w-screen h-full bg-black text-white px-8 flex flex-col gap-8 items-center">
            {/* Countdown Clock */}
            <div className="text-3xl font-mono font-bold text-yellow-400 bg-neutral-800 px-6 py-2 rounded-full shadow-md border border-yellow-500">
                ⏱️ {formatTime(remainingTime)}
            </div>
            {/* Game Section Layout */}
            <div className="w-full max-w-6xl flex flex-col gap-10 items-center">


                {/* Self Progress */}
                <div className="w-full">
                    <div className="text-sm text-neutral-400 mb-1">Your Progress</div>
                    <div className="h-2 bg-neutral-700 rounded">
                        <div
                            className="h-2 bg-emerald-500 rounded transition-all duration-300"
                            style={{ width: `${((ind / par.length) * 100).toFixed(2)}%` }}
                        />
                    </div>
                </div>

                {/* Paragraph Display */}
                <div className="w-full p-4 rounded-lg bg-neutral-900 border border-neutral-700 text-lg font-mono leading-relaxed break-words">
                    {par.map((char, i) => (
                        <span
                            key={`${char}${i}`}
                            className={`
            ${i === ind ? 'text-yellow-400 underline animate-pulse' : ''}
            ${i < ind && opp[i] === par[i] ? 'text-white' : ''}
            ${i < ind && opp[i] !== par[i] ? 'text-red-500' : ''}
            ${i > ind ? 'text-neutral-500' : ''}
          `}
                        >
                            {char === ' ' && opp[i] != par[i] && ind > i ? '_' : char}
                        </span>
                    ))}
                </div>
                <AvatarRaceTrack users={users} selfSocketId={socket.id} />
                <div className='lg:flex w-full'>
                    {/* Live WPM */}
                    <Score wpm={wpm} />
                    {/* Other Players' Progress */}
                    <ProgressMP users={users} />
                </div>
            </div>
        </div>
    )
}

export default MPTypeTesting