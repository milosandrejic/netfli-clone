import React, {useState, useRef} from "react";
import styled from "styled-components";

import searchIcon from "search.svg";

const Wrapper = styled.div`
    display: inline-flex;
    align-items: center;
    border: 1px solid ${({expand, theme}) => expand ? theme.foreground : "transparent"};
    padding: ${({expand}) => expand ? 7 : 0}px;
    transition: all 300ms;
    height: 32px;
`;

const Input = styled.input`
    width: ${({expand}) => expand ? "180px" : 0};
    font-family: ${({theme}) => theme.font};
    font-size: 16px;
    transition: all 300ms;
    background-color: transparent;
    z-index: 990;
    border: none;
    padding-left: 10px;
    color: ${({theme}) => theme.foreground};

    &:focus {
        outline: none;
    }
`;

const Icon = styled.img`
    width: 16px;
    height: 16px;
    cursor: pointer;
    font-weight: bold;
    z-index: 991;
`;

export const Search = ({value, onChange}) => {
    const [expand, setExpand] = useState(false);
    const inputRef = useRef();

    const onSearch = v => onChange?.(v);

    return (
        <Wrapper expand={expand}>
            <Icon
                src={searchIcon}
                onClick={() => {
                    inputRef.current.focus();
                    setExpand(true);
                }}
            />

            <Input
                ref={inputRef}
                value={value}
                onChange={e => onSearch(e.target.value)}
                expand={expand}
                tabIndex={1}
                onBlur={() => setExpand(false)}
            />
        </Wrapper>
    );
};
