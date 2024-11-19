import React, { useState } from "react";
import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar, Spin, Button } from "antd";
import HTMLReactParser from "html-react-parser";
import { LinkOutlined } from "@ant-design/icons";

import { useGetCryptoExchangesQuery } from "../services/cryptoExchanges";
import ExchangeVolumeChart from "./ExchangeVolumeChart";

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetCryptoExchangesQuery();
  const exchangesList = data;

  if (isFetching)
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <Spin size="large" />
      </div>
    );

  const VolumeChartToggle = ({ exchangeId }) => {
    const [showChart, setShowChart] = useState(false);

    return (
      <Col style={{ textAlign: "center" }}>
        {showChart ? (
          <ExchangeVolumeChart exchangeId={exchangeId} />
        ) : (
          <button onClick={() => setShowChart(true)} className="load-chart-button">
            Load Chart
          </button>
        )}
      </Col>
    );
  };

  return (
    <>
      <Row>
        <Col span={5}>Exchanges</Col>
        <Col span={5}>24h Trade Volume</Col>
        <Col span={7}>Trust Score</Col>
        <Col span={7}>Volume Chart (7d)</Col>
      </Row>
      <Row>
        {exchangesList?.map((exchange, index) => (
          <Col span={24} key={exchange.id}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={
                  <Row>
                    <Col span={5}>
                      <Text>
                        <strong>{exchange.trust_score_rank}.</strong>
                      </Text>
                      <Avatar className="exchange-image" src={exchange.image} />
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>
                    <Col span={5}>
                      ${millify(exchange.trade_volume_24h_btc)}
                    </Col>
                    <Col span={5}>{millify(exchange.trust_score)}</Col>
                    <Col span={9}>
                      <VolumeChartToggle exchangeId={exchange.id} />
                    </Col>
                  </Row>
                }
              >
                <div>
                  {HTMLReactParser(
                    exchange.description || "No Description Available"
                  )}
                  <br />
                  {exchange.url && (
                    <Button
                      type="link"
                      onClick={() => window.open(exchange.url, "_blank", "noopener noreferrer")}
                      className="panel-dropdown-button"
                    >
                      <LinkOutlined style={{ marginRight: 8 }} />
                      Visit Official Website
                    </Button>
                  )}
                </div>
                <Row justify="end" style={{ marginTop: "1rem" }}>
                  <Col>
                    <Text className="coin-gecko-label" style={{ fontSize: "0.8rem", color: "#00C298" }}>
                      Data provided by{" "}
                      <a
                        href="https://www.coingecko.com/en/api"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        CoinGecko
                      </a>
                    </Text>
                  </Col>
                </Row>
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
