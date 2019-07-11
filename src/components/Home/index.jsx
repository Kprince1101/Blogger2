import React from "react";
import moment, { now } from "moment";
import { connect } from "react-redux";
import { Form } from "../Card";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleDelete(id) {
    const { onDelete } = this.props;
    onDelete(id);
  }

  handleEdit(card) {
    const { setEdit } = this.props;
    setEdit(card);
  }

  render() {
    const { cards } = this.props;

    return (
      <div className="container">
        <div className="row pt-5">
          <div className="col-12 col-lg-6 offset-lg-3">
            <h1 className="text-center">Blogger's Blogging Blog</h1>
          </div>
          <Form />
        </div>
        <div className="row pt-5">
          <div className="col-12 col-lg-6 offset-lg-3">
            {cards.map(card => {
              return (
                <div className="card my-3">
                  <div className="card-header">{card.title}</div>
                  <div className="card-body">
                    {card.body}
                    <p className="mt-5 text-muted">
                      <b>{card.author}</b>{" "}
                      {}
                    </p>
                  </div>
                  <div className="card-footer">
                    <div className="row">
                      <button
                        onClick={() => this.handleEdit(card)}
                        className="btn btn-primary mx-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => this.handleDelete(card._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cards: state.home.cards
});

const mapDispatchToProps = dispatch => ({
  onLoad: data => dispatch({ type: "HOME_PAGE_LOADED", data }),
  onDelete: id => dispatch({ type: "DELETE_CARD", id }),
  setEdit: card => dispatch({ type: "SET_EDIT", card })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
