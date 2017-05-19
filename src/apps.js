import Component from 'inferno-component';

class Apps extends Component {
  render() {
    return (
      <section className="Apps">
        <div className="Apps-wrap">
          {
            this.props.items.map(item =>
              <article className="Apps-item">
                <div className="Apps-item-wrap">
                  <img className="Apps-item-icon" src={ item.image } alt={ item.name } />
                  <a className="Apps-item-download" href={ item.link } target="_blank">
                    Install <i className="material-icons">get_app</i>
                  </a>
                  <div className="Apps-item-text">
                    <h2 className="Apps-item-title" dangerouslySetInnerHTML={{__html: item._highlightResult.name.value }}></h2>
                    <span className="Apps-item-info">
                      <i className="material-icons">label</i>
                      <span dangerouslySetInnerHTML={{__html: item.category }}></span>
                      <span className="Apps-item-info-rank">#{ item.rank }</span>
                    </span>
                  </div>
                </div>
              </article>
            )
          }
        </div>
      </section>
    );
  }
}

export default Apps;
