import React from "react";
import styled from "styled-components";
import { I18nLink as Link } from "#localization/localizedRouter";

const Category = ({ blogCategories, active }) => (
    <Wrapper>
        <Overflow>
            {blogCategories.map(({ name }) => {
                const categoryName = name
                    .split(" ")
                    .map((item) => item[0].toLowerCase() + item.slice(1))
                    .join("-");
                return (
                    <Link
                        to={`/blog/category/${categoryName}/1`}
                        key={categoryName}
                        className={name && active === name ? "active" : ""}
                    >
                        {name}
                    </Link>
                );
            })}
        </Overflow>
    </Wrapper>
);

const Wrapper = styled.div`
    width: 100%;
    overflow: auto;
    margin-top: 64px;
    margin-bottom: 43.54px;
    height: 39px;

    ::-webkit-scrollbar {
        display: none;
    }
    scrollbar-width: none;

    @media screen and (max-width: 991px) {
        margin-bottom: 0;
        margin-top: 0;
        height: 114px;
        display: flex;
        align-items: center;
    }

    a {
        text-decoration: none;
        font-family: VinovestMono;
        font-size: 14px;
        line-height: 22px;
        font-weight: 500;
        text-transform: uppercase;
        border: 0;
        outline: 0;
        background: #fff;
        white-space: nowrap;
        margin-right: 10px;
        position: relative;
        color: #606060;

        &:after {
            transition: 0.3s;
            content: " ";
            position: absolute;
            display: block;
            width: 0px;
            bottom: -13px;
            left: 50%;
            transform: translateX(-50%);
            border-bottom: 1.5px solid #242e35;
        }

        &.active {
            color: #242e35;

            @media screen and (min-width: 992px) {
                &:after {
                    width: 34px;
                }
            }
        }

        @media screen and (max-width: 991px) {
            padding-top: 8px;
            padding-bottom: 8px;
            padding-right: 15px;
            padding-left: 15px;

            font-size: 12px;
            line-height: 20px;

            border-radius: 3px;
            box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
        }
    }
`;

const Overflow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: fit-content;
    width: 100%;
    padding-left: 20px;
`;

export default Category;
