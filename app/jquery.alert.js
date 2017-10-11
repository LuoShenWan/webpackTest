/**
 * Created by 林建鹏 on 2016-5-30.
 */
import $ from "jquery";
(function($){
    $.extend({
        alert:function(options){

            var body = $('body');

            body.find('.cloud-alert-shadow').remove();
            body.find('.cloud-alert').remove();

            var defaults = {
                zIndex:1050,
                mess:'',
                title:'提示',
                id:'',
                cancelBtn:false,
                close:function(){},
                decideEvent:function(){},
                cancelEvent:function(){}
            };
            $.extend(defaults,options);

            var shadow = $('<div class="cloud-alert-shadow"></div>');
            var modal = $('<div class="cloud-alert"></div>');
            var title = $('<div class="cloud-alert-title"><span>'+defaults.title+'</span></div>');
            var closeBtn = $('<div class="cloud-alert-close"></div>');
            var content = $('<div class="cloud-alert-content">'+defaults.mess+'</div>');
            var btns;
            if(defaults.cancelBtn){
                btns = $('<div class="cloud-alert-btns"><button class="cloud-btn cloud-btn-success cloud-alert-decide">确定</button><button class="cloud-btn cloud-alert-cancel">取消</button></div>');
            }else{
                btns = $('<div class="cloud-alert-btns"><button class="cloud-btn cloud-btn-success cloud-alert-decide">确定</button></div>');
            }

            shadow.css({
                'z-index':defaults.zIndex
            });
            modal.css({
                'z-index':Number(defaults.zIndex) + 1
            });

            title.append(closeBtn);
            modal.append(title).append(content).append(btns);
            body.append(shadow).append(modal);


            modal.css({
                'left': ($(window).width() - modal.outerWidth()) / 2 + 'px',
                'top': ($(window).height() - modal.height()) / 2 + $(window).scrollTop() + 'px'
            });

            if (top != self) {
                try {
                    var parentDoc = $(parent.document);
                    var iframe = parentDoc.find('iframe:visible');
                    var top = parentDoc.scrollTop() - iframe.offset().top + ($(parent.window).height() - modal.height()) / 2;

                    if(top < 0){
                        top = 0;
                    }else if(top > $(window).height() - modal.outerHeight(true)){
                        top = $(window).height() - modal.outerHeight(true);
                    }


                    modal.css({
                        'top': top + 'px'
                    });

                } catch (e) {}
            }


            closeBtn.on('click',function(){
                removeModal();
            });
            btns.on('click','.cloud-alert-decide',function(){
                if(!defaults.cancelBtn){
                    removeModal();
                }
                defaults.decideEvent(removeModal);
            }).on('click','.cloud-alert-cancel',function(){
                defaults.cancelEvent(removeModal);
            });

            function removeModal(){
                modal.remove();
                shadow.remove();
                defaults.close();
            }

        },
        notice:function(params){
            if(top != self && parent.window.jQuery.notice){
                parent.window.jQuery.notice(params);
                return false;
            }
            var defaults = {
                mess:'',
                time:1000,
                zIndex:1
            };

            $.extend(defaults, params);

            init();

            function init(){
                $('.p-notice-container').remove();
                template(defaults.mess);
                setTimeout(function(){
                    $('.p-notice-container').remove();
                },defaults.time);
            }

            function template(mess){
                var container = $('<div class="p-notice-container"><div class="p-notice-bg"></div><div class="p-notice-mess">'+ defaults.mess +'</div></div>');
                $('body').append(container);
                container.css({
                    position:'fixed',
                    top:'50%',
                    left:'50%',
                    zIndex:defaults.zIndex
                });
                container.find('.p-notice-bg').css({
                    position:'absolute',
                    top:0,
                    left:0,
                    width:'100%',
                    height:'100%',
                    background:'#000',
                    opacity:'0.5',
                    zIndex:1,
                    borderRadius:'3px'
                }).siblings('.p-notice-mess').css({
                    position:'relative',
                    lineHeight:'20px',
                    fontSize:'12px',
                    color:'#fff',
                    padding:'15px',
                    zIndex:2
                });
                container.css({
                    marginLeft:-container.width()/2+'px',
                    marginTop:-container.height()/2+'px'
                })
            }
        }
    });

})($);

