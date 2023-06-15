export default class Enemy{

    constructor(x,y,imageNumber){
        this.x=x;
        this.y=y;
        this.width=50;
        this.height=33;
        this.image=new Image();
        this.image.src=`./images/burger${imageNumber}.png`
    }
    draw(ctx){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }
    move(xDirect, yDirect){
        this.x += xDirect;
        this.y += yDirect;
        }
        collideWith(sprite) {
            if(this.x + this.width > sprite.x &&
                this.x < sprite.x + sprite.width &&
                this.y + this.height >sprite.y &&
                this.y < sprite.y + sprite.height){
                    return true;
                }
                else{
                    return false;
                }
        }
}