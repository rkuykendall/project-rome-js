export default me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        // load a level
        me.levelDirector.loadLevel("map");
    },

    /**
     *  action to perform on state change
     */
    onDestroyEvent() {
    }
});
