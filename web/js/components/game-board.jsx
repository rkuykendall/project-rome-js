var GameBoard = function(React, Surface, HexGrid, PureRenderMixin, displayHelper) {
	return React.createClass({
		displayName: 'GameBoard',
		mixins: [PureRenderMixin],
		getInitialState: function() {
			return {
				units: [{row: 2, col: 1}],
				displayDimensions: displayHelper.getDimensions()
			}
		},
		setDisplayDimensions: function(dimensions) {
			this.setState({
				displayDimensions: displayHelper.getDimensions()
			});
		},
		componentWillMount: function() {
			displayHelper.subscribeResize(this.setDisplayDimensions);
		},
		componentWillUnmount: function() {
			displayHelper.unsubscribeResize(this.setDisplayDimensions);
		},
		render: function() {
			var width = this.state.displayDimensions.width;
			var height = this.state.displayDimensions.height;

			return (
				<Surface width={ width } height={ height }>
					<HexGrid width={ width } height={ height } hexCountHorizontal='4' hexCountVertical='5' units={this.state.units} />
				</Surface>
			);
		}
	});
};

GameBoard.$inject = ['React', 'Surface', 'HexGrid', 'PureRenderMixin', 'displayHelper'];
module.exports = GameBoard;
