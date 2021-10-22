import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import Loader from './Loader';
import moment from 'moment';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useGetCryptosQuery } from '../services/cryptoApi';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 20 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input className="search-input" placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link key={currency.id} to={`/crypto/${currency.id}`}>
              <Card style={{borderRadius: '1rem'}} title={`${currency.rank}. ${currency.name}`} extra={<img className="crypto-image" src={currency.iconUrl} alt="image of crypto-currency" />} hoverable>
                <p>Price $ {millify(currency.price)} </p>
                <p>Market Capital: {millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
                <p>Launch Date : {moment(currency.firstSeen).format('Do MMM YYYY') }</p>
                <p>All time High Price:  ${millify(currency.allTimeHigh.price)}</p>
                <p>All time High Date: {moment(currency.allTimeHigh.timestamp).format('Do MMM YYYY') }</p>
                <div style={{textAlign: 'center'}}> 
                  <span style={{color:'blue', marginRight: '1rem' }}>More Details</span>
                  <ArrowRightOutlined />
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
