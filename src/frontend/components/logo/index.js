import React, { PureComponent } from 'react';

export class Logo extends PureComponent {
    canvas = React.createRef();

    componentDidMount() {
        // https://jsfiddle.net/andrevenancio/3tz20dwg/

        this.size = 50;
        this.ratio = global.devicePixelRatio;

        this.canvas.current.width = this.size * 2;
        this.canvas.current.height = this.size;
        this.canvas.current.style.display = 'block';
        this.canvas.current.style.width = `${(this.size * 2) / this.ratio}px`;
        this.canvas.current.style.height = `${this.size / this.ratio}px`;

        this.ctx = this.canvas.current.getContext('2d');

        this.raf = requestAnimationFrame(this.update);
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.ctx);
    }

    update = () => {
        this.raf = requestAnimationFrame(this.update);
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        for (let i = 0; i < 2; i++) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = '#dedede';
            this.ctx.lineWidth = this.ratio;
            this.ctx.rect(this.size * i, 0, this.size, this.size);
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.strokeStyle = '#000000';
            this.ctx.save();
            this.ctx.translate(this.size * i + this.size / 2, this.size / 2);
            this.ctx.rotate(
                (0.5 + 0.5 * Math.cos(Date.now() / 600 + i)) * Math.PI * 3 +
                    Math.sin(Date.now() / 300)
            );
            this.ctx.beginPath();
            this.ctx.lineWidth = (this.size / 10) * this.ratio;
            this.ctx.arc(0, 0, this.size / 2.55, 0, Math.PI);
            this.ctx.stroke();
            this.ctx.restore();
        }
    };

    render() {
        return <canvas ref={this.canvas} />;
    }
}
