
// import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom'
import Axios from 'axios';
import { Container, Row, Col, ListGroup, ProgressBar } from 'react-bootstrap';
import { FaAngleLeft } from 'react-icons/fa';
import Modal from '../../Components/modal/modal'
import ModalContent from '../../Components/modal/modalContent'

import 'bootstrap-v4-rtl/dist/css/bootstrap-rtl.min.css';
import styles from './widget.module.css';

function Widget() {

  const [widgetItems, setWidgetItems] = useState([])
  const [loading, setLoading] = useState('')
  const [modalShow, setModalShow] = useState(false)
  const [modalData, setModalData] = useState(null)

  useEffect(() => {
    setLoading('Loading...!')
    Axios.get('/api/v1/widgets/actions')
      .then(response => {
        const resItems = response.data
        console.log(resItems)
        setWidgetItems(resItems)
        setLoading('')
      })
      .catch(error => {
        console.log(error)
        setLoading('')
      })
  }, [])

  const actionDispacher = (data) => {
    setModalData(data)
    handleOpen()
  }

  const handleOpen = () => {
    setModalShow(true)
  }
  const hanldeClose = () => {
    setModalShow(false)
  }

  let { path  } = useRouteMatch();

  return (
    <Router>
      <Container>
        <Switch>
          <Route path={`${path}/:widgetSlug`} component={ModalContent} />

          <Route exact path={path}>
            <div className="rtl" >
              {modalShow && <Modal data={modalData} closeModal={hanldeClose} />}
              {loading}

              <ListGroup variant="flush">
                {widgetItems.map((item, i) => {
                  let classItem = item.data && item.data.has_divider ? styles.borderBottom : 'border-0'
                  if (item.widget_type === 'TITLE_ROW') {
                    const { data } = item
                    return <Row key={i} >
                      <Col xs={12} className='pt-3 pb-4'>
                        <p>{data.text}</p>
                      </Col>
                    </Row>
                  } else if (item.widget_type === 'UNEXPANDABLE_ROW') {
                    const { data } = item
                    return <Row key={i}>
                      <Col className="d-flex justify-content-start">
                        <p style={{ color: '#737373' }}>{data.title}</p>
                      </Col>
                      <Col className="d-flex justify-content-end">
                        <p>{data.value}</p>
                      </Col>
                    </Row>
                  } else if (item.widget_type === 'SECTION_DIVIDER_ROW') {
                    return <Row key={i}>
                      <Col sm={12} className={["align-self-center pt-3", styles.dividerRow].join(' ')}></Col>
                    </Row>
                  } else {
                    const { data } = item
                    const progressColor = data.score_color === 'SUCCESS_PRIMARY' ? "success" : "warning"
                    return <ListGroup.Item action key={i} className={classItem} onClick={() => actionDispacher(data)}>
                      <Row className="align-items-center">
                        <Col md={8} xs={6} className="justify-content-start">
                          <img className={styles.widget_img} src={data.icon.image_url_light} alt={data.icon.icon_name} />
                          <a className={styles.paragraph}> {data.title}</a>
                        </Col>
                        <Col md={3} xs={4} className="justify-content-between">
                          <ProgressBar variant={progressColor} now={data.percentage_score} />
                        </Col>
                        <Col md={1} xs={1}>
                          <FaAngleLeft />
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  }
                })}
              </ListGroup>
            </div>
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default Widget;
