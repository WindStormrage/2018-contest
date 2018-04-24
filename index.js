var type = [
    {content:    0, color: ''},
    {content:    2, color: '#F0E4D7'},
    {content:    4, color: '#EFE1C1'},
    {content:    8, color: '#FFAE61'},
    {content:   16, color: '#FF8D4F'},
    {content:   32, color: '#FF6D3E'},
    {content:   64, color: '#FF4400'},
    {content:  128, color: '#F3D352'},
    {content:  256, color: '#F7B416'},
    {content:  512, color: '#E1BA68'},
    {content: 1024, color: '#F5CA1B'},
    {content: 2048, color: '#F6C600'}
];

var map = [
    [2,2,4,8],
    [16,32,64,128],
    [256,512,1024,2048],
    [0,0,0,0]
];

var content = document.getElementById("content");


// var touch = {
//     startY:'',
//     startX:'',
//     changY:'',
//     changX:''
// }
// content.addEventListener('touchstart', function(e) {
//                 touch.startY = e.targetTouches[0].pageY;
//                 touch.startX = e.targetTouches[0].pageX;
//                 console.log("touchstartX" + touch.startX + "touchstartY" + touch.startY);
//             });
// content.addEventListener('touchend', function(e) {
//                 touch.changY = e.changedTouches[0].pageY;
//                 touch.changX = e.changedTouches[0].pageX;
//                 console.log("touchendX" + touch.changX + "touchendY" + touch.changY);
//             })

//渲染方法
function show () {
    let html = "";
    //根据map数组来渲染html
    for(let tr of map){
        html += `<div class="tr">`;
        for(let td of tr){
            let color = type.filter(item => item.content == td)[0].color;
            html += `<div class="td" style="background-color:${color}"><span>${td != 0 ? td : ""}</span></div>`;
        }
        html += `</div>`;
    }
    content.innerHTML = html;
}

document.onkeydown = function (e) {
    console.log(e.keyCode);
    //如果按了左键
    if(e.keyCode === 37){
        for(let i=0; i<map.length; i++){
            for(let j=1; j<map[0].length;j++){
                //如果当前这个有数字
                if (map[i][j] !== 0) {
                    //如果当前这个要去的地方是空的话
                    if (map[i][j-1] === 0) {
                        map[i][j-1] = map[i][j];
                        map[i][j] = 0;
                    //如果下一个地方一样的话
                    }else if (map[i][j-1] === map[i][j] && map[i][j] !== 2048){
                        map[i][j-1] += map[i][j];
                        map[i][j] = 0;
                    }
                }
            }
        }
    }
    //如果按了上键
    else if(e.keyCode === 38){
        for(let i=1; i<map.length; i++){
            for(let j=0; j<map[0].length; j++){
                //如果当前这个有数字
                if (map[i][j] !== 0) {
                    //如果当前这个要去的地方是空的话
                    if (map[i-1][j] === 0) {
                        map[i-1][j] = map[i][j];
                        map[i][j] = 0;
                    //如果下一个地方一样的话
                    }else if (map[i-1][j] === map[i][j] && map[i][j] !== 2048){
                        map[i-1][j] += map[i][j];
                        map[i][j] = 0;
                    }
                };
            }
        }
    }
    //如果按了右键
    else if(e.keyCode === 39){
        for(let i=0; i<map.length; i++){
            for(let j=map[0].length-2; j>=0; j--){
                //如果当前这个有数字
                if (map[i][j] !== 0) {
                    //如果当前这个要去的地方是空的话//还要继续判断，一直到下一个不为空为止
                    for(let k=1;k<map[0].length-j;k++){
                        if (map[i][j+k] === 0) {
                            map[i][j+k] = map[i][j];
                            map[i][j] = 0;
                        //如果下一个地方一样的话
                        }else if (map[i][j+1] === map[i][j] && map[i][j] !== 2048){
                            map[i][j+1] += map[i][j];
                            map[i][j] = 0;
                        }
                    }



                    if (map[i][j+1] === 0) {
                        map[i][j+1] = map[i][j];
                        map[i][j] = 0;
                    //如果下一个地方一样的话
                    }else if (map[i][j+1] === map[i][j] && map[i][j] !== 2048){
                        map[i][j+1] += map[i][j];
                        map[i][j] = 0;
                    }
                };
            }
        }
    }
    //如果按了下键
    else if(e.keyCode === 40){
        for(let i=map.length-2; i>=0; i--){
            for(let j=0; j<map[0].length;){
                //如果当前这个有数字
                if (map[i][j] !== 0) {
                    //如果当前这个要去的地方是空的话
                    if (map[i+1][j] === 0) {
                        map[i+1][j] = map[i][j];
                        map[i][j] = 0;
                    //如果下一个地方一样的话
                    }else if (map[i+1][j] === map[i][j] && map[i][j] !== 2048){
                        map[i+1][j] += map[i][j];
                        map[i][j] = 0;
                    }
                    j++
                }else j++
            }
        }
    }
    show()
}

function move(){

}

function onLoad(){
    show();
    for(let i=0;i<10;i++){
        console.log("---"+i+"---")
        for(let j=0;j<10;j++){
            console.log(i+j)
        }
    }
}

onLoad();