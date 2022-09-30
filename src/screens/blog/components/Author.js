import React from "react";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { makeProgressive } from "../utils";

const Author = ({ author }) => {
    const src = get(author, "authorPhoto.fields.file.url", "");
    const authorName = get(author, "authorName", "");
    const authorBio = get(author, "authorBio", "");
    const { t } = useTranslation(["blog"]);

    return (
        <Wrapper className={authorBio.length > 180 ? "wide" : ""}>
            <img
                src={makeProgressive(src, { height: 123, width: 123 })}
                alt={authorName}
                height="123px"
                width="123px"
            />
            <div className="descriptionWrapper">
                <h4>{t("author.writtenBy")}</h4>
                <h2>{authorName}</h2>
                <div>{authorBio}</div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    max-width: 505px;
    width: 100%;
    margin: 80px auto 0;
    padding: 35px 37px;
    border: 2px solid #242e35;
    display: flex;
    align-items: center;
    color: #242e35;

    img {
        display: block;
        width: 122.55px;
        margin-right: 27.34px;
        object-fit: contain;
    }

    .descriptionWrapper {
        h4,
        h2,
        div {
            margin: 0;
            font-family: VinovestMedium;
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 20px;
        }

        h2 {
            font-size: 32px;
            line-height: 44px;
            margin: 3px 0;
        }

        div {
            font-size: 16px;
            line-height: 26px;
        }

        h4 {
            text-transform: uppercase;
            font-family: VinovestMono;
        }
    }

    @media screen and (max-width: 991px) {
        padding: 30px;
        flex-direction: column;
        align-items: flex-start;

        img {
            width: 96.81px;
            margin-bottom: 19px;
        }

        h2 {
            margin-top: 2px;
        }
    }

    @media screen and (min-width: 991px) {
        &.wide {
            //max-width: 740px;
        }
    }
`;

export default Author;
