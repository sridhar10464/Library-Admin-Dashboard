import React, { useState } from 'react';
import { Layout, Menu, Table, Modal, Form, Input, Button, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const { Header, Content } = Layout;

// Mock data
const initialBooks = [
  { id: 1, title: 'Book 1', author: 'Author 1', isbn: 'ISBN 1' },
  { id: 2, title: 'Book 2', author: 'Author 2', isbn: 'ISBN 2' },
  { id: 3, title: 'Book 3', author: 'Author 3', isbn: 'ISBN 3' },
];

// Form validation schema
const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  author: Yup.string().required('Author is required'),
  isbn: Yup.string().required('ISBN is required'),
});

const AdminDashboard = () => {
  const [books, setBooks] = useState(initialBooks);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  // Formik form configuration
  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      isbn: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (selectedBook) {
        // Update existing book
        const updatedBooks = books.map((book) =>
          book.id === selectedBook.id ? { ...book, ...values } : book
        );
        setBooks(updatedBooks);
        setSelectedBook(null);
      } else {
        // Add new book
        const newBook = {
          id: Date.now(),
          ...values,
        };
        setBooks([...books, newBook]);
      }
      resetForm();
      setIsModalVisible(false);
    },
  });

  const handleEdit = (book) => {
    setSelectedBook(book);
    formik.setValues(book);
    setIsModalVisible(true);
  };

  const handleDelete = (bookId) => {
    const updatedBooks = books.filter((book) => book.id !== bookId);
    setBooks(updatedBooks);
  };

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Author', dataIndex: 'author', key: 'author' },
    { title: 'ISBN', dataIndex: 'isbn', key: 'isbn' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, book) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(book)}
          />
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(book.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
          <Link to="/">Home</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '50px' }}>
       
 <div style={{ marginBottom: '20px' }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            Add Book
          </Button>
        </div>
        <Table dataSource={books} columns={columns} />
      </Content>
      <Modal
        title={selectedBook ? 'Edit Book' : 'Add Book'}
        open={isModalVisible}
        onCancel={() => {
          setSelectedBook(null);
          setIsModalVisible(false);
          formik.resetForm();
        }}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={formik.handleSubmit}
            loading={formik.isSubmitting}
          >
            {selectedBook ? 'Update' : 'Save'}
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Title">
            <Input
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title && (
              <div style={{ color: 'red' }}>{formik.errors.title}</div>
            )}
          </Form.Item>
          <Form.Item label="Author">
            <Input
              name="author"
              value={formik.values.author}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.author && formik.errors.author && (
              <div style={{ color: 'red' }}>{formik.errors.author}</div>
            )}
          </Form.Item>
          <Form.Item label="ISBN">
            <Input
              name="isbn"
              value={formik.values.isbn}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.isbn && formik.errors.isbn && (
              <div style={{ color: 'red' }}>{formik.errors.isbn}</div>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};
export default AdminDashboard;