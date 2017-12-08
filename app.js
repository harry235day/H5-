window.onload = function() {
    imgLocation("container", "box")




}


function imgLocation(parent, content) {
    //获取 当前的 父容器
    var cparents = document.getElementById(parent);
    var ccontent = getChildElement(cparents, content);

    //获取每个图片的宽度 
    var imageWith = ccontent[0].offsetWidth;
    //一行放多少
    var num = Math.floor(document.documentElement.clientWidth / imageWith);

    //固定 父容器的宽度
    cparents.style.cssText = "width:" + imageWith * num + "px;margin:0 auto";

    //存放高度的数组

    var boxHeightArry = [];

    for (var i = 0; i < ccontent.length; i++) {
        //第一行的最小数组
        if (i < num) {
            boxHeightArry[i] = ccontent[i].offsetHeight;
        } else {
            //找到数组中的最小高度
            var minHeight = Math.min.apply(null, boxHeightArry);
            var minIndex = getMinImageHeightLocation(boxHeightArry, minHeight);
            console.log(minHeight + "   " + minIndex);

            //设置图片位置
            ccontent[i].style.position = "absolute";
            //设置距离上面的高度
            ccontent[i].style.top = minHeight + "px";
            //距离左边的left
            ccontent[i].style.left = ccontent[minIndex].offsetLeft + "px";

            //最小的高度加上i 的高度

            boxHeightArry[minIndex] = boxHeightArry[minIndex] + ccontent[i].offsetHeight;

        }

    }

}

function getMinImageHeightLocation(boxHeightArry, minHeight) {
    for (var i in boxHeightArry) {
        if (boxHeightArry[i] == minHeight) {
            return i;
        }
    }
}

function getChildElement(parents, content) {
    var contentArry = [];
    var allcontent = parents.getElementsByTagName("*");
    for (var i = 0; i < allcontent.length; i++) {
        if (allcontent[i].className == content) {
            contentArry.push(allcontent[i]);
        }
    }
    return contentArry;
}