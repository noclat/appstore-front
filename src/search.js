import Component from 'inferno-component';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.clearField = this.clearField.bind(this);
  }

  handleKeyUp(e) {
    this.setState({
      value: e.target.value,
    });
    this.props.query.setQuery(e.target.value).search();
  }

  clearField(e) {
    this.setState({
      value: '',
    });
    this.props.query.setQuery('').search()
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
          { this.state.value &&
            <button className="Search-field-clear" type="button" onClick={ this.clearField }>
              <i className="material-icons">clear</i>
            </button>
          }
          <input className="Search-field-input" type="text" onKeyUp={ this.handleKeyUp } placeholder="Search the apps…" value={ this.state.value } />
        </div>
      </div>
    );
  }
}

export default Search;
