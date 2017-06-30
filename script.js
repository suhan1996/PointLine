/**
 * Created by Suhan on 24/06/2017.
 */
var col;
var np = 300;
function setup(){
    createCanvas(1400, 600);
    col = Math.random()*360;
    background(255, 255, 255);
    noiseSeed(Math.random()*100);
    noFill();
}
function draw(){
    let salt = (noise(50,150));
    beginShape();
    // var posx = frameCount*2;
    var posx = mouseX+salt;
    // var posy = height/2 + sin(frameCount/50)*50;
    var posy = mouseY + salt;
    var sx, sy;
    for(var i = 0; i < np; i++){
        var theta = map(i, 0, np, 0, TWO_PI);
        var xx = 100*cos(theta);
        var yy = 100*sin(theta);
        var v = createVector(xx, yy);
        xx = (xx + posx) / 150; yy = (yy + posy) / 150;
        v.mult(1+1.5 * noise(xx, yy));
        vertex(posx + v.x, posy + v.y);
        if(i == 0) {
            sx = posx + v.x;
            sy = posy + v.y;
        }
    }
    colorMode(HSB);
    var hue = ((posx/5)%360+col)%360;
    stroke(hue, 50, 100, 30);
    strokeWeight(0.1);
    vertex(sx, sy);
    endShape();
}