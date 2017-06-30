/**
 * Created by Suhan on 24/06/2017.
 */
// All the paths
var paths = [];
// Are we painting?
var painting = false;
// How long until the next circle
var next = 0;
// Where are we now and where were we?
var current;
var previous;
let p5canvas,system;
var col;
var np = 60;

function windowResized(){
    "use strict";
    resizeCanvas(windowWidth,windowHeight);
}


function setup() {
    p5canvas = createCanvas(windowWidth,windowHeight);
    current = createVector(0,0);
    previous = createVector(0,0);

    col = Math.random()*360;
    background(255);
    noiseSeed(Math.random()*100);
    noFill();
};

function draw() {
    background(255);
    fill(0,0,0);
    textSize(320);

    //ellipse(0,0,200,200)
    text("Po  i   n    t", 10, 90);
    text("l         N    e", windowWidth/3, windowHeight+109);

    ellipse(windowWidth/2,windowHeight-50,100,100)


    // If it's time for a new point
    if (millis() > next && painting) {

        // Grab mouse position
        current.x = mouseX;
        current.y = mouseY;

        // New particle's force is based on mouse movement
        var force = p5.Vector.sub(current, previous);
        force.mult(0.5);

        // Add new particle
        paths[paths.length - 1].add(current, force);

        // Schedule next circle
        next = millis() + random(10);

        // Store mouse values
        previous.x = current.x;
        previous.y = current.y;
    }

    // Draw all paths
    for( var i = 0; i < paths.length; i++) {
        paths[i].update();
        paths[i].display();
    }
}

// Start it up
function mousePressed() {
    next = 0;
    painting = true;
    previous.x = mouseX;
    previous.y = mouseY;
    paths.push(new Path());
}

// Stop
function mouseReleased() {

    painting = false;
}

// A Path is a list of particles
function Path() {
    this.particles = [];
    this.hue = random(100);
}

Path.prototype.add = function(position, force) {
    // Add a new particle with a position, force, and hue
    this.particles.push(new Particle(position, force, this.hue));
}

// Display plath
Path.prototype.update = function() {
    for (var i = 0; i < this.particles.length; i++) {
        this.particles[i].update();
    }
}

// Display plath
Path.prototype.display = function() {

    // Loop through backwards
    for (var i = this.particles.length - 1; i >= 0; i--) {
        // If we shold remove it
        if (this.particles[i].lifespan <= 0) {
            this.particles.splice(i, 1);
            // Otherwise, display it
        } else {
            this.particles[i].display(this.particles[i+1]);
        }
    }

}

// Particles along the path
function Particle(position, force, hue) {
    this.position = createVector(position.x, position.y);
    this.velocity = createVector(force.x, force.y);
    this.drag = 0.95;
    this.lifespan = 255;
}

Particle.prototype.update = function() {
    // Move it
    this.position.add(this.velocity);
    // Slow it down
    this.velocity.mult(this.drag);
    // Fade it out
    this.lifespan-=0.3;
}

// Draw particle and connect it with a line
// Draw a line to another
Particle.prototype.display = function(other) {

    // If we need to draw a line
    if (other) {

        let size = Math.abs(other.position.x-this.position.x)+Math.abs(other.position.y-this.position.y);
        stroke(0,0,0, this.lifespan);
        fill(0,0,0, this.lifespan);
        strokeWeight(1);

        triangle(this.position.x+size+this.lifespan, this.position.y+size+this.lifespan, this.position.x+20+size+this.lifespan, this.position.y+this.lifespan+10+size, this.position.x+this.lifespan+20+size, this.position.y-3+size+this.lifespan);
        ellipse(this.position.x+20*size-this.lifespan,this.position.y+20*size,10000/(200+this.lifespan),10000/(200+this.lifespan))
        //triangle(this.lifespan+noise(-200,1800), this.lifespan+noise(-200,1800), this.position.x+20, this.position.y+10, this.position.x+20, this.position.y-3);


        rotate((PI/5));


        //ellipse(this.position.x,this.position.y, 100/(20+size), 100/(20+size));
        //line(other.position.x, other.position.y, this.position.x+20*noise(0,this.position.x-other.position.x), this.position.y+20*noise(0,this.position.y-other.position.y));
        // line(this.position.x, this.position.y, other.position.x, other.position.y);
        strokeWeight(1);


        line(this.position.x, this.position.y, other.position.x, other.position.y);



      //  beginShape();
      //  var posx =this.position.x,posy=this.position.y;
        // var posx = frameCount*2;
        // var posx = mouseX+(Math.random()*5);
        // var posy = height/2 + sin(frameCount/50)*50;
        // var posy = mouseY + sin(frameCount/50)*5;
        // strokeWeight(0);
        //
        // var sx, sy;
        // for(var i = 0; i < 1; i++){
        //     var theta = map(i, 0, np, 0, 30);
        //     var xx = 10*cos(theta);
        //     var yy = 10*sin(theta);
        //     var v = createVector(xx, yy);
        //     xx = (xx + posx) / 15; yy = (yy + posy) / 15;
        //    // console.log(size)
        //     v.mult(1 * noise(xx, yy));
        //     ellipse(posx+noise(0,Math.abs(other.position.x-this.position.x)) , posy+noise(0,Math.abs(other.position.y-this.position.y)), noise(0,5/(size+1)),noise(0,5/(1+size)));
        //     if(i == 0) {
        //         sx = posx + v.x;
        //         sy = posy + v.y;
        //     }
        // }
        //colorMode(HSB);
        //var hue = ((posx/5)%360+col)%360;
      //  stroke(0, this.lifespan);
      //  fill(0, this.lifespan);
        //vertex(sx, sy);
     //   endShape();


    }







}