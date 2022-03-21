// JavaScript Document
$(document).ready(function(e) {
	//$('.winners').css('display','block');
	//$('#galcont').css('display', 'block');
	$('#allslider').hide();
	$('#wintab .arrow-down').css('opacity', 1);
    $('#wintab').click(function(){
		$('.wgc').css('display', 'none');
		$('#wincont').css('display', 'block');
		$('.mtab').removeClass('tabselected');
		$(this).addClass('tabselected');
		$('.arrow-down').css('opacity', 0);
		$(this).find('.arrow-down').css('opacity', 1);
	});
    $('#galtab').click(function(){
		$('.wgc').css('display', 'none');
		$('#galcont').css('display', 'block');
		//no news yet
		//$('#staytunepic').css('display', 'block');
		$('.mtab').removeClass('tabselected');
		$(this).addClass('tabselected');
		$('.arrow-down').css('opacity', 0);
		$(this).find('.arrow-down').css('opacity', 1);
	});
	buildSlider();
	$('#winnerSelection').click(function(){
		//alert('aa');
		$('ul.selectionBox li a').removeClass('selectionNow');
		$(this).addClass('selectionNow');
		$('.galist').css('display','none');
		$('.winners').css('display','block');
		initSlider('winners');
	});
	
	$('#firstWinner').click(function(){
		$('ul.selectionBox li a').removeClass('selectionNow');
		$(this).addClass('selectionNow');
		$('.galist').css('display','none');
		$('.event1').css('display','block');
		initSlider('event1');
	});
	
	$('#carnivalWinner').click(function(){
		$('ul.selectionBox li a').removeClass('selectionNow');
		$(this).addClass('selectionNow');
		$('.galist').css('display','none');
		$('.event2').css('display','block');
		initSlider('event2');
	});
	/*$('#catopt').change(function(){
		$('.galist').css('display', 'none');
		$('li' + $(this).val()).css('display', 'block');
		
		var opt = $(this).val()
		initSlider(opt)
		console.log($(this).val());
	});*/
	
	initSlider('winners')
});

var barX=0;
var mouseX=0;
var barMove=false;
var scrollbarwidth=314;
function buildSlider(){
	$( "#shandle" ).mousedown(function(e) {
		mouseX = e.pageX
		barMove=true;
		barX=parseInt($(this).css('left'));
	});
	$( "#shandle" ).mousemove(function(e) {
		if(barMove){
			var newX = e.pageX - mouseX;
			newX=barX+newX;
			newX=newX<0?0:newX;
			newX=newX>=scrollbarwidth?scrollbarwidth:newX;
			$(this).css('left',(newX)+'px');
			checkBar();
		}
	});	
	$( "#shandle" ).mouseup(function(e) {
		barMove=false;
	});
	$( "#shandle" ).mouseout(function(e) {
		barMove=false;
	});
	
	$('#leftnav').click(function(e) {
		toggleSlider(false);
	});
	$('#rightnav').click(function(e) {
		toggleSlider(true);
	});
	
	initSlider();
}

function initSlider(opt){
	$('#slider').empty();
	$("#allslider .galist").each(function() {
		if($(this).hasClass(opt)){
			var content = $(this).clone();
			$('#slider').append(content);
		}
	});
	maxSlide=curSlide
	curSlide=2;
	maxSlide=0;
	$("#slider .galist").each(function() {
		if($(this).css('display')!='none'){
			maxSlide++;
			$(this).css('left','760px');	
		}
	});
	animateSlider();
}

var barSlider=0;
var curSlide=0;
var maxSlide=0;
var animateCon=false;
function toggleSlider(con){
	if(!animateCon){
		if(con){
			curSlide++;
			curSlide=curSlide>=maxSlide?maxSlide-1:curSlide;
		}else{
			curSlide--;
			curSlide=curSlide<0?0:curSlide;
		}
		animateSlider();
		
		var newBarX=curSlide/(maxSlide-1)*scrollbarwidth;
		$('#shandle').css('left',newBarX+'px');
	}
}

function checkBar(){
	barSlider=Math.round(parseInt($("#shandle").css('left'))/scrollbarwidth*(maxSlide-1));
	initAutoSlider();
}

var checkInterval=null;
function initAutoSlider(){
	if(checkInterval==null&&barSlider!=curSlide){
		if(curSlide<barSlider){
			curSlide++;	
		}else if(curSlide>barSlider){
			curSlide--;
		}
		console.log('auto'+curSlide)
		checkInterval=setInterval(endAutoSlider, 500);
		animateSlider();
	}
}

function endAutoSlider(){
	clearInterval(checkInterval);
	checkInterval=null;
	initAutoSlider();
}

function animateSlider(){
	animateCon=true;
	var count=0;
	$("#slider .galist").each(function() {
		if(count>=curSlide){
			//$(this).css('left','760px');
		}else{
			//$(this).css('left','-220px');
		}
		$(this).css('z-index',0);
		count++
	});
	
	var targetSlide
	//left
	targetSlide=curSlide-2;
	if(targetSlide>=0){
		$("#slider .galist").eq(targetSlide).css('z-index',1);
		$("#slider .galist").eq(targetSlide).stop().animate({
			left: "-44px"
		});
		$("#slider .galist").eq(targetSlide).find('div.goverlay').stop().animate({
			opacity: "0.7"
		});
	}

	//left middle
	targetSlide=curSlide-1;
	if(targetSlide>=0){
		$("#slider .galist").eq(targetSlide).css('z-index',2);
		$("#slider .galist").eq(targetSlide).stop().animate({
			left: "101px"
		});
		$("#slider .galist").eq(targetSlide).find('div.goverlay').stop().animate({
			opacity: "0.4"
		});
	}
	
	//center
	$("#slider .galist").eq(curSlide).css('z-index',5);
	$("#slider .galist").eq(curSlide).stop().animate({
		left: "277px"
	});
	$("#slider .galist").eq(curSlide).find('div.goverlay').stop().animate({
		opacity: "0"
	},function(){
		animateCon=false;
	});
	
	//right middle
	targetSlide=curSlide+1;
	if(targetSlide<=maxSlide){
		$("#slider .galist").eq(targetSlide).css('z-index',4);
		$("#slider .galist").eq(targetSlide).stop().animate({
			left: "465px"
		});
		$(".galist").eq(targetSlide).find('div.goverlay').stop().animate({
			opacity: "0.4"
		});
	}
	
	//right
	targetSlide=curSlide+2;
	if(targetSlide<=maxSlide){
		$("#slider .galist").eq(targetSlide).css('z-index',3);
		$("#slider .galist").eq(targetSlide).stop().animate({
			left: "633px"
		});
		$("#slider .galist").eq(targetSlide).find('div.goverlay').stop().animate({
			opacity: "0.7"
		});
	}
}