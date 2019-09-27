/*
 *   name   :   pc_holiday919eat--bannerAutoSilder
 *   by     :   haoxiaojun
 *   on     :   2015/09/01
 *   emal   :   haoxiaojun@letv.com
*/
$(function(){
	Carousel={
			init:function(el){
				this.initEl(el);
				this.autoMove();
				this.bindEvent();
				this.hovertips();
			},
			initEl:function(el){
				var that=this;
				
				this.viewBox=el.find('.focus');//视窗
				
				this.slideBox=el.find('#slidesImgs');//滑块外层box

				this.slideWidth=this.slideBox.innerWidth;
				// console.log(this.slideBox.innerWidth)
				//左右按钮
				this.l_btn=el.find('.t_prev');
				this.r_btn=el.find('.t_next');
				//显示锚点
				this.tip=el.find('.t_circle');

				this.timer=null;

				//运算符号
				this.operator=1;
				this.step=this.viewBox.innerWidth();

				this.index=0;
				//所有滑块
				this.slides=this.slideBox.find('li');
				this.len=this.slides.length;//滑块的个数；
				this.slides.clone(true);
				this.slideBox.append(this.slides.clone(true));
				for(var i=0;i<this.len-1;i++){
					this.tip.append('<li></li>');
				}
				this.slideBox.css({
					width:that.slideWidth*2
				});
				this.hightClass='active';
			},
			hovertips:function(){
				var that=this;
				that.tip.find("li").click(function(){
					that.index=$(this).index();
					that.move();
				})
			},
			autoMove:function(){
				var that=this;
				this.timer=window.setInterval(function(){
					that.index++;
					that.move()
				},3000)
			},
			bindEvent:function(){
				var that=this;
				that.viewBox.hover(function(){
					clearInterval(that.timer);
				},function(){
					that.autoMove();
				})
				that.l_btn.click(function(){
					that.operator=-1
					clearInterval(that.timer);
					that.index--;
					that.move();
					that.operator=1;
				});
				that.r_btn.click(function(){
					clearInterval(that.timer);
					that.index++;
					that.move();
				});
				$(document).delegate(".close",'click',function(){
					$(this).closest('.tanchu').fadeOut();
					$('.mask').fadeOut();
				})

			},
			move:function(){
				var that=this;

				if(that.index<=that.len&&that.index>=0){
					that.slideBox.stop().animate({
						left:-that.step*(that.index-that.operator)-that.step*that.operator
					},500);
					// console.log(-that.step*(that.index-that.operator)-that.step*that.operator);
					if(that.index==that.len){
						that.tip.find('li').removeClass(that.hightClass).eq(0).addClass(that.hightClass);
					}else{
						that.tip.find('li').removeClass(that.hightClass).eq(that.index).addClass(that.hightClass);
					}
				}else if(that.index>=that.len+1){
					that.index=1;

					that.slideBox.css({
						left:0
					});
					// console.log(-that.step*(that.index-that.operator)-that.step*that.operator);

					that.slideBox.stop().animate({
						left:-that.step*(that.index-that.operator)-that.step*that.operator
					},500);
					that.tip.find('li').removeClass(that.hightClass).eq(that.index).addClass(that.hightClass);
				}else if(that.index<0){
					that.index=that.len;
					that.slideBox.css({
						left:-that.step*that.index
					});
					that.index--
					that.slideBox.stop().animate({
						left:-that.step*(that.index-that.operator)-that.step*that.operator
					},500);
					// console.log(-that.step*(that.index-that.operator)-that.step*that.operator);

				  	that.tip.find('li').removeClass(that.hightClass).eq(that.index).addClass(that.hightClass);
				}
			}
	}
	var el=$('.lunbo');
	if($("#slidesImgs li").length>1){
		Carousel.init(el);
	}
})	