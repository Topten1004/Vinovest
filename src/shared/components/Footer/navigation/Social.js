import React from "react";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import linkedin_svg from "#assets/shared/linkedin.svg";
import twitter_svg from "#assets/shared/twitter.svg";
import facebook_svg from "#assets/shared/facebook.svg";
import instagram_svg from "#assets/shared/instagram.svg";

const links = [
    {
        icon: twitter_svg,
        href: "https://twitter.com/Vinovest1",
        name: "twitter",
    },
    {
        icon: facebook_svg,
        href: "https://www.facebook.com/vinovestofficial/",
        name: "facebook",
    },
    {
        icon: instagram_svg,
        href: "https://www.instagram.com/vinovest_official/",
        name: "instagram",
    },
    {
        icon: linkedin_svg,
        href: "https://www.linkedin.com/company/vinovest",
        name: "linkedin",
    },
];

const StyledList = styled.ul`
    display: flex;
    list-style: none;
    margin: 0;
    align-items: center;
    padding: 10px 0;
    align-self: center;
    font-family: FavoritStd;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;

    @media screen and (max-width: 1024px) {
        padding: 0;
        font-size: 14px;
        line-height: 28px;
    }

    @media screen and (max-width: 767px) {
        padding: 0;
        margin-top: 38px;
    }

    span {
        margin-right: 29px;
    }
    li {
        display: flex;
        align-items: flex-end;
        margin-right: 20px;

        a {
            display: flex;
            align-items: flex-end;
        }

        img {
            width: 18px;
            height: 18px;
            object-fit: contain;
        }
    }
    
`;

const Social = () => {
    const {t} = useTranslation('footer');
    return (
    <StyledList>
        <span>{t('follow')}</span>
        {links.map((link) => (
            <li key={link.name}>
                <a href={link.href} rel="noopener noreferrer" target="_blank">
                    <img src={link.icon} alt={link.name} />
                </a>
            </li>
        ))}
    </StyledList>
)};

export default Social;
