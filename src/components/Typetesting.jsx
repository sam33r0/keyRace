import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { finalScoring, updateScore } from './../store/scoreSlice'
import Score from './Score';
import calculateWpm from './wpmCalculator';
import { useNavigate } from 'react-router-dom';
function Typetesting({ par }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ind, setInd] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [wrg, setWrg] = useState(0);
    const [start, setStart] = useState(false);
    const wpmMeter = useRef({});
    let accuracy = (Math.max((1 - ((wrg * 2) / (wrg + par.length))) * 100, 0)).toFixed(2);
    const allowedKeys = [...'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM, ."!@-_/;:']
    const keyDownFunc = (e) => {
        if (!allowedKeys.includes(e.key)) return;
        // calculateWpm(par, opp, ind);
        setStart(prevStart => {
            if (prevStart)
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
                })
            return prevStart
        });
    };
    const [opp, setOpp] = useState((new Array(par.length)).fill(''));
    useEffect(() => {
        calculateWpm(par, opp, ind, setWpm)
    }, [opp, par, ind, setInd, setOpp, setWpm])
    useEffect(() => {
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
                navigate('/score')
            }
        }
    }, [wpm, ind, wrg]);
    useEffect(() => {
        allowedKeys.push('Backspace');
        allowedKeys.push("'");
        setWpm(0)
        window.addEventListener('keydown', keyDownFunc);
        return () => {
            setStart(false);
            window.removeEventListener('keydown', keyDownFunc)
        }
    }, [])
    return (
        <div className='lg:w-1/2 w-3/4 text-white'>
            {!start && (
                <div className="w-full flex flex-col items-center justify-center text-center mt-20">
                    <h1 className="text-3xl font-bold text-emerald-400 mb-4">Ready to Race? 🏁</h1>
                    <p className="text-neutral-400 mb-6">Test your typing speed and accuracy. Click below to begin!</p>
                    <button
                        className="px-6 py-3 bg-emerald-500 hover:cursor-pointer hover:bg-emerald-600 text-white font-semibold rounded-lg transition duration-300 shadow-lg"
                        onClick={() => setStart(true)}
                    >
                        Start Typing Test
                    </button>
                </div>
            )}

            {start && <>
                <Score wpm={wpm} />
                {/* <div className='mt-7 text-lg'>
                    {par.map((e, i) => {
                        return <span key={`${e}${i}`} className={`${i == ind ? 'text-yellow-500' : opp[i] === par[i] ? 'text-gray-50' : opp[i] === '' ? 'text-gray-500' : 'text-red-500'}`}>{e == ' ' && i == ind ? `_` : e == ' ' && ind > i && opp[i] != ' ' ? '_' : e}</span>
                    })}
                </div> */}
                <div className="w-full mt-8 p-4 rounded-lg bg-neutral-900 border border-neutral-700 text-lg font-mono leading-relaxed break-words">
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
            </>}
        </div>
    )
}

export default Typetesting