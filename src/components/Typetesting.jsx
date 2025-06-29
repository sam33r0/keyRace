import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { finalScoring, resetScore, updateScore } from './../store/scoreSlice';
import Score from './Score';
import calculateWpm, { resetPrevTyped } from './wpmCalculator';
import { useNavigate } from 'react-router-dom';

function Typetesting({ par }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [typedInput, setTypedInput] = useState('');
    const [start, setStart] = useState(false);
    const [wpm, setWpm] = useState(0);
    const [wrg, setWrg] = useState(0);
    const inputRef = useRef(null);
    const paragraphRef = useRef(null);
    const wpmMeter = useRef({});
    const ind = typedInput.length;
    const opp = typedInput.split('');
    const intervalRef = useRef(null);
    const accuracy = (Math.max((1 - ((wrg * 2) / (wrg + par.length))) * 100, 0)).toFixed(2);
    useEffect(() => {
        resetPrevTyped();
        dispatch(resetScore())
    }, [])
    useEffect(() => {
        if (!start) return;
        calculateWpm(par, opp, ind, setWpm);
        wpmMeter.current[ind] = wpm;

        dispatch(updateScore({
            wpmMeter: { ...wpmMeter.current },
            accuracy,
            mistypes: wrg
        }));

        if (ind === par.length) {
            dispatch(finalScoring({ opp, par }));
            navigate('/score');
        }
    }, [typedInput]);

    const handleChange = (e) => {
        const val = e.target.value;
        if (val.length > typedInput.length) {
            const newChar = val[val.length - 1];
            if (newChar !== par[ind]) setWrg(prev => prev + 1);
        }
        setTypedInput(val);
    };
    const handleInputFocus = () => {
        setTimeout(() => {
            paragraphRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }, 300); // allow keyboard animation to start
    };
    useEffect(() => {
        if (start && inputRef.current) {
            intervalRef.current = setInterval(() => {
                if (inputRef.current && document.activeElement !== inputRef.current) {
                    inputRef.current.focus();
                }
            }, 750)
        }
        return () => {
            clearInterval(intervalRef.current)
        }
    }, [start]);

    return (
        <div className="w-full px-4 sm:px-6 md:px-0 md:w-3/4 lg:w-1/2 text-white mx-auto">
            {!start ? (
                <div className="flex flex-col items-center justify-center text-center mt-16 sm:mt-24">
                    <h1 className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-4">Ready to Race? 🏁</h1>
                    <p className="text-sm sm:text-base text-neutral-400 mb-6">Test your typing speed and accuracy. Tap below to begin!</p>
                    <button
                        className="px-5 py-3 sm:px-6 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition duration-300 shadow-lg"
                        onClick={() => setStart(true)}
                    >
                        Start Typing Test
                    </button>
                </div>
            ) : (
                <>
                    <Score wpm={wpm} />

                    <div className="w-full mt-8 p-4 sm:p-5 rounded-lg bg-neutral-900 border border-neutral-700 text-base sm:text-lg font-mono leading-relaxed break-words min-h-[120px]" ref={paragraphRef}>
                        {par.map((char, i) => (
                            <span
                                key={i}
                                className={`
                  ${i === ind ? 'text-yellow-400 underline animate-pulse' : ''}
                  ${i < ind && opp[i] === par[i] ? 'text-white' : ''}
                  ${i < ind && opp[i] !== par[i] ? 'text-red-500' : ''}
                  ${i > ind ? 'text-neutral-500' : ''}
                `}
                            >
                                {char === ' ' && opp[i] !== par[i] && ind > i ? '_' : char}
                            </span>
                        ))}
                    </div>

                    {/* Hidden input for mobile keyboard activation */}
                    {/* <input
                        ref={inputRef}
                        type="text"
                        className="absolute opacity-0 w-0 h-0"
                        autoFocus
                        value={typedInput}
                        onChange={handleChange}
                        onFocus={handleInputFocus}
                    /> */}
                    <input
                        ref={inputRef}
                        type="text"
                        inputMode="text"
                        value={typedInput}
                        autoFocus
                        onChange={handleChange}
                        onFocus={handleInputFocus}
                        className="sr-only"
                    />

                </>
            )}
        </div>
    );
}

export default Typetesting;
