import React, { useState } from "react";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { useAppSelector } from "../hooks/redux";
import "../styles/slider.css";

export interface SliderProps {
    min: number;
    max: number;
}

function Slider(_props: SliderProps): React.ReactElement | null {
    const [min, setMin] = useState(_props.min);
    const [max, setMax] = useState(_props.max);

    const gap = 100;

    const rangeInput: NodeListOf<HTMLInputElement> =
            document.querySelectorAll(".range-input input"),
        priceInput = document.querySelectorAll(".inputs input"),
        range: HTMLInputElement | null =
            document.querySelector(".slider .progress");

    function updateProgress() {
        if (range) {
            range.style.right =
                100 - (Number(max) / _props.max) * 100  + "%";
            range.style.left =
                (Number(min) / _props.max) * 100  + "%";

            console.log();
        }
    }

    function changeMin(e: React.ChangeEvent<HTMLInputElement>) {
        if (max - min >= gap) {
            setMin(Number(e.target.value));
        } else {
            if (min + gap <= _props.max) setMax(min + gap);
            else setMin(_props.max - gap);
        }
        updateProgress();
    }
    function changeMax(e: React.ChangeEvent<HTMLInputElement>) {
        if (max - min >= gap) {
            setMax(Number(e.target.value));
        } else {
            if (max - gap >= _props.min) setMin(max - gap);
            else setMax(_props.min + gap);
        }
        updateProgress();
    }

    return (
        <div className="slider-component">
            <div className="inputs">
                <div className="from">
                    <label className="text">от</label>
                    <input
                        placeholder="104"
                        maxLength={10}
                        value={min}
                        max={_props.max}
                        min={_props.min}
                        onChangeCapture={changeMin}
                        onKeyUp={changeMin}
                    />
                </div>
                <div className="to">
                    <label className="text">до</label>
                    <input
                        placeholder="9999"
                        maxLength={10}
                        value={max}
                        max={_props.max}
                        min={_props.min}
                        onChange={changeMax}
                        onKeyUp={changeMin}
                    />
                </div>
            </div>

            <div className="slider">
                <div className="progress"></div>
            </div>
            <div className="range-input">
                <input
                    type="range"
                    className="range-min"
                    min={_props.min}
                    max={_props.max}
                    value={min}
                    step={1}
                    onChange={changeMin}
                />
                <input
                    type="range"
                    className="range-max"
                    min={_props.min}
                    max={_props.max}
                    value={max}
                    step={1}
                    onChange={changeMax}
                />
            </div>
        </div>
    );
}

export default Slider;
