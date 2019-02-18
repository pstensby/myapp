var App = Backbone.View.extend({
    initialize: function() {
        new MainView().render();
    }
});

!function() {
    new App();
}();