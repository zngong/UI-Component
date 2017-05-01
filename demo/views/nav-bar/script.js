
//监听dom树加载完成
window.addEventListener('DOMContentLoaded',function () {
    var lis = document.querySelectorAll('.nav li');
    var sections = document.querySelectorAll('.sections section');
    for(var i = 0;i<lis.length;i++) {
        var li = lis[i];
        li.onclick = function () {
            // console.log(this)
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




})
