import resources from './resources';
import PlayScreen from './screens/play';
import TextEntity from './entities/text';
import ShipEntity from './entities/ship';

/**
 * main
 */
window.game = {

    /**
     *
     * Initialize the application
     */
    onload() {

        // init the video
        if (!me.video.init(800, 800, {wrapper : "screen", scale : "auto", transparent : "true"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // Set some default debug flags
        me.debug.renderHitBox = true;

        // add "#debug" to the URL to enable the debug Panel
        if (me.game.HASH.debug === true) {
            window.onReady(function () {
                me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
            });
        }

        // set all ressources to be loaded
        me.loader.onload = this.loaded.bind(this);

        // set all ressources to be loaded
        me.loader.preload(resources);

        // load everything & display a loading screen
        me.state.change(me.state.LOADING);
    },

    /**
     * callback when everything is loaded
     */
    loaded() {

        // set the "Play/Ingame" Screen Object
        this.playScreen = new PlayScreen();
        me.state.set(me.state.PLAY, this.playScreen);

        // set the fade transition effect
        me.state.transition("fade", "#19232b", 250);

        // register our objects entity in the object pool
        let text = new TextEntity(0, 0, 100, 20);
        text.isPersistent = true;
        me.game.world.addChild(text);

        let ship = new ShipEntity(7200, 4200, 100, 20);
        ship.isPersistent = true;
        me.game.world.addChild(ship);

        // register on mouse event
        me.input.registerPointerEvent("pointermove", me.game.viewport, function (event) {
            me.event.publish("pointermove", [ event ]);
        }, false);

        // switch to PLAY state
        me.state.change(me.state.PLAY);
    }
};
