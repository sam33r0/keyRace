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
    const wpmMeter = useRef({});
    let accuracy = (Math.max((1 - ((wrg * 2) / (wrg + par.length))) * 100, 0)).toFixed(2);
    const allowedKeys = [...'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM, .!@-_/;:']
    const keyDownFunc = (e) => {
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
        window.addEventListener('keydown', keyDownFunc);
        return () => {
            window.removeEventListener('keydown', keyDownFunc)
        }
    }, [])
    return (
        <div className='w-1/2 text-white'>
            <Score wpm={wpm} />
            <div className='mt-7 text-lg'>
                {par.map((e, i) => {
                    return <span key={`${e}${i}`} className={`${i == ind ? 'text-yellow-500' : opp[i] === par[i] ? 'text-gray-50' : opp[i] === '' ? 'text-gray-500' : 'text-red-500'}`}>{e == ' ' && i == ind ? `_` : e == ' ' && ind > i && opp[i] != ' ' ? '_' : e}</span>
                })}
            </div>
        </div>
    )
}

export default Typetesting