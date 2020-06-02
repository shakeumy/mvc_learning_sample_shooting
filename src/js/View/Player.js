import UnitBase from "js/View/UnitBase";
import HitTest from "js/Util/HitTest";

/**
 * 自機クラス
 */

export default class Player extends UnitBase {

    // upKey;
    // let upKey = false;
    

    constructor () {
        super ();
        this.x = 100;
        this.y = 200;
        this.setHP(100);
        this.setWidth(40);
        this.setHeight(40);

        document.addEventListener('keydown', (event) => {
            //スクロールを無効化
            if(event.preventDefault){
                event.preventDefault();
            }
            

            let keyCode = event.keyCode;
            switch(keyCode){
                case 38:
                    Player.upKey = true;
                    break;
                case 37:
                    Player.leftKey = true;
                    break;
                case 40:
                    Player.downKey = true;
                    break;
                case 39:
                    Player.rightKey = true;
                    break;
            }
            
        });

        document.addEventListener('keyup', (event) => {
            let keyCode = event.keyCode;

            switch(keyCode){
                case 38:
                    Player.upKey = false;
                    break;
                case 37:
                    Player.leftKey = false;
                    break;
                case 40:
                    Player.downKey = false;
                    break;
                case 39:
                    Player.rightKey = false;
                    break;
            }
        });

    }

    
    /**
     * EnterFrame.jsの中で
     * requestAnimationFrameから自動的にcallされ続けます。
     */
    update () {
        // 矢印キー　←↑→↓で動くようにしてください。googleで「js keycode」など検索してみて下さい。
        if(Player.upKey){
            this.y-=10;
        }
        
        if(Player.leftKey){
            this.x-=10;
        }
        
        if(Player.downKey){
            this.y+=10;
        }
        
        if(Player.rightKey){
            this.x+=10;
        }

        // スペースキーを押すとBulletが発射されるようにして下さい。
        // Enemyクラスを参考にしてください。

        // 敵の弾に当たったらダメージを受けるようにして下さい。
        const bullet = HitTest.getHitObjectByClassName(this, "Bullet");
        if(bullet) {
            // ダメージを与えて下さい。↓コメントアウトを外していただくですがw
            // this.setDamage (bullet.damage);
            // ↑さて、setDamageはどこで定義されているでしょうか？

            // HPが0になったら死亡状態にし、MainManageに通知して下さい。
            // そして、MainManager側に、その通知を受け取れるようにして下さい。
            // console.log (this.HP);
        }
    }

    /**
     * 機体描画
     * 三角形
     * @param {ctx} context 
     */
    draw (context) {
		context.beginPath();
		context.moveTo(this.x - 20, this.y + 10); 
		context.lineTo(this.x + 20, this.y);
		context.lineTo(this.x - 20, this.y - 10);
		context.closePath();

		context.strokeStyle = "rgb(0,0,0)"; //枠線の色
		context.stroke();

		context.fillStyle="rgba(0,0,255, 1)";//塗りつぶしの色
		context.fill();
    }
}