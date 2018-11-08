var unit
var width
var frequency
var amplitude
var step
var offset = 0;
var fps = 20;
var svg

function computeParams() {
    unit = Math.min(document.body.offsetHeight, document.body.offsetWidth) / 2
    width = 0.8 * unit
    frequency =  Math.PI / width * 2;
    amplitude = Math.PI * width / 30;
    step = unit / 30;
}

function setStyles() {
    svg.setAttribute('width', unit)
    svg.setAttribute('height', unit)
    svg.setAttribute('style', 'margin-top: ' + (-unit/2) + 'px; margin-left: ' + (-unit/2) + 'px')

    for(var i = 0; i < 3; i++) {
        svg.children[i].setAttribute('stroke-width', unit / 10)
    }
}

function sine(x) {
    return Math.sin(-frequency * (x + offset)) * amplitude + amplitude * 1.5;
}

window.onload = function() {
    svg = document.getElementById('anim')
    computeParams();
    setStyles()

    setInterval(function() {
        for(var i = 0; i < 3; i++) {
        var points = []
        for (var x = 0; x < (width / step); x++) {
            var y = sine(x * step)
            points.push([0.1 * unit + x * step, y + width / 3 * i + unit * 0.1])
        }

        svg.children[i].setAttribute('points', points.join(','))
        offset-=0.5
        }
    }, 1000/fps);
}

window.addEventListener("resize", function() {
    computeParams();
    setStyles()
});