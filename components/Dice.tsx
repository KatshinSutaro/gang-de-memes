import React from 'react';
import './Dice.css';

interface DiceProps {
  value: number;
  label: string;
}

const Face: React.FC<{ faceNumber: number, children: React.ReactNode }> = ({ faceNumber, children }) => {
    const faceClassMap: Record<number, string> = {
        1: 'face--1',
        2: 'face--2',
        3: 'face--3',
        4: 'face--4',
        5: 'face--5',
        6: 'face--6',
    }
    return <div className={`dice__face ${faceClassMap[faceNumber]}`}>{children}</div>;
}

const Dot: React.FC = () => <span className="dot"></span>;

export const Dice: React.FC<DiceProps> = ({ value, label }) => {

  const valueClass = `show--${value}`;

  return (
    <div className="dice-container">
        <span className="text-lg font-bold text-yellow-300 mb-2 drop-shadow-lg">{label}</span>
        <div className="scene">
            <div className={`dice ${valueClass}`}>
                <Face faceNumber={1}>
                    <Dot />
                </Face>
                <Face faceNumber={2}>
                    <Dot />
                    <Dot />
                </Face>
                <Face faceNumber={3}>
                    <Dot />
                    <Dot />
                    <Dot />
                </Face>
                <Face faceNumber={4}>
                    <div className="column"><Dot /><Dot /></div>
                    <div className="column"><Dot /><Dot /></div>
                </Face>
                <Face faceNumber={5}>
                    <div className="column"><Dot /><Dot /></div>
                    <Dot />
                    <div className="column"><Dot /><Dot /></div>
                </Face>
                <Face faceNumber={6}>
                    <div className="column"><Dot /><Dot /><Dot /></div>
                    <div className="column"><Dot /><Dot /><Dot /></div>
                </Face>
            </div>
        </div>
    </div>
  );
};
