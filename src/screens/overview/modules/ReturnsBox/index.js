import React from "react";
import styled from "styled-components";
import { get } from "lodash";
import getYear from "date-fns/getYear";
import { useRootStore } from "#shared/hooks";
import { observer } from "mobx-react-lite";
import { currencyFormatter } from "#utils/shared";
import { BaseModuleContainer } from "../styles";
import { useTranslation } from "react-i18next";


const ReturnsBox = observer(() => {
    const { t } = useTranslation(["overview"]);
    const s = useRootStore();
    const { fees, netChange, ytdFees, ytdNetChange } = s.cellar.totals.returns || {};

    const getValue = (data) => get(data, "amount", 0) / 100;

    const data = React.useMemo(() => {
        const formatAmount = (field) => {
            const amount = getValue(field);
            return +amount ? currencyFormatter(amount) : "-";
        };

        const formatTotal = (amount) => (+amount ? currencyFormatter(amount) : "-");

        return [
            { label: "", ytd: `${getYear(new Date())} ${t("returns-box.ytd")}`, all: t("returns-box.all") },
            { label: t("returns-box.appreciation"), ytd: formatAmount(ytdNetChange), all: formatAmount(netChange) },
            { label: t("returns-box.fees"), ytd: formatAmount(ytdFees), all: formatAmount(fees) },
            {
                label: t("returns-box.total"),
                ytd: formatTotal(getValue(ytdNetChange) + getValue(ytdFees)),
                all: formatTotal(getValue(netChange) + getValue(fees)),
            },
        ];
    }, [fees, netChange, ytdFees, ytdNetChange]);

    const getBorder = (i) => (!i ? { borderTop: 0 } : {});

    return (
        <BaseModule>
            <SnapshotHeader>{t("returns-box.title")}</SnapshotHeader>
            <GridWrapper>
                {data.map(({ label, ytd, all }, i) => (
                    <React.Fragment key={label}>
                        <div className="row-label" style={getBorder(i)}>
                            {label}
                        </div>
                        <div className="row-value" style={getBorder(i)}>
                            {ytd}
                        </div>
                        <div className="row-value" style={getBorder(i)}>
                            {all}
                        </div>
                    </React.Fragment>
                ))}
            </GridWrapper>
        </BaseModule>
    );
});

const BaseModule = styled(BaseModuleContainer)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: fit-content;

    @media (min-width: 1020px) {
        padding: 41px 43px 30px 59px;
    }
`;

const SnapshotHeader = styled.div`
    font-size: 32px;
    line-height: 41px;
    font-family: RoslindaleDisplayCondensed;
    font-style: normal;
    font-weight: 500;
    color: #242e35;
    display: flex;
    justify-content: space-between;
    align-items: center;

    ${(p) => p.theme.media.greaterThan("768px")`
        font-size: 45px;
        line-height: 60px;
    `}
`;

const GridWrapper = styled.div`
    font-size: 14px;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-areas: ". . .";
    font-family: FavoritStd;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.005em;
    color: #242e35;

    .row-label {
        padding: 18px 0;
        text-align: left;
        font-family: "VinovestMedium";
        border-top: 1px solid ${(p) => p.theme.colors.borderGray};
    }
    .row-value {
        padding: 18px 0;
        border-top: 1px solid ${(p) => p.theme.colors.borderGray};
        text-align: right;
        font-family: VinovestMedium;
    }

    ${(p) => p.theme.media.greaterThan("768px")`
        font-size: 16px;
        line-height: 26px;

        .row-label {
            padding: 22px 0;
        }
        .row-value {
            padding: 22px 0;
        }
    `}
`;

export default ReturnsBox;
