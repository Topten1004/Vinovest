import * as React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useRootStore } from "#shared/hooks";
import { Fade } from "#shared/ui";
import { smartCodeVWO } from "#utils/smartCodeVWO";
import { BookACallBanner } from "./modules/BookACallBanner";
import { AutoInvestBanner } from "./modules/AutoInvestBanner";
import { PersonalSnapshot } from "./modules/PersonalSnapshot";
import ReturnsBox from "./modules/ReturnsBox";
import RewardsBox from "./modules/RewardsBox";
import { AccountValueGraph } from "./modules/AccountValueGraph";
import FAQOptions from "./modules/help-modules/FAQOptions";
import ContactSupport from "./modules/help-modules/ContactSupport";
import { QualityValueProps } from "./modules/QualityValueProps";
import { RegionDiversityGraph } from "./modules/RegionDiversityGraph";
import { WhiskeyVestBanner } from "./modules/whiskey-vest-banner";
import { HowProcessWorks } from "./modules/how-process-works";
import { PortfolioPlan } from "./modules/Plans/PortfolioPlan";

const ModuleComponentMap: { [key: string]: (props: any) => JSX.Element } = {
    AutoInvestBanner,
    BookACallBanner,
    PersonalSnapshot,
    ReturnsBox,
    RewardsBox,
    AccountValueGraph,
    FAQOptions,
    ContactSupport,
    QualityValueProps,
    RegionDiversityGraph,
    WhiskeyVestBanner,
    HowProcessWorks,
    PortfolioPlan,
};

export const OverviewPage: React.VFC = observer(() => {
    const s = useRootStore();
    React.useEffect(() => {
        smartCodeVWO();
    }, []);

    return (
        <Fade in>
            <PageContainer>
                {s.skeleton.getOverviewModules.map((m) => {
                    const Module = ModuleComponentMap[m.type];
                    return <Module key={m.type} role="listitem" name="overview-module" />;
                })}
            </PageContainer>
        </Fade>
    );
});

const PageContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 12px;
    justify-content: center;

    ${(p) => p.theme.media.greaterThan("768px")`
        font-size: 48px;
        padding: 67px 12px 0;
    `}
    ${(p) => p.theme.media.greaterThan("920px")`
        justify-content: space-between;
    `}
`;
