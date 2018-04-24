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

var map;
//用来判断是否在本次已经叠加过了
var add;

var count;

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

function reAdd () {
    add = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];
}

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
    //展示分数
    document.getElementById("count").innerHTML = `总分：${count}`;
}

//点击触发
document.onkeydown = function (e) {
    //重置add数组
    reAdd()
    //确认这次按键是否动了数组
    let domove = 0;
    //如果按了左键
    if(e.keyCode === 37){
        for(let i=0; i<map.length; i++){
            for(let j=1; j<map[0].length;j++){
                //如果当前这个有数字
                if (map[i][j] !== 0) {
                    //如果当前这个要去的地方是空的话//还要继续判断，一直到下一个不为空为止
                    for(let k=1;k<=j;k++){
                        //如果接下来那个有数字的话
                        if (map[i][j-k] !== 0) {
                            //如果下一个地方一样的话and不是2048and之前没有合并过//就合并
                            if (map[i][j-k] === map[i][j] && map[i][j] !== 2048 && add[i][j-k]===0){
                                map[i][j-k] += map[i][j];
                                map[i][j] = 0;
                                //合并后就标记一下
                                add[i][j-k] = 1;
                                //计分
                                count += map[i][j-k];
                                domove = 1;
                            }
                            //否则放在他前面一个摆着
                            else{
                                //如果阻挡他的前一个就是自己，就不要变
                                if(j-k+1 !== j){
                                    let t = map[i][j];
                                    map[i][j] = 0;
                                    map[i][j-k+1] = t;
                                    domove = 1;
                                }
                            }
                            break;
                        }
                    }
                    //如果循环完了还有一种情况没有考虑，就是接下来的没有数字
                    if(map[i][0] === 0){
                        map[i][0] = map[i][j];
                        map[i][j] = 0;
                        domove = 1;
                        //执行移动动画
                        move(i,j,i,0);
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
                    //如果当前这个要去的地方是空的话//还要继续判断，一直到下一个不为空为止
                    for(let k=1;k<=i;k++){
                        //如果接下来那个有数字的话
                        if (map[i-k][j] !== 0) {
                            //如果下一个地方一样的话and不是2048and之前没有合并过//就合并
                            if (map[i-k][j] === map[i][j] && map[i][j] !== 2048 && add[i-k][j]===0){
                                map[i-k][j] += map[i][j];
                                map[i][j] = 0;
                                //合并后就标记一下
                                add[i-k][j] = 1;
                                count += map[i-k][j];
                                domove = 1;
                            }
                            //否则放在他前面一个摆着
                            else{
                                //如果阻挡他的前一个就是自己，就不要变
                                if(i-k+1 !== i){
                                    let t = map[i][j];
                                    map[i][j] = 0;
                                    map[i-k+1][j] = t;
                                    domove = 1;
                                }
                            }
                            break;
                        }
                    }
                    //如果循环完了还有一种情况没有考虑，就是接下来的没有数字
                    if(map[0][j] === 0){
                        map[0][j] = map[i][j];
                        map[i][j] = 0;
                        domove = 1;
                    }
                }
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
                        //如果接下来那个有数字的话
                        if (map[i][j+k] !== 0) {
                            //如果下一个地方一样的话and不是2048and之前没有合并过//就合并
                            if (map[i][j+k] === map[i][j] && map[i][j] !== 2048 && add[i][j+k]===0){
                                map[i][j+k] += map[i][j];
                                map[i][j] = 0;
                                //合并后就标记一下
                                add[i][j+k] = 1;
                                count += map[i][j+k];
                                domove = 1;
                            }
                            //否则放在他前面一个摆着
                            else{
                                //如果阻挡他的前一个就是自己，就不要变
                                if(j+k-1 !== j){
                                    let t = map[i][j];
                                    map[i][j] = 0;
                                    map[i][j+k-1] = t;
                                    domove = 1;
                                }
                            }
                            break;
                        }
                    }
                    //如果循环完了还有一种情况没有考虑，就是接下来的没有数字
                    if(map[i][map[i].length-1] === 0){
                        map[i][map[i].length-1] = map[i][j];
                        map[i][j] = 0;
                        domove = 1;
                    }
                }
            }
        }
    }
    //如果按了下键
    else if(e.keyCode === 40){
        for(let i=map.length-2; i>=0; i--){
            for(let j=0; j<map[0].length;j++){
                //如果当前这个有数字
                if (map[i][j] !== 0) {
                    //如果当前这个要去的地方是空的话//还要继续判断，一直到下一个不为空为止
                    for(let k=1;k<map[0].length-i;k++){
                        //如果接下来那个有数字的话
                        if (map[i+k][j] !== 0) {
                            //如果下一个地方一样的话and不是2048and之前没有合并过//就合并
                            if (map[i+k][j] === map[i][j] && map[i][j] !== 2048 && add[i+k][j]===0){
                                map[i+k][j] += map[i][j];
                                map[i][j] = 0;
                                //合并后就标记一下
                                add[i+k][j] = 1;
                                count += map[i+k][j];
                                domove = 1;
                            }
                            //否则放在他前面一个摆着
                            else{
                                //如果阻挡他的前一个就是自己，就不要变
                                if(i+k-1 !== i){
                                    let t = map[i][j];
                                    map[i][j] = 0;
                                    map[i+k-1][j] = t;
                                    domove = 1;
                                }
                            }
                            break;
                        }
                    }
                    //如果循环完了还有一种情况没有考虑，就是接下来的没有数字
                    if(map[map.length-1][j] === 0){
                        map[map.length-1][j] = map[i][j];
                        map[i][j] = 0;
                        domove = 1;
                    }
                }
            }
        }
    }
    //只有动了才生成新的
    if(domove === 1) doRandom();
    show()
    over()
}

//移动的动画
function move(i0,j0,i1,j1) {
    //先获得每个方块的长度


    let x1 = document.getElementsByClassName("td")[i0*map[0].length+j0].offsetLeft;
    let x2 = document.getElementsByClassName("td")[i1*map[0].length+j1].offsetLeft;
    let y1 = document.getElementsByClassName("td")[i0*map[0].length+j0].offsetTop;
    let y2 = document.getElementsByClassName("td")[i1*map[0].length+j1].offsetTop;
    console.log(x1)
    console.log(x2)
    console.log(y1)
    console.log(y2)


}

//判断游戏结束
function over () {
    //判断有没有满
    for(let tr of map){
        for(let td of tr){
            if(td === 0){
                console.log(1)

                return 0;
            }
        }
    }

    for(let i=0; i<map.length-1; i++){
        for(let j=0; j<map[0].length-1; j++){
            //下面和右边出现相同直接退出函数，继续游戏
            if(map[i][j] === map[i+1][j] || map[i][j] === map[i][j+1]){
                console.log(2)
                return 0;
            }
        }
    }
    //最右边一列
    for(let i=0; i<map.length-1;i++){
        if(map[i][map[0].length-1] === map[i+1][map[0].length-1]){
                console.log(3)
            return 0;
        }
    }
    //最下面一行
    for(let i=0; i<map[0].length-1;i++){
        if(map[map.length-1][i] === map[map.length-1][i+1]){
                console.log(4)
            return 0;
        }
    }
    alert("game over , click sure to start again");
    onload();
}

//随机产生新的
function doRandom () {
    //加不进了就不加了
    let t = 0;
    find:
    for(let tr of map){
        for(let td of tr){
            if(td === 0){
                t = 1;
                break find;
            }
        }
    }
    if (t === 0) {return 0;}
    //可以加就随机产生数字
    while(1){
        let i = parseInt(Math.random()*4);
        let j = parseInt(Math.random()*4);
        //console.log(i)

        if(map[i][j]===0){
            map[i][j] = 2;
            break;
        }
    }

}

//初始化游戏
function onload(){
    count = 0;
    map = [
        [1024,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];
    doRandom();
    doRandom();
    show();
}

onload();