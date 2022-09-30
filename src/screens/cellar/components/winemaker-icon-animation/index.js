/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import styled from "styled-components";
import CriticsIcon from "../CriticsIcon";

const changeIndex = (dataArray, index, compareIndex) => {
    const getNewIndex = (dataArr, i) => (i + 1 === dataArr.length ? 0 : i + 1);

    const newIndex = getNewIndex(dataArray, index);

    return newIndex === compareIndex ? getNewIndex(dataArray, newIndex) : newIndex;
};

const WinemakerIconAnimation = ({ data = [] }) => {
    if (data.length < 1) return null;

    const [deg, setDeg] = React.useState({ deg: 0 });

    const [sides, setSides] = React.useState({
        front: 0,
        back: 1,
        isFrontSide: true,
    });

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (typeof document.hidden === "undefined" || !document.hidden) {
                setSides((lastSides) => {
                    if (lastSides.isFrontSide) {
                        return {
                            ...lastSides,
                            front: changeIndex(data, lastSides.front, lastSides.back),
                            isFrontSide: !lastSides.isFrontSide,
                        };
                    }
                    return {
                        ...lastSides,
                        back: changeIndex(data, lastSides.back, lastSides.front),
                        isFrontSide: !lastSides.isFrontSide,
                    };
                });
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [data]);

    React.useEffect(() => {
        setDeg((d) => ({ deg: d.deg - 180 }));
    }, [sides]);

    if (data.length < 2) {
        return (
            <Container>
                <div className="icon">
                    <div className="icon__face icon__face--front">
                        <CriticsIcon
                            name={data[sides.front].name}
                            score={data[sides.front].score}
                            index={sides.front}
                        />
                    </div>
                </div>
            </Container>
        );
    }

    return (
        <Container deg={deg.deg}>
            <div className="icon">
                <div className="icon__face icon__face--front">
                    <CriticsIcon name={data[sides.front].name} score={data[sides.front].score} index={sides.front} />
                </div>
                <div className="icon__face icon__face--back">
                    <CriticsIcon name={data[sides.back].name} score={data[sides.back].score} index={sides.back} />
                </div>
            </div>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: 100%;
    perspective: 600px;
    position: relative;

    .icon {
        transform: rotateY(${({ deg }) => deg}deg);
        transition: 1s;
        width: 100%;
        height: 100%;
        position: relative;
        transform-style: preserve-3d;
    }

    .icon__face {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        backface-visibility: hidden;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .icon__face--front {
        transform: rotateY(0deg) translateZ(1px);
    }
    .icon__face--back {
        transform: rotateY(180deg) translateZ(0px);
    }
`;

export default WinemakerIconAnimation;
