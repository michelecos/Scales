# Scales

Scales is a library for drawing scales on a guitar fretboard.
The library is very easy to use.
You should provide an html5 canvas, where the library will draw a guitar neck and scales

    <canvas id="theCanvas" width="1000" height="90" style="border:0px solid #000000;">
       Does yout browser support the canvas tag?
    </canvas>

Drawing a a fretboard requires creation of a Fretboard object, with a number of frets as an optional construction parameter 

    const fretboard = new Fretboard(document.getElementById('theCanvas'), 24);

