export class Bar {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = `hsl( ${color * 2},100%,50%)`;
    }

    update = (audioInput) => {
        let sound = audioInput * 1000;
        if(Math.abs(sound) <= Math.abs(this.height))
        {
            this.height *= 0.95;
        } else {
            this.height = sound;
        }
    }

    draw = (context) => {
        context.save();
        context.lineWidth = 3;
        context.strokeStyle = this.color;
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x, this.y + this.height);
        context.stroke();
        context.restore();
    }
}

