module.exports = (function() {

    Element.implement('vAlign', function(element) {
        var e = this,
            p = e.getParent(),
            m = (p.getSize().y - e.getSize().y) / 2;
        e.setStyle('margin-top', m);
    });

})();