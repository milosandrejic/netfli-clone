import React, {useState} from "react";
import styled from "styled-components";
import SVG from "react-inlinesvg";

import {
    Typography,
    Spacer
} from "widgets";

import playIcon from "play.svg";
import moreInfoIcon from "info.svg";

const Wrapper = styled.div`
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
`;

const Content = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: ${({theme}) => theme.zIndex.billboard};
    padding-top: 200px;
    padding-left: 50px;
    width: 100%;
    height: 100%;
    background: ${({theme, backgroundLoaded}) => backgroundLoaded ? `
        linear-gradient(
            rgba(20, 20, 20, 0.4) 0%,
            rgba(20, 20, 20, 0.4) 50%,
            rgba(20, 20, 20, 0.9) 90%,
            ${theme.background} 95%,
            ${theme.background} 100%
        )` : `${theme.background}`};
    transition: all 300ms;
`;

const BackgroundImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: ${({theme}) => theme.zIndex.billboardBackgroundImage};
    object-fit: cover;
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    padding: 9px 25px 9px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    user-select: none;
    outline: none;

    &:hover {
        filter: brightness(85%);
    }

    &:focus {
        outline: none;
    }
`;
const PlayButton = styled(Button)`
    background-color: ${({theme}) => theme.white};
    color: ${({theme}) => theme.black};
`;

const MoreInfo = styled(Button)`
    background-color: rgba(109, 109, 110, 0.7);
    color: ${({theme}) => theme.foreground};
`;

const Icon = styled(SVG)`
    width: 26px;
    height: 26px;
    fill: currentColor;
`;

const ButtonWrapper = styled.div`
    display: inline-flex;
    margin: 0 10px 10px 0;
`;

export const Billboard = ({movie, onMoreInfo}) => {
    const [backgroundImageLoaded, setBackgroundImageLoaded] = useState(false);

    const buildDesription = (d) => {
        if (d.length < 400) {
            return d;
        }

        return `${d.substring(0, 400).trim()}...`;
    };

    return (
        <Wrapper>
            <BackgroundImage
                onLoad={() => setBackgroundImageLoaded(true)}
                src={movie?.url}
            />

            <Content backgroundLoaded={backgroundImageLoaded}>
                {
                    movie?.title && movie?.description &&
                    <>
                        <Typography
                            variant="bold"
                            size={45}
                            maxWidth={700}
                        >
                            {movie?.title}
                        </Typography>

                        <Spacer size={30} />

                        <Typography
                            size={18}
                            lineHeight={28}
                            maxWidth={600}
                        >
                            {buildDesription(movie?.description)}
                        </Typography>

                        <Spacer size={30} />

                        <ButtonWrapper>
                            <PlayButton>
                                <Icon src={playIcon} />

                                <Spacer size={10} />

                                <Typography
                                    size={18}
                                    variant="semiBold"
                                >
                                    Play
                                </Typography>
                            </PlayButton>

                            <Spacer size={20} />

                            <MoreInfo>
                                <Icon src={moreInfoIcon} />

                                <Spacer size={10} />

                                <Typography
                                    size={18}
                                    variant="semiBold"
                                >
                                    More Info
                                </Typography>
                            </MoreInfo>
                        </ButtonWrapper>
                    </>
                }
            </Content>
        </Wrapper>
    );
};
