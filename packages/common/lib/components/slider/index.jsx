import React, {useState, useEffect} from "react";
import styled from "styled-components";
import SVG from "react-inlinesvg";

import {
    Typography,
    Spacer
} from "widgets";

import indicatorLeftIcon from "indicatorLeft.svg";
import indicatorRightIcon from "indicatorRight.svg";

import playIcon from "play.svg";
import addIcon from "add.svg";
import thumbUpIcon from "thumbUp.svg";
import thumbDownIcon from "thumbDown.svg";
import revealIcon from "reveal.svg";

const Wrapper = styled.div`
    position: relative;
    z-index: ${({theme}) => theme.zIndex.slider};
    margin-top: -160px;
    color: ${({theme}) => theme.foreground};
    overflow: clip;
    overflow-clip-margin: 150px;
`;

const Heading = styled.div`
    display: flex;
    padding-left: 4vw;
`;

const SliderWrapper = styled.div`
    position: relative;
    display: flex;
    height: 130px;
    padding: 0 4vw;
`;

const IndicatorBase = styled.div`
    position: absolute;
    display: flex;
    visibility: ${({visible}) => visible ? "visible" : "hidden"};
    align-items: center;
    justify-content: center;
    z-index: 20;
    top: 0;
    width: 4%;
    height: 100%;
    cursor: pointer;
    transition: visibility 1ms;
    transition-delay: ${({visible}) => visible ? 0 : 800}ms;

    &:hover {
        background-color: rgba(20, 20, 20, .7);
    }
`;

const IndicatorLeft = styled(IndicatorBase)`
    left: 0;
`;

const IndicatorRight = styled(IndicatorBase)`
    right: 0;
`;

const IndicatorIcon = styled(SVG)`
    height: 60px;
    transition: transform 100ms;

    &:hover {
        transform: scale(1.2);
    }
`;

const SliderSection = styled.div`
    display: grid;
    width: 92vw;
    padding-left: 5px;
    grid-template-columns: repeat(5, calc(92vw / 5 - 5px));
    grid-template-rows: 130px;
    grid-column-gap: 5px;
    flex: 1;
`;

const SliderContent = styled.div`
    display: flex;
    transform: ${({sliderPosition}) => `translateX(${sliderPosition}vw)`};
    transition: transform cubic-bezier(.15,.40,.53,1) 800ms;

    &:hover {
        position: relative;
        z-index: 10;
    }
`;

const SliderItemTop = styled.div`
    width: 100%;
    height: 130px;
    background: ${({url}) => `url(${url})`};
    background-size: 100% 100%;
    transition: all 200ms;
    transition-delay: 200ms;
    border-radius: 8px;
`;

const SliderItemBottom = styled.div`
    padding: 24px;
    opacity: 0;
    background-color: ${({theme}) => theme.background};
    transition: all 200ms;
    transition-delay: 200ms;
`;

const CardIconsRow = styled.div`
    display: flex;
`;

const CardIcon = styled.img`
    width: 30px;
    height: 30px;
    opacity: 0;
    margin-right: 8px;
    transition: all 200ms 200ms;
    background-color: #363636;
    border-radius: 50%;

    &:first-child {
        background-color: ${({theme}) => theme.foreground};
    }

    &:last-child {
        margin-left: auto;
    }
`;

const SliderItemWrapper = styled.div`
    position: relative;
    z-index: 10;
    height: max-content;
    overflow: hidden;
    filter: drop-shadow(0px 8px 40px rgba(0, 0, 0, 0.5));
    border-radius: 8px;
    transition: all 200ms 200ms;
    width: 100%;

    &:first-child:hover {
        transform: translate(0px, -40%);
    }

    &:last-child:hover {
        transform: translate(-60px, -40%);
    }

    &:hover {
        width: 320px;
        z-index: 30;
        cursor: pointer;
        transform: translate(-20px, -40%);

        & > ${SliderItemTop} {
            height: 180px;
            border-radius: 8px 8px 0 0;
        }

        & > ${SliderItemBottom} {
            opacity: 1;
        }

        ${CardIcon} {
            opacity: 1;
            width: 40px;
            height: 40px;
        }
    }
`;

export const Slider = () => {
    const [pageIndex, setPageIndex] = useState(0);
    const [maxPageIndex, setMaxPageIndex] = useState(3);

    const [sliderPosition, setSliderPosition] = useState(0);
    const [sliderTransitionStep, setSliderTransitionStep] = useState(92);

    useEffect(() => {
        setSliderPosition(-Math.abs(pageIndex * sliderTransitionStep));
    }, [pageIndex]);

    return (
        <Wrapper>
            <Heading>
                <Typography
                    size={20}
                    variant="bold"
                >
                    Trending Now
                </Typography>
            </Heading>

            <Spacer size={20} />

            <SliderWrapper>
                <IndicatorLeft
                    visible={pageIndex > 0}
                    onClick={() => setPageIndex(pageIndex - 1)}
                >
                    <IndicatorIcon src={indicatorLeftIcon} />
                </IndicatorLeft>

                {
                    [1, 2, 3, 4].map(e =>
                        <SliderContent
                            key={e}
                            sliderPosition={sliderPosition}
                        >
                            <SliderSection>
                                {
                                    [1, 2, 3, 4, 5].map(i =>
                                        <SliderItemWrapper key={i}>
                                            <SliderItemTop url="https://image.tmdb.org/t/p/w300//eUqdBXJsYV71kt6tocosbUoICiP.jpg" />
                                            <SliderItemBottom>
                                                <CardIconsRow>
                                                    <CardIcon src={playIcon} />
                                                    <CardIcon src={addIcon} />
                                                    <CardIcon src={thumbUpIcon} />
                                                    <CardIcon src={thumbDownIcon} />
                                                    <CardIcon src={revealIcon} />
                                                </CardIconsRow>
                                            </SliderItemBottom>
                                        </SliderItemWrapper>)
                                }
                            </SliderSection>
                        </SliderContent>
                    )
                }

                <IndicatorRight
                    visible={pageIndex < maxPageIndex}
                    onClick={() => setPageIndex(pageIndex + 1)}
                >
                    <IndicatorIcon src={indicatorRightIcon} />
                </IndicatorRight>
            </SliderWrapper>
        </Wrapper>
    );
};
