import React, {useState, useEffect, Fragment} from "react";
import styled from "styled-components";
import SVG from "react-inlinesvg";
import _ from "lodash";

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
import exploreAllIcon from "arrowRight.svg";

const Wrapper = styled.div`
    position: relative;
    z-index: ${({theme}) => theme.zIndex.slider};
    color: ${({theme}) => theme.foreground};

    &:hover {
        z-index: 999;
    }
`;

const ExploreAllText = styled.div`
    opacity: 0;
    user-select: none;
    padding-left: 10px;
    visibility: hidden;
    transition: all 300ms;
    transform: translateX(-50px);
`;

const ExploreAllIcon = styled(SVG)`
    opacity: 0;
    width: 24px;
    height: 24px;
    visibility: hidden;
    transition: all 250ms 50ms ease-out;
    transform: translateX(-100px);
`;

const Heading = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 4vw;
    cursor: pointer;
`;

const HeadingLeft = styled.div`
    display: flex;
    align-items: center;

    &:hover > ${ExploreAllText} {
        opacity: 1;
        visibility: visible;
        transform: translateX(0);
    }

    &:hover > ${ExploreAllIcon} {
        opacity: 1;
        visibility: visible;
        transform: translateX(0);
    }
`;

const HeadingRight = styled.div`
    display: flex;
    align-items: flex-end;
    align-self: flex-end;
    padding-bottom: 5px;
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
    transition: transform cubic-bezier(.15,.40,.53,1) 650ms;
`;

export const Slider = ({movies, title, onExploreAll}) => {
    const [pageIndex, setPageIndex] = useState(0);
    const [maxPageIndex, setMaxPageIndex] = useState(3);

    const [sliderPosition, setSliderPosition] = useState(0);
    const [showPagination, setShowPagination] = useState(false);
    const [sliderTransitionProgress, setSliderTransitionProgress] = useState(false);

    const [paginatedItems, setPaignatedItems] = useState([]);

    const genres = ["Mystery", "Thriler", "Comedy"];

    useEffect(() => {
        const wholePageCount = Math.floor(movies.length / 5);

        const wholePageItems = movies.slice(0, wholePageCount * 5);

        setMaxPageIndex(wholePageCount - 1);
        setPaignatedItems(_.chunk(wholePageItems, 5));
    }, [movies]);

    useEffect(() => {
        // 92 is slider transition distance per page
        setSliderPosition(-Math.abs(pageIndex * 92));
    }, [pageIndex]);

    return (
        <Wrapper
            onMouseOverCapture={() => setShowPagination(true)}
            onMouseLeave={() => setShowPagination(false)}
        >
            <Heading>
                <HeadingLeft>
                    <Typography
                        size={20}
                        variant="bold"
                    >
                        {title}
                    </Typography>

                    <ExploreAllText onClick={() => onExploreAll()}>
                        <Typography
                            size={14}
                            variant="bold"
                        >
                            Explore all
                        </Typography>
                    </ExploreAllText>

                    <ExploreAllIcon src={exploreAllIcon} />
                </HeadingLeft>

                <HeadingRight>
                    <Pagination
                        show={showPagination}
                        pageCount={maxPageIndex + 1}
                        activePageIndex={pageIndex}
                    />
                </HeadingRight>
            </Heading>

            <Spacer size={10} />

            <SliderWrapper>
                <IndicatorLeft
                    visible={pageIndex > 0}
                    onClick={() => {
                        if (!sliderTransitionProgress) {
                            setPageIndex(pageIndex - 1);
                            setSliderTransitionProgress(true);
                        }
                    }}
                >
                    <IndicatorIcon src={indicatorLeftIcon} />
                </IndicatorLeft>

                {
                    paginatedItems.map(movie =>
                        <SliderContent
                            key={movie.id}
                            sliderPosition={sliderPosition}
                            onTransitionEnd={() => setSliderTransitionProgress(false)}
                        >
                            <SliderSection>
                                {
                                    movie.map(m =>
                                        <Card
                                            key={_.uniqueId()}
                                            genres={genres}
                                            background={`https://image.tmdb.org/t/p/w300/${m.backdrop_path}`}
                                            age={16}
                                            seasons="5 Seasons"
                                            match={88}
                                        />
                                    )
                                }
                            </SliderSection>
                        </SliderContent>
                    )
                }

                <IndicatorRight
                    visible={pageIndex < maxPageIndex}
                    onClick={() => {
                        if (!sliderTransitionProgress) {
                            setPageIndex(pageIndex + 1);
                            setSliderTransitionProgress(true);
                        }
                    }}
                >
                    <IndicatorIcon src={indicatorRightIcon} />
                </IndicatorRight>
            </SliderWrapper>
        </Wrapper>
    );
};

const Row = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
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

const SliderItemTop = styled.div`
    width: 100%;
    height: 130px;
    background: ${({url}) => `url(${url})`};
    background-size: 100% 100%;
    transition: all 200ms;
    transition-delay: 200ms;
    border-radius: 8px;
    background-color: #999999;
`;

const SliderItemBottom = styled.div`
    padding: ${({reset}) => reset ? "24px" : 0};
    height: ${({reset}) => reset ? "auto" : 0};
    opacity: ${({showBottom}) => showBottom ? 1 : 0};
    background-color: ${({theme}) => theme.background};
    transition: height 2ms, opacity 200ms 100ms;
`;

const SliderItemWrapper = styled.div`
    position: relative;
    z-index: 10;
    height: max-content;
    overflow: hidden;
    border-radius: 8px;
    transition: all 200ms 200ms;
    width: 100%;
    background-color: transparent;

    ${SliderItemBottom} > ${Row}:last-child > * {
        opacity: 0;
        font-size: 12px;
        transition: font-size 100ms 200ms, opacity 200ms 200ms;
    }

    &:hover > ${SliderItemBottom} > ${Row}:last-child > * {
        opacity: 1;
        font-size: 16px;
    }

    &:first-child:hover {
        transform: translate(0px, -40%);
    }

    &:last-child:hover {
        transform: translate(calc(-4vw + 5px), -40%);
    }

    &:hover {
        width: calc(100% * 1.2);
        z-index: 30;
        cursor: pointer;
        transform: translate(-20px, -30%);
        filter: drop-shadow(0px 8px 40px rgba(0, 0, 0, 0.5));

        & > ${SliderItemTop} {
            height: 180px;
            border-radius: 8px 8px 0 0;
        }

        ${CardIcon} {
            opacity: 1;
            width: 40px;
            height: 40px;
        }
    }
`;

const Age = styled.div`
    padding: 4px 8px;
    border: 1px solid ${({theme}) => theme.foregorund};
    margin: 0 10px;
`;

const GenreSeparator = styled.div`
    width: 4px;
    height: 4px;
    border-radius: 100%;
    background-color: ${({theme}) => theme.gray200};
    margin: 0 8px;

    &:last-child {
        display: none;
    }
`;

const Card = ({background, genres, match, seasons, age}) => {
    const [showBottom, setShowBottom] = useState(false);
    const [reset, setReset] = useState(false);

    return (
        <SliderItemWrapper
            onMouseOverCapture={() => {
                setShowBottom(true);
                setReset(true);
            }}
            onMouseLeave={() => {
                setShowBottom(false);

                setTimeout(() => {
                    setReset(false);
                }, 200);
            }}
        >
            <SliderItemTop url={background} />

            <SliderItemBottom
                showBottom={showBottom}
                reset={reset}
            >
                <Row>
                    <CardIcon src={playIcon} />
                    <CardIcon src={addIcon} />
                    <CardIcon src={thumbUpIcon} />
                    <CardIcon src={thumbDownIcon} />
                    <CardIcon src={revealIcon} />
                </Row>

                <Spacer size={15} />

                <Row>
                    <Typography
                        variant="bold"
                        color="#3DCD5E"
                    >
                        {match}&#37; Match
                    </Typography>

                    <Age>
                        <Typography size={14}>{age}</Typography>
                    </Age>

                    <Typography>{seasons}</Typography>
                </Row>

                <Spacer size={10} />

                <Row>
                    {
                        genres.map(genre =>
                            <Fragment key={genre}>
                                <Typography>{genre}</Typography>

                                <GenreSeparator />
                            </Fragment>
                        )
                    }
                </Row>
            </SliderItemBottom>
        </SliderItemWrapper>
    );
};

const PaginationWraper = styled.div`
    display: ${({show}) => show ? "inline-flex" : "none"};
`;

const PaginationItem = styled.div`
    width: 12px;
    height: 2px;
    margin-right: 3px;
    background-color: ${({currentPage, theme}) => currentPage ? theme.gray700 : theme.gray200};
`;

const Pagination = ({show, pageCount, activePageIndex}) =>
    <PaginationWraper show={show}>
        {
            _.times(pageCount).map((p, index) =>
                <PaginationItem
                    key={index}
                    currentPage={activePageIndex === index}
                />
            )
        }
    </PaginationWraper>;
