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
    [0,2,4,8],
    [16,32,64,128],
    [256,512,1024,2048],
    [0,0,0,0]
];

var content = document.getElementById("content");

var html = "";

function onLoad(){
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

onLoad();