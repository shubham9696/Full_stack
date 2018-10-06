$("ul").on("click","li",function(){
	$(this).toggleClass("checked");
});

$("ul").on("click","span",function(event){
	$(this).parent().fadeOut(300,function(){
		$(this).remove();
	});
	event.stopPropagation();
});

$("input[type='text']").keypress(function(event){
	if(event.which===13)
	{
		var newtodo= $(this).val();
		$("ul").append("<li><span><i class='fa fa-trash'></i></span> "+ newtodo +"</li>");
		$(this).val("");
	}
});

$(".fa-plus").click(function(){
	$("input[type='text']").fadeToggle();
})