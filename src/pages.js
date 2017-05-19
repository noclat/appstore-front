import Component from 'inferno-component';

class Pages extends Component {
  constructor(props) {
    super(props);

    this.set = this.set.bind(this);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }

  prev() {
    if (this.props.query.getPage() <= 0) return;
    this.props.query.previousPage().search();
  }

  next() {
    if (this.props.query.getPage() >= this.props.max-1) return;
    this.props.query.nextPage().search();
  }

  set(e) {
    var page = Math.min(Math.max(0, e.target.value - 1), this.props.max-1);
    this.props.query.setPage(page).search();
  }

  render() {
    var current = this.props.query.getPage() + 1;
    return (
      <nav className="Pages">
        <button className="Pages-btn" type="button" onClick={ this.prev } disabled={ current === 1 }>
          <i className="material-icons">navigate_before</i>
        </button>
        <div className="Pages-number">
          <input className="Pages-number-input" type="text" onChange={ this.set } value={ current } disabled={ this.props.max === 1 } />
          <span className="Pages-number-total">/ { this.props.max }</span>
        </div>
        <button className="Pages-btn" type="button" onClick={ this.next } disabled={ current === this.props.max }>
          <i className="material-icons">navigate_next</i>
        </button>
      </nav>
    );
  }
}

export default Pages;
