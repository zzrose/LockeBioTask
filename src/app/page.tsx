"use client"

import React, { useState, useEffect, useRef } from 'react';
import {
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Col, Row, Button, message } from 'antd';
import 'antd/dist/reset.css';
import Table from '@/app/components/Table'
import OrderForm from '@/app/components/OrderForm'
// import "./globals.css";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];
type TableProps = {
  id: string,
  data: []
}

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

// const items: MenuItem[] = [
//   getItem('Pharmacy', 'sub1', <UserOutlined />, [
//     getItem('HealthMart', 'HealthMart'),
//     getItem('CarePlus', 'CarePlus'),
//     getItem('QuickCare', 'QuickCare'),
//   ]),
// ];

// type Data = []

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [title, setTitle] = useState('HealthMart')
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([])
  // const [confirmLoading, setConfirmLoading] = useState(false);
  // const [modalText, setModalText] = useState('Content of the modal');
  // const refContainer = useRef(null);
  // const [messageApi, contextHolder] = message.useMessage();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    getPharmacyOrder('HealthMart');
    getAllPharmacy()
  }, []);

  const chooseItem: MenuProps['onClick'] = (e) => {
    getPharmacyOrder(e.key)
    setTitle(e.key)
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCreate = async (e:any) => {
    try {
      if (title === 'CarePlus') {
        // console.log('post-CarePlus')
        const payload: any = {
          pharmacy: title,
          payload: {
            carePlusProduct: e.product,
            carePlusQuantity: e.quantity,
            carePlusClientInfo: {
              carePlusClientName: e.clientName,
              carePlusClientAddress: e.clientAddress,
              carePlusClientCity: e.clientCity,
              carePlusClientState: e.clientState,
              carePlusClientZipcode: e.clientZipcode,
              carePlusClientCountry: e.clientCountry
            }
          }
        }
        const res = await fetch(`/api/order`,
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }) 
        if (res.status === 200) {
          message.success('New order has been created successfully.')
          getPharmacyOrder('CarePlus')
        } 
      } else if (title === 'HealthMart') {
        // console.log('post-healthmart')
        const payload: any = {
          pharmacy: title,
          payload: {
            healthMartProduct: e.product,
            healthMartQuantity: e.quantity,
            healthMartCustomerInfo: {
              healthMartCustName: e.clientName,
              healthMartCustAddress: e.clientAddress,
              healthMartCustCity: e.clientCity,
              healthMartCustState: e.clientState,
              healthMartCustZipcode: e.clientZipcode,
              healthMartCustCountry: e.clientCountry
            }
          }
          
        }
        const res = await fetch(`/api/order`,
        {
          method: 'POST',
          body: JSON.stringify(payload),

        }) 
        if (res.status === 200) {
          message.success('New order has been created successfully.')
          getPharmacyOrder('HealthMart')
        } 
      } else if (title === 'QuickCare') {
        // console.log('post-QuickCare')
        const payload: any = {
          pharmacy: title,
          payload: {
            quickCareProduct: e.product,
            quickCareQuantity: e.quantity,
            quickCareUserData: {
              quickCareUserName: e.clientName,
              quickCareUserAddress: e.clientAddress,
              quickCareUserCity: e.clientCity,
              quickCareUserState: e.clientState,
              quickCareUserZipcode: e.clientZipcode,
              quickCareUserCountry: e.clientCountry
            }
          }
          
        }
        const res = await fetch(`/api/order`,
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }) 
        if (res.status === 200) {
          message.success('New order has been created successfully.')
          getPharmacyOrder('QuickCare')
        } 
      }

    }catch(e) {
      message.error('New order created failed.')
      console.log(e)
    }

    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const getAllPharmacy = async () => {
    try {
      const res = await fetch(`/api/pharmacy`,
        {
          method: 'GET',
        }) 
        const results = await res.json()
        const list: any = [
          getItem('Pharmacy', 'sub1', <UserOutlined />, 
            results.map((res:any)=>getItem(res.name.split(' ')[0], res.name.split(' ')[0]))
          ),
        ];
        setItems(list)
    }catch(e) {
      console.log(e)
    }
  }

  const getPharmacyOrder = async (pharmacy:string) => {
    // console.log('pharmacyType', pharmacy)
    try {
      const list:any = []
      if (pharmacy === 'CarePlus') {
        const res = await fetch(`/api/order?CarePlus`,
        {
          method: 'GET',
        }) 
        const results = await res.json()
        
        if (results && results.length > 0) {
          for(const result of results) {
            if(result.carePlusId && result.carePlusId !== '') {
              const obj = {
                id: result.carePlusId,
                product: result.carePlusProduct || '',
                quantity: result.carePlusQuantity || '',
                clientName: result.carePlusClientInfo && result.carePlusClientInfo.carePlusClientName || '',
                clientAddress: result.carePlusClientInfo && result.carePlusClientInfo.carePlusClientAddress || '',
                clientCity: result.carePlusClientInfo && result.carePlusClientInfo.carePlusClientCity || '',
                clientCountry: result.carePlusClientInfo && result.carePlusClientInfo.carePlusClientCountry || '',
                clientState: result.carePlusClientInfo && result.carePlusClientInfo.carePlusClientState || '',
                clientZipcode: result.carePlusClientInfo && result.carePlusClientInfo.carePlusClientZipcode || ''
              }
              list.push(obj)
            }
          }
        }
      } else if (pharmacy === 'HealthMart') {
        const res = await fetch(`/api/order?HealthMart`,
        {
          method: 'GET',
        }) 
        const results = await res.json()
        
        if (results && results.length > 0) {
          for(const result of results) {
            if(result.healthMartId && result.healthMartId !== '') {
              const obj = {
                id: result.healthMartId,
                product: result.healthMartProduct || '',
                quantity: result.healthMartQuantity || '',
                clientName: result.healthMartClientInfo && result.healthMartClientInfo.healthMartClientName || result.healthMartCustomerInfo && result.healthMartCustomerInfo.healthMartCustName ||'',
                clientAddress: result.healthMartClientInfo && result.healthMartClientInfo.healthMartClientAddress || result.healthMartCustomerInfo && result.healthMartCustomerInfo.healthMartCustAddress ||'',
                clientCity: result.healthMartClientInfo && result.healthMartClientInfo.healthMartClientCity || result.healthMartCustomerInfo && result.healthMartCustomerInfo.healthMartCustCity || '',
                clientCountry: result.healthMartClientInfo && result.healthMartClientInfo.healthMartClientCountry || result.healthMartCustomerInfo && result.healthMartCustomerInfo.healthMartCustCountry ||'',
                clientState: result.healthMartClientInfo && result.healthMartClientInfo.healthMartClientState || result.healthMartCustomerInfo && result.healthMartCustomerInfo.healthMartCustState ||'',
                clientZipcode: result.healthMartClientInfo && result.healthMartClientInfo.healthMartClientZipcode || result.healthMartCustomerInfo && result.healthMartCustomerInfo.healthMartCustZipcode ||''
              }
              list.push(obj)
            }
          }
        }
      } else if (pharmacy === 'QuickCare') {
        const res = await fetch(`/api/order?QuickCare`,
        {
          method: 'GET',
        }) 
        const results = await res.json()
        
        if (results && results.length > 0) {
          for(const result of results) {
            if(result.quickCareId && result.quickCareId !== '') {
              const obj = {
                id: result.quickCareId,
                product: result.quickCareProduct || '',
                quantity: result.quickCareQuantity || '',
                clientName: result.quickCareClientInfo && result.quickCareClientInfo.quickCareClientName || result.quickCareUserData && result.quickCareUserData.quickCareUserName || '',
                clientAddress: result.quickCareClientInfo && result.quickCareClientInfo.quickCareClientAddress || result.quickCareUserData && result.quickCareUserData.quickCareUserAddress || '',
                clientCity: result.quickCareClientInfo && result.quickCareClientInfo.quickCareClientCity || result.quickCareUserData && result.quickCareUserData.quickCareUserCity || '',
                clientCountry: result.quickCareClientInfo && result.quickCareClientInfo.quickCareClientCountry || result.quickCareUserData && result.quickCareUserData.quickCareUserCountry || '',
                clientState: result.quickCareClientInfo && result.quickCareClientInfo.quickCareClientState || result.quickCareUserData && result.quickCareUserData.quickCareUserState || '',
                clientZipcode: result.quickCareClientInfo && result.quickCareClientInfo.quickCareClientZipcode || result.quickCareUserData && result.quickCareUserData.quickCareUserZipcode || ''
              }
              list.push(obj)
            }
          }
        }
      }
      
      setData(list)
    } catch(e) {
      console.log(e)
    }     
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{width: "100%", height: '70px', color:'#4169E1', fontSize: '33px', fontWeight: 'bold', textAlign: 'center', padding: '15px'}}>Locke Bio</div>
        <Menu theme="dark" defaultSelectedKeys={['HealthMart']} defaultOpenKeys={['sub1']} mode="inline" items={items} onClick={chooseItem}/>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
        <Row>
          <Col span={12}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Pharmacy</Breadcrumb.Item>
              <Breadcrumb.Item>{title}</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
            <Col span={12} style={{textAlign: 'right', paddingTop: '12px', paddingRight: '20px'}}>
            <Button type="primary" shape="round" icon={<PlusOutlined />} onClick={showModal}>
              New Order
            </Button>
            <OrderForm
              open={open}
              pharmacy={title}
              onCancel={handleCancel}
              onCreate={(e:any) => handleCreate(e)}
            />
            </Col>
          </Row>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Table pharmacy={title} data={data}></Table>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;