var HelloMessage = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

ReactDOM.render(<HelloMessage name="John" />, mountNode);

<div class="modal-content">
  <h4>Modal Header</h4>
  <p>A bunch of text</p>
</div>
<div class="modal-footer">
  <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
</div>
