!(function (window) {

    //设备宽度/设计稿宽度 = 某个元素某一距离实际值/该元素在设计稿的值
    //a/750 = ?/100 => ? = a*100/750

    //原理=>监听屏幕尺寸变化 动态改变 html 根节点 的 fontSize 大小；

    //变化范围在 320<= 设备宽度 <= 420, 大于或小于者保持临界点值；

    //1.iPhone5分辨率320x568，像素640x1136，@2x
    //2.iPhone6分辨率375x667，像素750x1334，@2x
    //iPhone6 Plus分辨率414x736，像素1242x2208，@3x

    const doc = window.document,
        docHtml = doc.documentElement,
        UIwidth = 750,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

    function setHtmlFontSize() {
        let docHtmlWidth = docHtml.getBoundingClientRect().width; //设备宽度
        let fontSize = docHtmlWidth<320
            ?320*100/UIwidth
            :docHtmlWidth>420
                ?420*100/UIwidth
                :docHtmlWidth*100/UIwidth;
        docHtml.style.fontSize = fontSize * 2 + 'px';  //相当于 px/2/100了  如果不*2的话就是 px/1/100

    }

    //init
    setHtmlFontSize();
    //add data-dpr
    docHtml.setAttribute('data-dpr', window.navigator.appVersion.match(/iphone/gi) ? window.devicePixelRatio : 1);
console.log(docHtml.getAttribute('data-dpr'))
    if (!docHtml.addEventListener) return;
    window.addEventListener(resizeEvt, setHtmlFontSize, false);
    docHtml.addEventListener('DOMContentLoaded', setHtmlFontSize, false);

})(window);