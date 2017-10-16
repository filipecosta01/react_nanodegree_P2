import React, { Component } from 'react'

import './PanelTitle.css'

export class PanelTitle extends Component {

  render() {
    const { rightTitle, rightSubtitle, leftTitle, leftSubtitle } = this.props

    return (
      <div className="PanelTitle">
        <div className="panel-title-container">
          <div className="panel-info-container align-left">
            {rightTitle && <h4>{rightTitle}</h4>}
            {rightSubtitle && <span className="italic">{rightSubtitle}</span>}
          </div>
          <div className="panel-info-container align-right">
            {leftTitle && <span>{leftTitle}</span>}
            {leftSubtitle && <span>{leftSubtitle}</span>}
          </div>
        </div>
      </div>
    )
  }

}

export default PanelTitle