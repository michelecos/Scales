// This class represents the fretboard
class Fretboard {
    constructor(numberOfFrets, canvas) {
        this.numberOfFrets = numberOfFrets;
        this.width = canvas.width;
        this.canvas = canvas;

        // this is an approxumation of the tempered scale
        // geometric progression ratio 2^(1/12)
        this.ratio = 0.94;
        this.frets = new Array();
        this.drawFretboard();
    }

    drawFret(entry) {
        entry.draw();
    }

    drawScale(scale, fromFret, fromString = 6, span = 8) {
        var pos = fromFret;
        var string = fromString - 1;
        var step = 0;

        do {
            if (step == 0) {
                this.frets[pos].mark(string, theme.fundamental);
            } else {
                this.frets[pos].mark(string);
            }
            pos += scale[step];
            step++;
            if (step >= scale.length) {
                step = 0;
            }
            if (pos > fromFret + 3) {
                pos -= (string == 2 ? 4 : 5);
                string--;
            }
        } while(string >= 0 && --span > 0);
    }

    drawFretboard() {
        // inizializza i Frets
        var from = this.width;
        for (let i = 0; i < this.numberOfFrets; i++) {
            var width = from * (1 - this.ratio);
            this.frets[i] = new Fret(this.width - from, width, this.canvas);
            if ([3, 5, 7, 9, 12, 15, 17, 19, 21].indexOf(i + 1) >= 0) {
                this.frets[i].dot = true;
            } else {
                this.frets[i].pallino = false;
            }
            from -= width;
        }

        this.frets.forEach(this.drawFret);        
    }
}

class Fret {
    constructor(start, width, canvas, dot) {
        this.start= start;
        this.width = width;
        this.canvas = canvas;
        this.dot = dot;
        this.ctx = canvas.getContext('2d');        
    }
    
    draw() {
        // the neck
        this.ctx.fillStyle = theme.neck; //"#807050";
        this.ctx.fillRect(this.start, 0, this.width, this.canvas.height);
        // the dot
        if (this.dot == true) {
            this.ctx.fillStyle = theme.dot;
            this.ctx.arc(this.start + this.width / 2, this.canvas.height / 2, 4, 0, 2 * Math.PI);
            this.ctx.fill();
        }
        // the nut
        this.ctx.fillStyle = theme.fret;
        this.ctx.fillRect(this.start + this.width - 3, 0, 3, this.canvas.height);
        // the strings
        this.ctx.fillStyle = theme.string;
        for (let string = 0; string < 6; string++) {
            this.ctx.fillRect(this.start, this.findString(string), this.width, 2);
        }
    }
    
    mark(string, color) {
        this.ctx.beginPath();
        color = (typeof color === 'undefined') ? theme.scale : color;
        this.ctx.fillStyle = color;
        this.ctx.arc(this.start + this.width / 2, this.findString(string) , 7, 0, 2 * Math.PI);
        this.ctx.fill();
    }
    
    findString(number) {
        return 5 + 15 * number;
    }
}

// theme based on burlywood http://www.colorhexa.com/deb887
const theme = {
    neck: '#221709',
    dot: '#808080',
    fret: '#e2c196',
    string: '#fcf8f3',
    fundamental: '#87deb8',
    scale: '#87adde'
};

const scale = {
    major: [2, 2, 1, 2, 2, 2, 1],
    jonian: [2, 2, 1, 2, 2, 2, 1],
    dorian: [2, 1, 2, 2, 2, 1, 2],
    phrygian: [1, 2, 2, 2, 1, 2, 2],
    lydian: [2, 2, 2, 1, 2, 2, 1],
    mixolydian: [2, 2, 1, 2, 2, 1, 2],
    eolian: [2, 1, 2, 2, 1, 2, 2],
    locrian: [1, 2, 2, 1, 2, 2, 2],
    hexatonic: [2, 2, 2, 2, 2, 2],
    minor: [2, 1, 2, 2, 1, 2, 2],
    jazz_minor: [2, 1, 2, 2, 2, 2, 1],
};


