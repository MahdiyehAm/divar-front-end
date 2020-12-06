import React, { useState } from 'react';
import {
    Link,
    useRouteMatch,
} from 'react-router-dom'

import PropTypes from 'prop-types';
import { Row, Col, Modal, Button, ListGroup, Carousel } from 'react-bootstrap'
import { FaAngleLeft } from 'react-icons/fa';

import 'bootstrap-v4-rtl/dist/css/bootstrap-rtl.min.css';
import styles from './modal.module.css'
import widgetStyles from '../../Containers/widget/widget.module.css'
// import ModalContent from './modalContent';

const WidgetModal = (props) => {

    const { data, closeModal } = props
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false)
        closeModal()
    };
   
    const modalClass = styles.modal_container

    let { url } = useRouteMatch();

    return (
        <Modal size="lg" className={[modalClass, 'rtl'].join(' ')} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{data.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body >
                <ListGroup variant="flush" className={styles.modalListGroup}>
                    {data.action.payload.widget_list.map((item, i) => {
                        let itemClass = item.data.has_divider ? styles.borderBottom : 'border-0'
                        let textColor = item.data.text_color
                        let textColorClass = 'text-dark'
                        if (textColor === 'TEXT_PRIMARY') {
                            textColorClass = ['text-primary', styles.textBold].join(' ')
                        }
                        if (item.widget_type === 'DESCRIPTION_ROW') {
                            return <ListGroup.Item key={i} className={[itemClass, textColorClass, 'pt-0'].join(' ')}>
                                <Row className="align-items-center">
                                    <Col sm={12} className="justify-content-start">
                                        <p>{item.data.text}</p>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                        } else if (item.widget_type === 'TITLE_ROW') {
                            return <ListGroup.Item key={i} className={[itemClass, textColorClass].join(' ')}>
                                <Row className="align-items-center">
                                    <Col sm={12} className="justify-content-start">
                                        <p>{item.data.text}</p>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        } else if (item.widget_type === 'IMAGE_CAROUSEL_ROW') {
                            itemClass = styles.borderBottom
                            return <ListGroup.Item key={i} className={[itemClass, textColorClass].join(' ')}>
                                <Row className="align-items-center">
                                    <Col sm={{ span: 6, offset: 6 }} className="justify-content-start">
                                        <Carousel indicators={false}>
                                            {item.data.items.map(image => {
                                                return <Carousel.Item key={`image${i}`}>
                                                    <img
                                                        className="d-block w-100"
                                                        src={image.image_url}
                                                        alt="image"
                                                    />
                                                </Carousel.Item>
                                            })}
                                        </Carousel>
                                    </Col>

                                </Row>
                            </ListGroup.Item>
                        } else if (item.widget_type === 'FEATURE_ROW') {
                            return <ListGroup.Item key={i} className={[itemClass, textColorClass].join(' ')}>
                                <Row className="align-items-center">
                                    <Col sm={12} className="justify-content-start">
                                        <img className={widgetStyles.widget_img} src={item.data.icon.image_url_light} alt={item.data.icon.icon_name} />
                                        <a className={widgetStyles.paragraph}> {item.data.title}</a>
                                    </Col>

                                </Row>
                            </ListGroup.Item>
                        } else if (item.widget_type === 'SCORE_ROW') {
                            return <ListGroup.Item action={item.data.action ? true : false} key={i} className={[itemClass, textColorClass].join(' ')}>
                                {item.data.action ? <Link to={{
                                    pathname: `${url}/${item.data.action.payload.slug}`,
                                    state: { widgetData: item.data.action.payload.widget_list }
                                }}
                                    className={styles.linkItem}>
                                    <Row className="align-items-center">
                                        <Col md={7} xs={6} className="justify-content-start">
                                            <img className={widgetStyles.widget_img} src={item.data.icon.image_url_light} alt={item.data.icon.icon_name} />
                                            <a className={widgetStyles.paragraph}> {item.data.title}</a>
                                        </Col>
                                        <Col md={4} xs={4} className="justify-content-between">
                                            <p>{item.data.descriptive_score}</p>
                                        </Col>
                                        <Col md={1} xs={1}>
                                            <FaAngleLeft />
                                        </Col>
                                    </Row>
                                </Link>
                                    :
                                <Row className="align-items-center" key={i}>
                                    <Col xs={6} className="justify-content-start">
                                        <img className={widgetStyles.widget_img} src={item.data.icon.image_url_light} alt={item.data.icon.icon_name} />
                                        <a className={widgetStyles.paragraph}> {item.data.title}</a>
                                    </Col>
                                    <Col xs={6} className="justify-content-between">
                                        <p>{item.data.descriptive_score}</p>
                                    </Col>
                                </Row>}
                            </ListGroup.Item>
                        }
                        else {
                            return <ListGroup.Item key={i} className={[itemClass, textColorClass].join(' ')}>
                                <Row className="align-items-center">
                                    <Col sm={8} className="justify-content-start">
                                        <p>{item.data.title}</p>
                                    </Col>
                                </Row>
                                {/* {item.data.has_divider ? <hr /> : null} */}
                                {/* <p>{item.widget_type}</p> */}
                            </ListGroup.Item>
                        }
                    })}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>بستن</Button>
            </Modal.Footer>
        </Modal>
    )
}

WidgetModal.propTypes = {
    data: PropTypes.object,
    closeModal: PropTypes.func
};

export default WidgetModal;