import React, {useState, useEffect} from "react";
import styled from "styled-components";

import {
    Typography,
    Spacer
} from "widgets";

import indicatorLeftIcon from "indicatorLeft.svg";
import indicatorRightIcon from "indicatorRight.svg";

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
    background-color: rgba(20, 20, 20, .5);
    cursor: pointer;
    transition: visibility 1ms;
    transition-delay: ${({visible}) => visible ? 0 : 800}ms;
`;

const IndicatorLeft = styled(IndicatorBase)`
    left: 0;
`;

const IndicatorRight = styled(IndicatorBase)`
    right: 0;
`;

const IndicatorIcon = styled.img`
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
    grid-template-columns: repeat(5, auto);
    grid-template-rows: 130px;
    grid-column-gap: 5px;
    flex: 1;
`;

const SliderContent = styled.div`
    display: flex;
    transform: ${({sliderPosition}) => `translateX(${sliderPosition}vw)`};
    transition: transform cubic-bezier(.15,.40,.53,1) 800ms;
`;

const SliderItemTop = styled.div`
    background-color: red;
    height: 100%;
    transition: all 200ms;
    transition-delay: 200ms;
`;

const SliderItemBottom = styled.div`
    height: 0;
    opacity: 0;
    width: 100%;
    background-color: green;
    transition: all 200ms;
    transition-delay: 200ms;
`;

const SliderItemWrapper = styled.div`
    position: relative;
    z-index: 10;
    border-radius: 3px;
    overflow: hidden;
    height: 100%;
    transition: all 200ms;
    transition-delay: 200ms;

    &:hover {
        z-index: 30;
        transform: scale(1.3, 2.3);
        cursor: pointer;

        & > ${SliderItemTop} {
            height: 60%;
        }

        & > ${SliderItemBottom} {
            height: 40%;
            opacity: 1;
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

                <SliderContent
                    sliderPosition={sliderPosition}
                >
                    <SliderSection>
                        <SliderItemWrapper>
                            <SliderItemTop />
                            <SliderItemBottom />
                        </SliderItemWrapper>

                        <SliderItemWrapper>
                            <SliderItemTop />
                            <SliderItemBottom />
                        </SliderItemWrapper>

                        <SliderItemWrapper>
                            <SliderItemTop />
                            <SliderItemBottom />
                        </SliderItemWrapper>

                        <SliderItemWrapper>
                            <SliderItemTop />
                            <SliderItemBottom />
                        </SliderItemWrapper>

                        <SliderItemWrapper>
                            <SliderItemTop />
                            <SliderItemBottom />
                        </SliderItemWrapper>
                    </SliderSection>

                    <SliderSection>
                        <SliderItemWrapper>
                            <SliderItemTop />
                            <SliderItemBottom />
                        </SliderItemWrapper>

                        <SliderItemWrapper>
                            <SliderItemTop />
                            <SliderItemBottom />
                        </SliderItemWrapper>

                        <SliderItemWrapper>
                            <SliderItemTop />
                            <SliderItemBottom />
                        </SliderItemWrapper>

                        <SliderItemWrapper>
                            <SliderItemTop />
                            <SliderItemBottom />
                        </SliderItemWrapper>

                        <SliderItemWrapper>
                            <SliderItemTop />
                            <SliderItemBottom />
                        </SliderItemWrapper>
                    </SliderSection>

                    <SliderSection>
                        <SliderItemWrapper>
                            <SliderItemTop />
                            <SliderItemBottom />
                        </SliderItemWrapper>

                        <SliderItemWrapper>
                            <SliderItemTop />
                            <SliderItemBottom />
                        </SliderItemWrapper>

                        <SliderItemWrapper>
                            <SliderItemTop />
                            <SliderItemBottom />
                        </SliderItemWrapper>

                        <SliderItemWrapper>
                            <SliderItemTop />
                            <SliderItemBottom />
                        </SliderItemWrapper>

                        <SliderItemWrapper>
                            <SliderItemTop />
                            <SliderItemBottom />
                        </SliderItemWrapper>
                    </SliderSection>

                    <SliderSection>
                        <SliderItemWrapper>
                            <SliderItemTop />
                            <SliderItemBottom />
                        </SliderItemWrapper>

                        <SliderItemWrapper>
                            <SliderItemTop />
                            <SliderItemBottom />
                        </SliderItemWrapper>

                        <SliderItemWrapper>
                            <SliderItemTop />
                            <SliderItemBottom />
                        </SliderItemWrapper>

                        <SliderItemWrapper>
                            <SliderItemTop />
                            <SliderItemBottom />
                        </SliderItemWrapper>

                        <SliderItemWrapper>
                            <SliderItemTop />
                            <SliderItemBottom />
                        </SliderItemWrapper>
                    </SliderSection>
                </SliderContent>

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
