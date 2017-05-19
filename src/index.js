// Load Inferno
import { render } from 'inferno';
import Component from 'inferno-component';

// Load helpers
// import { extend } from './helpers';

// Load components
import Search from './search';
import Apps from './apps';
import Categories from './categories';
import Pages from './pages';

// Setup Algolia
import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';
var client = algoliasearch('LIZ1LXSNUZ', '8c4b7c92f4f051cd7986dd570e32758a');
var indexes = {
  'rank:desc': 'apps_desc',
  'rank:asc': 'apps_asc',
};
var query = algoliasearchHelper(client, indexes['rank:desc'], {
  facets: ['category'],
});


// Main component
class App extends Component {
  constructor(props) {
    super(props);
		this.state = {
      orderBy: 'rank:desc',
      query: query,
      nbPages: 1,
			hits: [],
			categories: [],
      nav: false,
		};

    this.toggleNav = this.toggleNav.bind(this);
    this.toggleSort = this.toggleSort.bind(this);

    // handle search result
    query.on('result', (function(res) {
      this.setState({
        hits: res.hits,
        categories: res.getFacetValues('category'),
        nbPages: res.nbPages,
        nav: this.state.nav && res.getFacetValues('category').length > 1, // close nav if a category is selected
      });
    }).bind(this));
	}

  componentDidMount() {
		query.search(); // display all results
  }

  toggleNav() {
    this.setState({
      nav: !this.state.nav,
    });
  }

  toggleSort() {
    var orderBy = this.state.orderBy === 'rank:desc' ? 'rank:asc' : 'rank:desc';
    this.setState({
      orderBy: orderBy,
    });
    query.setIndex(indexes[orderBy]);
    query.search();
  }

  render() {
    return (
      <main className={ this.state.nav ? 'Wrap nav-open' : 'Wrap'}>
        <div className="Overlay" onClick={ this.toggleNav }></div>
        <header className="Nav">
          <div className="Header">
            <img className="Header-logo" src="images/logo.svg" width="64" height="64" alt="Appstore" />
            <h1 className="Header-title">Appstore</h1>
          </div>
          <Categories query={ this.state.query } items={ this.state.categories } />
        </header>
        <section className="Main">
          <Search
            query={ this.state.query }
            toggleNav={ this.toggleNav }
            toggleSort={ this.toggleSort }
            orderBy={ this.state.orderBy } />
          <section className="Results">
            <Apps items={ this.state.hits } />
            <Pages query={ this.state.query } max={ this.state.nbPages } />
          </section>
          <footer className="Credits">Appstore by <a href="https://ntorres.com">Nicolas Torres</a> for <a href="https://algolia.com">Algolia</a></footer>
        </section>
      </main>
    );
  }
}


// Render app
render(<App />, document.getElementById('app'));
