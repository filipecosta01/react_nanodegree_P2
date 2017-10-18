import React, { Component } from 'react'

import moment from 'moment'
import Modal from 'react-modal'
import { createUUID } from '../../utils'

import './CreateComment.css'

import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

export class CreatePost extends Component {
  constructor(props) {
    super(props)

    this.state = {
      body: {
        value: '',
        isValidated: false
      },
      author: {
        value: '',
        isValidated: false
      }
    }
  }

  componentDidMount() {
    const { comment } = this.props

    if (comment) {
      this.setState({
        body: { value: comment.body, isValidated: true },
        author: { value: comment.author, isValidated: true }
      })
    }
  }

  getValidationState = (element) => {
    const value = element.value
    let isValidated = false

    if (value && value.length >= 1) {
      isValidated = true
    }

    return isValidated ? 'success' : 'error'
  }

  handleChange = (event) => {
    const { id, value } = event.target
    const isValidated = value && value.length > 1

    this.setState({ [id]: { value, isValidated } })
  }

  handleSubmit = (event) => {
    const { onSubmitForm, comment, post } = this.props
    event.preventDefault()

    const { body, author } = this.state
    const data = {}

    if (!comment) {
      data.id = createUUID()
      data.author = author.value
      data.parentId = post.id
    } else {
      data.comment = {
        id: comment.id
      }
    }
    
    data.body = body.value
    data.timestamp = moment().unix()

    onSubmitForm(data)
  }

  render() {
    const { body, author } = this.state
    const { comment, headerTitle, isOpen, onRequestClose } = this.props
    const allFieldsValidated = body.isValidated && author.isValidated
    const disabled = !!comment

    return (
      <Modal
        isOpen={isOpen}
        className={{
          base: 'Content'
        }}
        overlayClassName={{
          base: 'Overlay'
        }}
        contentLabel={headerTitle}
        onRequestClose={onRequestClose}
      >
        <div>
          <h2>{headerTitle}</h2>
          <hr/>
        </div>
        <form onSubmit={this.handleSubmit} className="CreateComment">
          <div className="form-container">
            <FormGroup
              controlId="author"
              validationState={this.getValidationState(author)}
            >
              <ControlLabel>Author</ControlLabel>
              <FormControl
                type="text"
                disabled={disabled}
                value={author.value}
                onChange={this.handleChange}
                placeholder="Author of the comment"
              />
              <FormControl.Feedback />
            </FormGroup>

            <FormGroup
              controlId="body"
              validationState={this.getValidationState(body)}
            >
              <ControlLabel>Body</ControlLabel>
              <FormControl
                value={body.value}
                onChange={this.handleChange}
                componentClass="textarea"
                placeholder="Body of the comment"
              />
              <FormControl.Feedback />
            </FormGroup>
          </div>

          <div className="submit-button-container">
            <Button
              type="submit"
              bsStyle="success"
              className="button-submit"
              disabled={!allFieldsValidated}
            >
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    )
  }
}

export default CreatePost
