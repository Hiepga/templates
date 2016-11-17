jQuery.fn.extend({
    nrTab:function(option){
        /*
            Html Example:
                <aside class="box_news ">
                    <ul>
                        <li class="news_list active"><a href="#tab1"></a></li>
                        <li class="news_list"><a href="#tab2"></a></li>
                        <a class="more-new" href="abc"></a>
                    </ul>
                    <div class="content_news active" id="tab1"></div>
                    <div class="content_news" id="tab2"></div>
                </aside>

            Script Example:
                $('.box_news').nrTab({
                    tab:'.news_list',
                    view:'.content_news',
                    //action:'hover',
                    more:'.more-new',
                    moreCallBack:function(href,activeCode){
                        console.log(1,href, activeCode);
                    }
                });
        */
        var these=jQuery(this);
        var activeClass='active';
        var tab=these.find(option.tab);
        var view=these.find(option.view);
        var tabActive='';
        var navAtc=function(objTab,viewClass){            
            objTab.each(function(){
                if($(this).hasClass(activeClass)){
                    var hrefAttr=option.href || 'href';
                    tabActive=$(this).children('a').attr(hrefAttr);
                }
            });
            if(tabActive){
                these.find(viewClass).removeClass(activeClass);
                these.find(viewClass+tabActive).addClass(activeClass);
            }            
        }
        
        //action
        option.action=option.action=='hover'?'mouseover':option.action;
        var action=option.action||'click';
        tab.on(action,function(e){
            tab.removeClass(activeClass);
            $(this).addClass(activeClass);
            navAtc($(this),option.view);
            if(!option.stopInActive || option.stopInActive==false){
                e.stopPropagation();
                e.preventDefault();
            }
        });
        //view more
        if(option.more){
            var more=these.find(option.more);
            more.on('click',function(e){
                e.stopPropagation();
                e.preventDefault();
                var inActive=tabActive.replace(/[^\w]+/i,'');
                if(option.moreCallBack && typeof(option.moreCallBack)=='function'){
                    option.moreCallBack($(this).attr('href'),inActive);
                } else {
                    window.location.href=$(this).attr('href')+inActive;
                }                
            });
        }
        //call
        navAtc(tab,option.view);
    },
    nrSingleTab:function(opt){
        /*
            Html Example:
                <ul class="content_news">
                    <li class="item active">
                        <a class="nav"></a>
                        <div class="view"></div>
                    </li>
                    <li class="item">
                        <a class="nav"></a>
                        <div class="view"></div>
                    </li>
                </ul>

            Script Example:
                $('.content_news').nrSingleTab({
                    tab:'.nav',
                    action:'hover',
                    inBox:'.item',
                    multiple: true/false
                });
        */
        var these=jQuery(this);
        var activeClass='active';
        var tab=these.find(opt.tab);
        var tabActive='';
        var navAtc=function(objTab){ 
            if(!opt.multiple || opt.multiple==false){
                objTab.closest(these).find(opt.inBox).removeClass(activeClass); 
            }                     
            objTab.parents(opt.inBox).addClass(activeClass); 
        }
        //action
        opt.action=opt.action=='hover'?'mouseover':opt.action;
        var action=opt.action||'mouseover';
        tab.on(action,function(){
            navAtc($(this));
        });
    }
})