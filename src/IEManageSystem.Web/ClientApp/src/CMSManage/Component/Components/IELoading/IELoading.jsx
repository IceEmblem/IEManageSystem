// 源码来源 https://www.html5tricks.com/html5-canvas-color-loading.html
import React from 'react'
import { BaseStaticComponent } from '../BaseStaticComponent'

import "./IELoading.css"

export default class IELoading extends BaseStaticComponent {
    componentDidMount(){
        this.load();
    }

    componentDidUpdate() {
        this.load();
    }

    load(){
        let sizeSetting = this.props.pageComponentSettings.find(item => item.name == "SizeSetting");

        var ieLoading = {};

        ieLoading.Particle = function (opt) {
            this.radius = 7;
            this.x = opt.x;
            this.y = opt.y;
            this.angle = opt.angle;
            this.speed = opt.speed;
            this.accel = opt.accel;
            this.decay = 0.01;
            this.life = 1;
        };

        ieLoading.Particle.prototype.step = function (i) {
            this.speed += this.accel;
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
            this.angle += ieLoading.PI / 64;
            this.accel *= 1.01;
            this.life -= this.decay;

            if (this.life <= 0) {
                ieLoading.particles.splice(i, 1);
            }
        };

        ieLoading.Particle.prototype.draw = function (i) {
            ieLoading.ctx.fillStyle = ieLoading.ctx.strokeStyle = 'hsla(' + (ieLoading.tick + (this.life * 120)) + ', 100%, 60%, ' + this.life + ')';
            ieLoading.ctx.beginPath();
            if (ieLoading.particles[i - 1]) {
                ieLoading.ctx.moveTo(this.x, this.y);
                ieLoading.ctx.lineTo(ieLoading.particles[i - 1].x, ieLoading.particles[i - 1].y);
            }
            ieLoading.ctx.stroke();

            ieLoading.ctx.beginPath();
            ieLoading.ctx.arc(this.x, this.y, Math.max(0.001, this.life * this.radius), 0, ieLoading.TWO_PI);
            ieLoading.ctx.fill();

            var size = Math.random() * 1.25;
            ieLoading.ctx.fillRect(~~(this.x + ((Math.random() - 0.5) * 35) * this.life), ~~(this.y + ((Math.random() - 0.5) * 35) * this.life), size, size);
        }

        ieLoading.step = function () {
            ieLoading.particles.push(new ieLoading.Particle({
                x: ieLoading.width / 2 + Math.cos(ieLoading.tick / 20) * ieLoading.min / 2,
                y: ieLoading.height / 2 + Math.sin(ieLoading.tick / 20) * ieLoading.min / 2,
                angle: ieLoading.globalRotation + ieLoading.globalAngle,
                speed: 0,
                accel: 0.01
            }));

            ieLoading.particles.forEach(function (elem, index) {
                elem.step(index);
            });

            ieLoading.globalRotation += ieLoading.PI / 6;
            ieLoading.globalAngle += ieLoading.PI / 6;
        };

        ieLoading.draw = function () {
            ieLoading.ctx.clearRect(0, 0, ieLoading.width, ieLoading.height);

            ieLoading.particles.forEach(function (elem, index) {
                elem.draw(index);
            });
        };

        ieLoading.init = function () {
            ieLoading.canvas = document.getElementById("ie-loading-canvas");
            ieLoading.ctx = ieLoading.canvas.getContext('2d');
            ieLoading.width = (sizeSetting || {}).field1 || 300;
            ieLoading.height = (sizeSetting || {}).field2 || 300;
            ieLoading.canvas.width = ieLoading.width * window.devicePixelRatio;
            ieLoading.canvas.height = ieLoading.height * window.devicePixelRatio;
            ieLoading.canvas.style.width = ieLoading.width + 'px';
            ieLoading.canvas.style.height = ieLoading.height + 'px';
            ieLoading.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            ieLoading.min = ieLoading.width * 0.5;
            ieLoading.particles = [];
            ieLoading.globalAngle = 0;
            ieLoading.globalRotation = 0;
            ieLoading.tick = 0;
            ieLoading.PI = Math.PI;
            ieLoading.TWO_PI = ieLoading.PI * 2;
            ieLoading.ctx.globalCompositeOperation = 'lighter';
            ieLoading.loop();
        };

        ieLoading.loop = function () {
            requestAnimationFrame(ieLoading.loop);
            ieLoading.step();
            ieLoading.draw();
            ieLoading.tick++;
        };

        ieLoading.init();
    }

    render() {
        return (<div class="ie-loading-canvas"><canvas id="ie-loading-canvas"></canvas></div>);
    }
}