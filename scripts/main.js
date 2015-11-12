var App = React.createClass({
  render: function() {
    return (
      <div className="app">
        <SearchGroup />
      </div>
    );
  }
});

var SearchGroup = React.createClass({
  getInitialState: function() {
    return { traits: {} };
  },
  handleSearch: function(search) {
    var thiz = this;

    $.get('/search', search, function(data){
      thiz.setState({ traits: data.tree.children });
    });
  },
  render: function() {
    return (
      <div className = "search-group">
        <SearchText onSearchSubmit={ this.handleSearch }/>
        { Object.keys(this.state.traits).length && // Checks if we have traits before trying to render <Trait /> (i.e. if search was submitted)
          <div>
            { this.state.traits.map(function(trait) {
              return (
                <Trait data={ trait } />
              );
            })}
          </div> }
      </div>
    );
  }
});

var SearchText = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();
    var text = $('[name=searchbox]').val();
    if (!text) return;
    this.props.onSearchSubmit( text );
    $('[name=searchbox]').val('');
  },
  render: function() {
    return (
      <div>
        <form name="searchform" onSubmit={ this.handleSubmit }>
          <input type="text" name="searchbox" placeholder="Type in artist's name" />
          <input type="submit" value="Analyze" />
        </form>
      </div>
    );
  }
});

var Trait = React.createClass({
  render: function() {
    var traitName = this.props.data.name === 'Big 5' ? this.props.data.name + ' (Personality)' : this.props.data.name;
    var subTraits = this.props.data.children[0].children;
    return (
      <div className="container">
        <h2>{ traitName }</h2>
        <SubTrait data={ subTraits } />
      </div>
    );
  }
});

var SubTrait = React.createClass({

  render: function() {
    var subTraits = this.props.data;
    var subTraitNodes = subTraits.map(function(subTrait){
      var subSubTraitNodes;

      if( subTrait.children ){
        subSubTraitNodes = subTrait.children.map(function(subSubTrait){
          return (
            <SubSubTrait data={subSubTrait} />
          );
        })
      }

      return (
        <div>
          <h4>
            { subTrait.name }
            <span className="score">
              { convertPercentage(subTrait.percentage) }
            </span>
          </h4>
          { subSubTraitNodes }
        </div>
      );
    });

    return (
      <div>
        { subTraitNodes }
      </div>
    );
  }
});

var SubSubTrait = React.createClass({
  render: function() {
    var name = this.props.data.name;
    var score = convertPercentage(this.props.data.percentage);

    return (
      <div className="subsubtrait">
        <span>{ name } <span className="score">{ score }</span> </span>
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('content')
);