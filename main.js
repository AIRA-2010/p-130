left_wrist_x =0;
left_wrist_y =0;
scoreLeftWrist=0;
scoreRightWrist=0;
status ="";
right_wrist_x =0;
right_wrist_y =0;
function preload(){
    song_1 = loadSound("music.mp3");
    song_2 = loadSound("music2.mp3");
}
function setup(){
    canvas = createCanvas(300,300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log('model is loaded');
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
       left_wrist_x = results[0].pose.leftWrist.x;
       left_wrist_y = results[0].pose.leftWrist.y;
       right_wrist_x = results[0].pose.rightWrist.x;
       right_wrist_y = results[0].pose.rightWrist.y;
       console.log("leftWristX = "+left_wrist_x+" leftWristY = "+left_wrist_y+" rightWristX = "+right_wrist_x+" rightWristY = "+right_wrist_y);
       scoreLeftWrist = results[0].pose.keypoints[9].score;
       status = "set";
       scoreRightWrist = results[0].pose.keypoints[10].score;
       status = "";
    }
}
function draw(){
    image(video,0,0,300,300);
    fill("red");
    stroke("red");
    if(scoreLeftWrist > 0.2){
        circle(left_wrist_x, left_wrist_y, 20); 
        document.getElementById("song_name").innerHTML =="SONG NAME = PETER PAN";
    } 
    else if(scoreRightWrist > 0.2){
        circle(right_wrist_x, right_wrist_y, 20);
        document.getElementById("song_name").innerHTML =="SONG NAME = HARRY POTTER THEME";
    } 
}
function play(){
    if(status == "set"){
        song_1.play();
    }
    else if(status == ""){
        song_2.play();
    }
}