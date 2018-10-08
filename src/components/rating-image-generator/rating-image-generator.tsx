import { Component, Element, Prop } from '@stencil/core';

@Component({
  tag: 'rating-image-generator'
})
export class RatingImageGenerator {
  @Element() el: HTMLElement;

  @Prop() rating: number = 5;
  @Prop() scale: number = 5;
  @Prop() starSize: number = 40;

  componentDidLoad() {
    const canvas = this.el.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    
    for(let i = 0; i < this.scale; i++) {
      this.drawStar(ctx,  ( 2 * i + 1) * (this.starSize / 2 / 6 * 5), this.starSize / 2, Math.min(1, this.rating - i));
    }

    ctx.font = "60px Courier"
  }

  drawStar(ctx, cx, cy, fillPercentage = 0) {
    const outerRadius = this.starSize / 2 / 6 * 5;
    const innerRadius = this.starSize / 6;
    const maxFillX = cx - (this.starSize / 2) + (this.starSize * fillPercentage);
    var rot = Math.PI / 2 * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / 5;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius)
    for (let i = 0; i < 5; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y)
        rot += step

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y)
        rot += step
    }
    ctx.lineTo(cx, cy - outerRadius)
    ctx.closePath();
    ctx.lineWidth=2;
    ctx.strokeStyle='#000000';
    ctx.stroke();

    ctx.fillStyle='#cccccc';
    ctx.fill();


    if(fillPercentage > 0) {
      ctx.beginPath();
        
      ctx.moveTo(cx, cy - outerRadius)
      for (let i = 0; i < 5; i++) {
          x =  cx + Math.cos(rot) * outerRadius;
          y = cy + Math.sin(rot) * outerRadius;
          ctx.lineTo(Math.min(maxFillX, x), y);
          rot += step

          x = cx + Math.cos(rot) * innerRadius;
          y = cy + Math.sin(rot) * innerRadius;
          ctx.lineTo(Math.min(maxFillX, x), y);
          rot += step
      }
      ctx.lineTo(Math.min(maxFillX, cx), cy - outerRadius)
      ctx.closePath();
      
      

      const grd=ctx.createLinearGradient(0,0,0,this.starSize * 0.75);
      grd.addColorStop(0,"#f4ac41");
      grd.addColorStop(1,"#f4ee41");
      ctx.fillStyle=grd;
      ctx.fill();

    }
}
  render() {
    return <div><canvas width={this.starSize * this.scale} height={this.starSize}></canvas></div>;
  }
}
