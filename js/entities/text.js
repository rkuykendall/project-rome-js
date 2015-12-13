/************************************************************************************/
/*                                                                                  */
/*        a text entity                                                           */
/*                                                                                  */
/************************************************************************************/
export default me.Renderable.extend({
    init(x, y, width, height) {
        const self = this;
        this.text = "?,?";
        this.fontSize = 20;
        this.font = new me.Font("courier", this.fontSize, "white");

        // call the constructor
        this._super(me.Renderable, "init", [x, y, width, height]);
        this.floating = true;

        this.pointerDown = me.event.subscribe("pointermove", function (event) {
            self.text = "?,?";
            //self.text = Math.round(event.gameX) + "," + Math.round(event.gameY);
            if (me.levelDirector.getCurrentLevelId()) {
                const layer = me.game.world.getChildByName("Ground")[0];
                const tile = layer.getTile(event.gameWorldX, event.gameWorldY);
                if (tile) {
                    self.text = tile.col + "," + tile.row;
                }
            }
        });
    },

    draw(renderer) {
        renderer.setColor("black");
        renderer.fillRect(
            this.left,  this.top,
            this.width, this.height
        );
        this.font.draw(renderer, this.text, this.pos.x, this.pos.y);
    },

    update() {
        return true;
    },
});
