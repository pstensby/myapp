var MainView = Backbone.View.extend({
    el: '#main',

    render: function() {
        var sum = Calc.sum(10, 10);
        this.$el.html('The sum is: ' + sum);
    }
});