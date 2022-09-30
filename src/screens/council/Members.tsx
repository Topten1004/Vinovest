import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { I18nLink as Link} from "#localization/localizedRouter"
import { membersList } from "./images/members/membersList";

const Members = () => {
    const curLoc = useLocation();

    return (
        <Section>
            <ul>
                {membersList.map((member) => (
                    <li key={`${member.photo}` + `${member.id}`}>
                        <Link to={`${curLoc.pathname}` + `${member.path}`}>
                            <img src={member.photo} />
                            <h3>{member.name}</h3>
                            <span className="pos">{member.position}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </Section>
    );
};

const Section = styled.section`
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
    padding: 0px 0 100px;
    justify-content: center;
    ul {
        padding: 0 20px;
        display: grid;
        grid-column-gap: 30px;
        grid-row-gap: 30px;
        grid-template-columns: 1fr 1fr;
    }
    li {
        list-style: none;
    }
    img {
        max-width: 250px;
        width: 100%;
        display: block;
        object-fit: contain;
        margin-bottom: 30px;
    }
    a {
        margin: 0 auto;
        text-decoration: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 60px 0px;
        color: #efddc7;
        max-width: 420px;
        width: 100%;
        height: 490px;
        background-color: #242e35;
    }
    h3 {
        font-family: Roslindaledisplaycondensed, sans-serif;
        font-size: 24px;
        margin-top: 0;
        margin-bottom: 10px;
        font-weight: 600;
        line-height: 38px;
    }
    span {
        font-family: Favoritmonostd, sans-serif;
        font-size: 18px;
        line-height: 20px;
        font-weight: 400;
        display: block;
        text-align: center;
    }
    .pos {
        max-width: 250px;
    }
    /* @media (max-width: 767px) {
        padding-top: 15px;
        padding-bottom: 15px;
        ul {
            grid-template-columns: 1fr;
            max-width: 97%;
        }
    } */
    @media (max-width: 767px) {
        ul {
            grid-template-columns: 1fr;
            max-width: 97%;
            grid-column-gap: unset;
        }
    }
    @media (max-width: 425px) {
        li {
            width: 100%;
        }
        a {
            width: 320px;
        }
    }
`;

export { Members };
