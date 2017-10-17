import React, { Component } from 'react'

import './PanelTitle.css'

import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import * as FontAwesome from 'react-icons/lib/fa'

export class PanelTitle extends Component {

  render() {
    const {
      linkTo,
      leftTitle,
      rightTitle,
      leftSubtitle,
      rightSubtitle,
      
      showEditArea,
      showActionButtons,

      onUpVote,
      onDownVote
    } = this.props

    return (
      <div className="PanelTitle">
        <div className="panel-title-container">
          <div className="panel-info-container align-left">
            {rightTitle && <h4>{rightTitle}</h4>}
            {rightSubtitle && <span className="italic">{rightSubtitle}</span>}
          </div>
          <div className="panel-info-container align-right">
            {leftTitle && <span>{leftTitle}</span>}
            
            {leftSubtitle && (
            <div className="left-subtitle-container">
                {leftSubtitle.map((subtitle) => <span>{subtitle}</span> )}
              </div>
            )}

            {showActionButtons && (
              <div className="buttons-container">
                <Button
                  bsStyle="info"
                  className="margin-right"
                  onClick={onUpVote}
                >
                  <FontAwesome.FaThumbsOUp />
                </Button>
                <Button
                  bsStyle="warning"
                  className="margin-right"
                  onClick={onDownVote}
                >
                  <FontAwesome.FaThumbsODown />
                </Button>

                {linkTo &&
                  <Link to={linkTo}>
                    <Button bsStyle="success" className={showEditArea && "margin-right"}>
                      Comments
                      {' '}
                      <FontAwesome.FaCommentsO />
                    </Button>
                  </Link>
                }

                <Button
                  bsStyle="secondary"
                  className={showEditArea ? "margin-right" : "hidden"}
                  onClick={onDownVote}
                >
                  <FontAwesome.FaPencil />
                </Button>

                <Button
                  bsStyle="danger"
                  className={!showEditArea && "hidden"}
                  onClick={onDownVote}
                >
                  <FontAwesome.FaTrashO />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

}

export default PanelTitle