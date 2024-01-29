import React, { useRef, useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import type { GetRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';

type InputRef = GetRef<typeof Input>;
type TableProps = {
  pharmacy: string;
  data: any;
}

interface DataType {
  id: string;
  product: string;
  quantity: number;
  clientName: string;
  clientAddress: string;
  clientCity: string;
  clientCountry: string;
  clientState: string;
  clientZipcode: string;
}

type DataIndex = keyof DataType;

const TableComponent: React.FC<TableProps> = ({ pharmacy, data }) => {
  // console.log(pharmacy, data)

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'clientName',
      key: 'clientName',
      width: '15%',
      sorter: (a, b) => a.clientName.length - b.clientName.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'healthMartProduct',
      width: '10%',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Address',
      dataIndex: 'clientAddress',
      key: 'clientAddress',
      sorter: (a, b) => a.clientAddress.length - b.clientAddress.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'City',
      dataIndex: 'clientCity',
      key: 'clientCity',
      sorter: (a, b) => a.clientCity.length - b.clientCity.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Country',
      dataIndex: 'clientCountry',
      key: 'clientCountry',
      sorter: (a, b) => a.clientCountry.length - b.clientCountry.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'State',
      dataIndex: 'clientState',
      key: 'clientState',
      sorter: (a, b) => a.clientState.length - b.clientState.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Post Code',
      dataIndex: 'clientZipcode',
      key: 'clientZipcode',
    },
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default TableComponent;