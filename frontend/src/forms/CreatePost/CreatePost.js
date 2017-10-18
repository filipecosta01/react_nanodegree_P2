import React, { Component } from 'react'

import _ from 'lodash'
import moment from 'moment'
import Modal from 'react-modal'
import { createUUID } from '../../utils'

import './CreatePost.css'

import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

export class CreatePost extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: {
        value: '',
        isValidated: false
      },
      body: {
        value: '',
        isValidated: false
      },
      author: {
        value: '',
        isValidated: false
      },
      category: {
        value: '',
        isValidated: false
      },

    }
  }

  componentDidMount() {
    const { post } = this.props

    if (post) {
      this.setState({
        body: { value: post.body, isValidated: true },
        title: { value: post.title, isValidated: true },
        author: { value: post.author, isValidated: true },
        category: { value: post.category, isValidated: true }
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
    const { onSubmitForm, post } = this.props
    event.preventDefault()

    const { title, body, author, category } = this.state
    const data = {}

    if (!post) {
      data.id = createUUID()
      data.timestamp = moment().unix()
      data.author = author.value
      data.category = category.value
    } else {
      data.post = {
        id: post.id
      }
    }

    data.body = body.value
    data.title = title.value

    onSubmitForm(data)
  }

  render() {
    const { title, body, author, category } = this.state
    const { post, categories, headerTitle, isOpen, onRequestClose } = this.props
    const allFieldsValidated = title.isValidated && body.isValidated &&
      author.isValidated && category.isValidated
    const disabled = !!post

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
        <form onSubmit={this.handleSubmit} className="CreatePost">
          <div className="form-container">
            <FormGroup
              controlId="title"
              validationState={this.getValidationState(title)}
            >
              <ControlLabel>Title</ControlLabel>
              <FormControl
                type="text"
                value={title.value}
                onChange={this.handleChange}
                placeholder="Title of the post"
              />
              <FormControl.Feedback />
            </FormGroup>

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
                placeholder="Author of the post"
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
                componentClass="textarea"
                onChange={this.handleChange}
                placeholder="Body of the post"
              />
              <FormControl.Feedback />
            </FormGroup>

            <FormGroup
              controlId="category"
              validationState={this.getValidationState(category)}
            >
              <ControlLabel>Category</ControlLabel>
              <FormControl
                disabled={disabled}
                value={category.value}
                placeholder="Category"
                componentClass="select"
                onChange={this.handleChange}
              >
                <option value=''>Select a category...</option>
                {categories.map((category) => (
                  <option
                    key={category.path}
                    value={category.path}
                  >
                    {_.capitalize(category.name)}
                  </option>
                ))}
              </FormControl>
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
