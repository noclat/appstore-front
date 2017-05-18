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
      <div>
        <button type="button" onClick={ this.prev }>Previous</button>
        <input type="text" onChange={ this.set } value={ current } /> / { this.props.max }
        <button type="button" onClick={ this.next }>Next</button>
      </div>
    );
  }
}

export default Pages;
