import Component from 'inferno-component';

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleKeyUp(e) {
    this.props.query.setQuery(e.target.value).search();
  }

  render() {
    return (
      <div className="Search">
        <button className="Search-nav" type="button" onClick={ this.props.toggleNav }>
          <i className="material-icons">menu</i>
        </button>
        <button className="Search-sort" type="button" onClick={ this.props.toggleSort }>
          rank <i class="material-icons">{ this.props.orderBy === 'rank:desc' ? 'arrow_drop_down' : 'arrow_drop_up' }</i>
        </button>
        <div className="Search-field">
          <input className="Search-input" type="text" onKeyUp={ this.handleKeyUp } placeholder="Search the apps…" />
        </div>
      </div>
    );
  }
}

export default Search;
