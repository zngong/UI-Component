
//监听dom树加载完成
window.addEventListener('DOMContentLoaded',function () {
    var lis = document.querySelectorAll('.nav li');
    var sections = document.querySelectorAll('.sections section');
    for(var i = 0;i<lis.length;i++) {
        var li = lis[i];
        li.onclick = function () {
            var liId = this.getAttribute('id');
            for(var j = 0;j<lis.length;j++){
                lis[j].classList.remove('selected');

            }
            for(var k = 0;k<sections.length;k++){
               var sectionId = sections[k].getAttribute('data-nav');
                if(sectionId == liId ){
                    sections[k].className = 'section'
                }else{
                    sections[k].className = 'section sectionSelected';
                }
            }
            this.className = 'selected';
        }
    }
});
window.onresize = function(){
    var height =  document.documentElement.clientHeight;
    console.log(height)
}
