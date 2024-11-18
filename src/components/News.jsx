import React, { useState } from "react";
import { Switch, Select, Typography, Row, Col, Avatar, Card, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import demoImage from "../images/placeholder_image.png";
import theGuardian from "../images/the_guardian_logo.png";
import { useGetCryptosQuery } from "../services/cryptoApi";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const [showIframe, setShowIframe] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  const { data } = useGetCryptosQuery(100);
  const handleSwitchChange = (checked) => {
    setShowIframe(checked);
    if (checked) {
      setIsLoading(true);
    }
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  if (!cryptoNews?.response?.results)
    return (
      <>
        {!simplified && (
        <Col span={24}>
          <Row justify="space-between" align="middle">
            <Col className="select-news-container">
              <Select
                showSearch
                className="select-news"
                placeholder="Select a Crypto"
                optionFilterProp="children"
                onChange={(value) => setNewsCategory(value)}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="Cryptocurrency">Cryptocurrency</Option>
                {data?.data?.coins.map((coin) => (
                  <Option value={coin.name} key={coin.id}>
                    {coin.name}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col
              span={24}
              xs={24}
              md={12}
              lg={12}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <Text style={{ textAlign: "center" }}>
                Hang tight! Fetching the latest updates for you. Meanwhile, explore CryptoNews.com.
              </Text>
              <Switch
                checked={showIframe}
                onChange={handleSwitchChange}
                style={{ marginTop: "10px" }}
                checkedChildren="Yes"
                unCheckedChildren="No"
              />
            </Col>
          </Row>
        </Col>
      )}

      {!simplified && showIframe && (
        <Col xs={24} sm={24} md={24} lg={24}>
          {isLoading && (
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <LoadingOutlined
                style={{ fontSize: 30, color: "#1890ff" }}
                spin
              />
            </div>
          )}
          <iframe
            key={newsCategory}
            src={
              newsCategory === ""
                ? "https://cryptonews.com/news/"
                : `https://cryptonews.com/?s=${newsCategory}`
            }
            title="CryptoNews"
            style={{
              width: "100%",
              height: "500px",
              border: "none",
              borderRadius: "8px",
            }}
            allowFullScreen
            onLoad={handleIframeLoad}
          />
        </Col>
      )}
        <div style={{ textAlign: "center", marginTop: 50 }}>
          <Spin size="large" />
        </div>
      </>
    );

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Row justify="space-between" align="middle">
            <Col className="select-news-container">
              <Select
                showSearch
                className="select-news"
                placeholder="Select a Crypto"
                optionFilterProp="children"
                onChange={(value) => setNewsCategory(value)}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="Cryptocurrency">Cryptocurrency</Option>
                {data?.data?.coins.map((coin) => (
                  <Option value={coin.name} key={coin.id}>
                    {coin.name}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col
              span={24}
              xs={24}
              md={12}
              lg={12}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <Text style={{ textAlign: "center" }}>
                If you couldn't find what you're looking for, try browsing the
                latest updates on CryptoNews.com
              </Text>
              <Switch
                checked={showIframe}
                onChange={handleSwitchChange}
                style={{ marginTop: "10px" }}
                checkedChildren="Yes"
                unCheckedChildren="No"
              />
            </Col>
          </Row>
        </Col>
      )}

      {!simplified && showIframe && (
        <Col xs={24} sm={24} md={24} lg={24}>
          {isLoading && (
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <LoadingOutlined
                style={{ fontSize: 30, color: "#1890ff" }}
                spin
              />
            </div>
          )}
          <iframe
            key={newsCategory}
            src={
              newsCategory === ""
                ? "https://cryptonews.com/news/"
                : `https://cryptonews.com/?s=${newsCategory}`
            }
            title="CryptoNews"
            style={{
              width: "100%",
              height: "500px",
              border: "none",
              borderRadius: "8px",
            }}
            allowFullScreen
            onLoad={handleIframeLoad}
          />
        </Col>
      )}

      {cryptoNews?.response?.results?.map((news, i) => {
        return (
          <Col xs={24} sm={12} md={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.webUrl} target="_blank" rel="noreferrer">
                <div
                  className="news-image-container"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    marginTop: 0,
                  }}
                >
                  <img
                    src={news.fields.thumbnail || demoImage}
                    alt="article thumbnail"
                    style={{
                      width: "100%",
                      maxHeight: 120,
                      objectFit: "cover",
                      marginBottom: 10,
                    }}
                  />
                  <Title className="news-title" level={5}>
                    {news.fields.headline}
                  </Title>
                </div>
                <p>
                  {news.fields.trailText.length > 100
                    ? `${news.fields.trailText.substring(0, 100)}...`
                    : news.fields.trailText}
                </p>
                <Text>
                  {moment(news.webPublicationDate).startOf("second").fromNow()}
                </Text>
                <div className="news-provider-container">
                  <Avatar src={theGuardian} />
                  <Text className="news-provider-name">Powered by The Guardian</Text>
                </div>
              </a>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default News;
