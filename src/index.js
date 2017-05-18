// Load Inferno
import { render } from 'inferno';
import Component from 'inferno-component';

// Load helpers
// import { extend } from './helpers';

// Load components
import Apps from './apps';
import Categories from './categories';
import Pages from './pages';

// Setup Algolia
import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';
var client = algoliasearch('LIZ1LXSNUZ', '8c4b7c92f4f051cd7986dd570e32758a');
var query = algoliasearchHelper(client, 'apps', {
  facets: ['category'],
});


// Main component
class App extends Component {
  constructor(props) {
    super(props);
		this.state = {
      query: query,
      nbPages: 1,
			hits: [],
			categories: [],
		};

    this.handleKeyUp = this.handleKeyUp.bind(this);

    query.on('result', (function(res) {
      this.setState({
        hits: res.hits,
        categories: res.getFacetValues('category'),
        nbPages: res.nbPages,
      });
    }).bind(this));
	}

  componentDidMount() {
		query.search();
  }

  render() {
    return (
      <div className="App">
        <input type="text" onKeyUp={ this.handleKeyUp } />
        <Categories query={ this.state.query } items={ this.state.categories } />
        <hr/>
        <Apps items={ this.state.hits } />
        <hr/>
        <Pages query={ this.state.query } max={ this.state.nbPages } />
      </div>
    );
  }

  handleKeyUp(e) {
    query.setQuery(e.target.value).search();
  }
}


// Render app
render(<App />, document.getElementById('app'));
