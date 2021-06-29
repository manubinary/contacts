import React, {useEffect, useState} from 'react';
import './Home.css';
import {Row, Col} from 'react-bootstrap';
import data from './contacts.json';
import Modal from 'react-modal';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

function Home() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState('');
  const [dataList, setDataList] = useState(data);
  const [notification, setNotification] = useState('')
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false)
    }, 5000)

    return () => {
      clearTimeout(timeId)
    }
  });

  const editContact = (key) => {
    setSelectedContact(key);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedContact('');
    setIsOpen(false);
  };

  const submitData = () => {
    setSelectedContact('');
    setIsOpen(false);
    const result = dataList;
    setDataList(result);
    setShow(true);
    setNotification('Contact has been updated');
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: '20%',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
    },
  };

  const getContactList = () => {
    const dataList = [];
    dataList.push(
      <Row className="headerContainer">
        <Col md={2}>Name</Col>
        <Col md={3}>Email</Col>
        <Col md={1}>Age</Col>
        <Col md={2}>Contact Number</Col>
        <Col md={3}>Street</Col>
        <Col md={1}>Action</Col>
      </Row>
    );
    data.forEach((item, key) => {
      dataList.push(
        <Row className="dataContainer">
          <Col md={2}>{item.name}</Col>
          <Col md={3}>{item.email}</Col>
          <Col md={1}>{item.age}</Col>
          <Col md={2}>{item.phone}</Col>
          <Col md={3}>{item.street}</Col>
          <Col md={1} className="editIconContainer"><EditIcon onClick={() => editContact(key)} className='iconStyle editIcon'/></Col>
        </Row>
      );
    });
    return (dataList);
  };

  const updateValues = (value, key) => {
    const result = dataList;
    dataList[selectedContact][key] = value;
  };

  const getModalContent = () => {
    const editElement = [];
    if (selectedContact !== '') {
      editElement.push(<div className="modalContainer">
        <Row>
          <Col md={6} className="editHeaderContainer">Update Contact</Col>
          <Col md={6}><CloseIcon onClick={() => closeModal()} className='iconStyle closeIcon'/></Col>
          <Col md={4}>Name</Col><Col md={5}><input type="text" name="name" defaultValue={data[selectedContact].name} onChange={(e) => updateValues(e.target.value, 'name')}/> </Col>
          <Col md={4}>Email</Col><Col md={5}><input type="text" name="email" defaultValue={data[selectedContact].email} onChange={(e) => updateValues(e.target.value, 'email')}/></Col>
          <Col md={4}>Contact Number</Col><Col md={5}><input type="text" name="contact" defaultValue={data[selectedContact].phone} onChange={(e) => updateValues(e.target.value, 'phone')}/></Col>
          <Col md={4}>Age</Col><Col md={5}><input type="number" name="age" defaultValue={data[selectedContact].age} onChange={(e) => updateValues(e.target.value, 'age')}/></Col>
          <Col md={4}>Street</Col><Col md={5}><input type="text" name="street" defaultValue={data[selectedContact].street} onChange={(e) => updateValues(e.target.value, 'street')}/></Col>
          <Col md={12} className="submitContainer"><Button variant="contained" color="primary" onClick={() => { submitData();}}> Submit </Button> </Col>
        </Row>
      </div>);
    }
    return (editElement);
  };

  return(
    <div className="mainHome">
      <Row className="mainHeader">
        <Col className="header">
          <h1>Your Contacts</h1>
        </Col>
      </Row>
        {show && <div className="notificationContainer">{notification}</div>}
      <Row className="content" >
        <Col>{getContactList()}</Col>
      </Row>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          style={customStyles}
        >
          {getModalContent()}
        </Modal>
    </div>
  )
}

export default Home;
