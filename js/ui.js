let ui = {
    init:function(){
        this.퀵메뉴.init();
        // this.무한스크롤.init();
        this.가로스크롤.init();
        this.셀렉트박스.init();
        this.아코디언.init();
        this.탭메뉴.init();
    },
    transitionend:"transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", 
  
    알럿 : function(msg, params) {
        let opt = $.extend({
            msg :  !msg ? "기본메시지" : msg ,
            tit : "제목",
            cls : "",
            ycb : "",
            ncb : "",
            ybt : "확인",
            nbt : "취소"
        }, params);

        let el = 
        `<div class="ui-alert"> 
            <div class="pbd">
                <div class=""> ${opt.tit} </div>
                <div class="">${ opt.msg}</div>
                <div class="btm">
                    <button class="confirm"> ${ opt.ybt } </button>
                    <button class="close"> ${ opt.nbt } </button>
                </div>
            </div>
        </div>`;

        $("body").append(el).addClass("is-alert");

        $(".ui-alert").find(".confirm").on("click",function(){
            window.setTimeout(opt.ycb);
        });
        $(".ui-alert").find(".close").on("click",function(){
            window.setTimeout(opt.ncb);
        });
        $(".ui-alert").find(".close, .confirm").on("click", alertClose );

        function alertClose(){
            $(".ui-alert").remove();
            $("body").removeClass("is-alert");
        }
    },
    토스트팝업 : function(msg, params){ // 토스트창 
        let opt = $.extend({ 
            msg : !msg ? "기본메시지" : msg ,
            cls: "",
            sec: 2000,
            bot: "",
        }, params);
        if ( $(".pop-toast:visible").length ) return; 
        let lyToast =
            `<article class="pop-toast ${ opt.cls } ">
            	<div class="pbd">
            		<div class="pct"> ${ opt.msg }</div>
            	</div>
            </article>`;

        $("body").append(lyToast).addClass("is-toast");

        window.setTimeout(function() {
            $(".pop-toast:visible").addClass("on").css({"padding-bottom" : opt.bot});
        });
        window.setTimeout(function() {
            $(".pop-toast:visible").removeClass("on").on(ui.transitionend,function(){
                $(".pop-toast").remove();
                $("body").removeClass("is-toast");
            });
        }, opt.sec);
    },
    무한스크롤 : {
        init: function(){
            this.scroll();
        },
        scroll: function(msg, params){
            let opt = $.extend({ 
                msg : "어머머머머머머머머멈",
                cls : "box",
            }, params);

            let el =
            `<article class=" ${ opt.cls } ">
            	<div class="pbd">
            		<div class="pct"> ${ opt.msg }</div>
            	</div>
            </article>`;

            $(window).scroll(function(){
                let addHeight = $(window).scrollTop() /* 스크롤 탑 위치 구하기 */ + $(window).height(); // 윈도우 높이값
                let docHeight = $(document).height();  // 문서의 높이값
                if( addHeight == docHeight ){
                    $("body").append(el).addClass("is-toast");
                    // console.log($(this));
                }
            });
        
        },
        
    },
    아코디언 : {
        init : function(){
            this.evt();
        },
        evt : function(){
            let $wrap =  $('.accordion');
            let $item =  $wrap.find('.item');
            
            $(document).on('click', '.accordion li .tit', function(e){
                
                let type =  $(this).closest(".accordion").attr("data-accordion");
                let _this = $(this);

                if(type == 'accordion'){
                    if( $item.is(':hidden') ){
                        _this.next('.item').slideDown(100);
                        _this.parent().siblings().children('.item').slideUp(100);
                    } 
                }   
            });
        }
    },
    퀵메뉴 : {
        init:function(){
            this.quick();
            this.evt();
        },
        quick : function(params){
            $(window).on('scroll load', function(){
                let $quick = $('.quick');
                let scrollTop = $(document).scrollTop();
                let elTop = 100; 
                
                if(scrollTop >= elTop ){
                    $quick.addClass('active');
                } else {
                    $quick.removeClass('active');
                }
            });
        },
        evt : function(){
            $(document).on('click', ".quick", function(){
                //let $quick = $('.quick');
                $("body,html").animate({ scrollTop: 0 });
            });
        }
    },		
    로딩 : {
        show : function(){
            let opt = $.extend({
                cls : "",
                msg : ""
            });
            
            let el =
            `<article class="ui-loading ${ opt.cls }">
            	<em>
            		<div class="pct"> ${ opt.msg } </div>
            	</em>
            </article>`;

            $("body").append(el).addClass("is-loading");
            console.log('loading');
        },
        hide : function(){
            
            $(".ui-loading").remove();
            $("body").removeClass("is-loading");
            console.log('loading hide');
        }
    },
    가로스크롤 : {
        init:function(){
            this.scroll();
        },
        scroll : function(){
            let xPosition = $('.xscroll');
            $(window).on('scroll load', function(){
                let allHeight = $(window).scrollTop() / ( $(document).height() - $(window).height() ) * 100; 
                xPosition.children().width(allHeight + '%' );
            });
        }
    },
    셀렉트박스 : {
        init : function(){
            this.evt();
        },
        evt : function(){
            let wh = $(window).height() / 2;
            $(document).on("click", ".ui-select button", function(e){
                e.preventDefault();
                let top =  $(this).offset().top - $(window).scrollTop() - $(this).height();
                if( wh >= top){
                    console.log('위에 있을때');
                }else {
                    console.log('아래 있을때');
                }
            });
        } 
    },
    탭메뉴 : {
        init : function(){
            this.evt();
        },
        evt : function(){
            // let $wrap = $('.tab-area');
            // // let $li = $wrap.find('> ul > li');
            // let $content = $wrap.find('.content');

            $(document).on('click', '.tab-area> ul> li' , function(e){
                let _this = $(this);
                let inx = _this.index();
                let current = e.currentTarget;

                _this.closest('.tab-area').find('> ul > li').removeClass('active');
                _this.closest('.tab-area').find('> .content').children().hide();

                if( current ){
                    _this.addClass('active');
                    _this.closest('.tab-area').find('> .content').children().eq(inx).show();
                }
            });
            
        },
    }
};

$(document).ready(function(){
    ui.init("a");
});

