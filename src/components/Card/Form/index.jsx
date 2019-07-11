import React from "react";
import { connect } from "react-redux";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      author: ""
    };

    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cardToEdit) {
      this.setState({
        title: nextProps.cardToEdit.title,
        body: nextProps.cardToEdit.body,
        author: nextProps.cardToEdit.author
      });
    }
  }

  handleSubmit() {
    const { onSubmit, cardToEdit, onEdit } = this.props;
    const { title, body, author } = this.state;

    if (cardToEdit) {
      onEdit(cardToEdit)
      this.setState({ title: "", body: "", author: "" })
    } else {
        onSubmit()
        this.setState({ title: "", body: "", author: "" })
    }
  }

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }

  render() {
    const { cardToEdit } = this.props;
    const { title, body, author } = this.state;

    return (
      <div className="col-12 col-lg-6 offset-lg-3">
        <input
          onChange={e => this.handleChangeField("title", e)}
          className="form-control my-3"
          placeholder="Card Title"
          value={title}
        />
        <textarea
          onChange={e => this.handleChangeField("body", e)}
          className="form-control my-3"
          placeholder="Card Body"
          value={body}
        />
        <input
          onChange={e => this.handleChangeField("author", e)}
          className="form-control my-3"
          placeholder="Card Author"
          value={author}
        />
        <button
          onClick={this.handleSubmit}
          className="btn btn-primary float-right"
        >
          {cardToEdit ? "Update" : "Submit"}
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch({ type: "SUBMIT_CARD", data }),
  onEdit: data => dispatch({ type: "EDIT_CARD", data })
});

const mapStateToProps = state => ({
  cardToEdit: state.home.cardToEdit
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
