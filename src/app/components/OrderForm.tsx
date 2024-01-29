import React from 'react';
import { Button, Checkbox, Form, Input, Modal, InputNumber } from 'antd';

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  product?: string;
  quantity?: number;
  clientName?: string;
  clientAddress?: string;
  clientCity?: string;
  clientCountry?: string;
  clientState?: string;
  clientZipcode?: string;
};

interface Props {
  open: boolean;
  pharmacy: string;
  onCreate: any;
  onCancel: any;
}

const App: React.FC<Props> = ({ open, pharmacy, onCreate, onCancel }) => (
  <Modal
    open={open}
    title={<div>{pharmacy} - Add New Order</div>}
    onCancel={onCancel}
    footer={null}
  >
    <Form
      name="basic"
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 13 }}
      style={{ maxWidth: 400 }}
      // initialValues={{ remember: true }}
      onFinish={onCreate}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Product"
        name="product"
        rules={[{ required: true, message: 'Please input Product!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Quantity"
        name="quantity"
        rules={[{ required: true }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item<FieldType>
        label="client Name"
        name="clientName"
        rules={[{ required: true, message: 'Please input clientName!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="client Address"
        name="clientAddress"
        rules={[{ required: true, message: 'Please input clientAddress!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="client City"
        name="clientCity"
        rules={[{ required: true, message: 'Please input clientCity!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="client Country"
        name="clientCountry"
        rules={[{ required: true, message: 'Please input clientCountry!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="client State"
        name="clientState"
        rules={[{ required: true, message: 'Please input clientState!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="clientZipcode"
        name="clientZipcode"
        rules={[{ required: true, message: 'Please input clientZipcode!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 10, span: 18 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </Modal>
);

export default App;