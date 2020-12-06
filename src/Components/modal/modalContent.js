import React from 'react'
import {
  useLocation,
  useHistory
} from 'react-router-dom'
import { Row, Col, ListGroup , OverlayTrigger , Tooltip} from 'react-bootstrap';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

import 'bootstrap-v4-rtl/dist/css/bootstrap-rtl.min.css';
import styles from '../../Containers/widget/widget.module.css';
import MCStyles from './modalContent.module.css'
const ModalContent = () => {
  const location = useLocation();
  const history = useHistory()
  let widget_data = location.state.widgetData

  const goBackHandler = () => {
    history.goBack()
  }
  return (
    <div className="rtl" >
      <ListGroup variant="flush">
        {widget_data.map((item, i) => {
          const { data } = item
          if (item.widget_type === 'LEGEND_TITLE_ROW') {
            return <Row key={i} className='pt-3 pb-4'>
              <Col sm={9} >
                <h4>{data.title}</h4>
              </Col>
              <Col sm={3} className="d-flex justify-content-end">
                <OverlayTrigger 
                overlay={<Tooltip>Go To Modal</Tooltip>}
                placement ='bottom'>
                  <span className="d-inline-block">
                  <FaArrowAltCircleLeft size={30} className={MCStyles.goBack_btn} onClick={goBackHandler} />
                  </span>
                </OverlayTrigger>
              </Col>
            </Row>
          } else if (item.widget_type === 'FEATURE_ROW') {
            return <ListGroup.Item key={i} >
              <Row className="align-items-center">
                <Col sm={12} className="justify-content-start">
                  <img className={styles.widget_img} src={data.icon.image_url_light} alt={data.icon.icon_name} />
                  <a className={styles.paragraph}> {data.title}</a>
                </Col>

              </Row>
            </ListGroup.Item>
          }
        })}
      </ListGroup>
    </div>
  );
}

export default ModalContent