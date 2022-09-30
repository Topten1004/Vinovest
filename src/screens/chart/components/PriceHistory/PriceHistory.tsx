import * as React from "react";
import Chart from "./Chart";
import { useToggle } from "#shared/hooks";
import { Dot, Text, Divider, InfoColumn, MainContainer, InfoContainer, Content } from "./components/styled";
import { ReactComponent as EyeIcon } from "#assets/shared/eye.svg";
import { TextButton } from "#shared/ui";
import { useTranslation } from "react-i18next";

interface IPriceHistoryProps {
    benchmark: string | void | any;
    current: string | void | any;
}

const PriceHistory: React.FC<IPriceHistoryProps> = ({ benchmark: incomingBenchmark, current: incomingCurrent }) => {
    const { t } = useTranslation(["chart"]);

    const benchmark: string = incomingBenchmark ?? t("price_history.benchmark_wine_name");
    const current: string = incomingCurrent ?? t("price_history.current_wine_name");

    const [showBenchmark, onToggleBenchmark]: [boolean, any] = useToggle(true);
    return (
        <MainContainer>
            <h1>{t("price_history.average_price")}</h1>
            <Content>
                <Chart showBenchmark={showBenchmark} width="100%" height={500} />
                <div style={{ paddingLeft: 65 }}>
                    <Divider />
                    <InfoContainer>
                        <div>
                            <InfoColumn>
                                <Dot color="#27AE60" />
                                <Text.Strong>{current}</Text.Strong>
                                <Text.Meta>{t("price_history.price_history")}e</Text.Meta>
                            </InfoColumn>
                            <InfoColumn>
                                <Dot color="#BDBDBD" />
                                <Text.Strong>{benchmark}</Text.Strong>
                                <Text.Meta>{t("price_history.current_wine")}</Text.Meta>
                            </InfoColumn>
                        </div>
                        <TextButton style={{ alignSelf: "flex-end" }} uppercase onClick={onToggleBenchmark}>
                            <EyeIcon style={{ marginRight: 10 }} /> {t("price_history.hide_benchmark")}k
                        </TextButton>
                    </InfoContainer>
                </div>
            </Content>
        </MainContainer>
    );
};

export default PriceHistory;
