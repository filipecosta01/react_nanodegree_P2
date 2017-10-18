/*
  Dumb component to keep the buttons we have on the Panel.
  It does not care about the type of the element (post or comment), just
  render the buttons according to props passed down by their parent.
*/

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
      
      showAdd,
      showEditArea,
      showActionButtons,

      onAdd,
      onEdit,
      onDelete,
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
                {leftSubtitle.map((subtitle) => <span key={subtitle}>{subtitle}</span> )}
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

                {showAdd &&
                  <Button
                    bsStyle="success"
                    className={"margin-right"}
                    onClick={onAdd}
                  >
                    <FontAwesome.FaCommentO />
                  </Button>
                }

                {linkTo &&
                  <Link to={linkTo}>
                    <Button bsStyle="success" className={showEditArea && "margin-right"}>
                      Details
                      {' '}
                      <FontAwesome.FaCommentsO />
                    </Button>
                  </Link>
                }

                <Button
                  bsStyle="default"
                  className={showEditArea ? "margin-right" : "hidden"}
                  onClick={onEdit}
                >
                  <FontAwesome.FaPencil />
                </Button>

                <Button
                  bsStyle="danger"
                  className={!showEditArea && "hidden"}
                  onClick={onDelete}
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