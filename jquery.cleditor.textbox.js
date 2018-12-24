/*********************************************************************************************
 * cleditor plug-in
 * You can put text box on cleditor as Excel
 *
 * #How to use.
 * $("#sample").cleditor({ //write options here// });//declaration of cleditor 
 * $("#sample").cleditorXP();//declaration of this plugin
 *
 * Licensed under the MIT or GPL Version 2
 * Y.Urita 2018.12.5	ver.0.0.0
 * Y.Urita 2018.12.7    ver.0.0.1 fix error which occurred in ie11
 * Y.Urita 2018.12.16   ver.0.0.2 fit with scroll position in initial vertical direction
 * Y.Urita 2018.12.17   ver.0.0.3 change position style absolute to relative
 * Y.Urita 2018.12.18   ver.0.0.4 bug fix for drag
 * Y.Urita 2018.12.24   ver.0.0.5 hide popup window after color picked
 ********************************************************************************************/
 
(function ($) {
	// Define the text box button
    $.cleditor.buttons.textbox = {
        name: "textbox",
        image: "textbox.gif",
        title: "Insert Text box",
        command: "forecolor",//"inserthtml",
        popupName: "textbox",
        popupClass: "cleditorPrompt",
        popupContent:
			'<div style="width:150px;height:120px;background-color:white;">' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(255, 255, 255);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(255, 204, 204);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(255, 204, 153);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(255, 255, 153);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(255, 255, 204);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(153, 255, 153);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(153, 255, 255);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(204, 255, 255);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(204, 204, 255);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(255, 204, 255);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(204, 204, 204);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(255, 102, 102);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(255, 153, 102);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(255, 255, 102);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(255, 255, 51);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(102, 255, 153);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(51, 255, 255);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(102, 255, 255);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(153, 153, 255);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(255, 153, 255);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(187, 187, 187);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(255, 0, 0);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(255, 153, 0);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(255, 204, 102);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(255, 255, 0);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(51, 255, 51);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(102, 204, 204);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(51, 204, 255);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(102, 102, 204);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(204, 102, 204);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(153, 153, 153);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(204, 0, 0);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(255, 102, 0);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(255, 204, 51);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(255, 204, 0);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(51, 204, 0);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(0, 204, 204);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(51, 102, 255);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(102, 51, 255);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(204, 51, 204);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(102, 102, 102);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(153, 0, 0);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(204, 102, 0);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(204, 153, 51);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(153, 153, 0);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(0, 153, 0);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(51, 153, 153);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(51, 51, 255);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(102, 0, 204);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(153, 51, 153);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(51, 51, 51);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(102, 0, 0);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(153, 51, 0);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(153, 102, 51);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(102, 102, 0);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(0, 102, 0);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(51, 102, 102);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(0, 0, 153);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(51, 51, 153);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(102, 51, 102);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(0, 0, 0);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(51, 0, 0);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(102, 51, 0);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(102, 51, 51);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(51, 51, 0);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(0, 51, 0);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(0, 51, 51);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(0, 0, 102);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(51, 0, 153);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(51, 0, 51);margin:0 1px 1px 0;"></div>' +
			'<div class="colorpicker" style="text-align:center;width:140px;height:14px;background-color:transparent">Transparent</div>' +
			'</div>',
        buttonClick: textboxButtonClick
    };

    // Add the button to the default controls
    $.cleditor.defaultOptions.controls = $.cleditor.defaultOptions.controls
        .replace("rule ", "rule textbox ");

    // Text box button click event handler
    function textboxButtonClick(e, data) {
        // Wire up the submit button click event handler
		$(data.popup).find(".colorpicker")
            .off("click")
            .on("click", function (e) {
                // Get the editor
                var editor = data.editor;
				
                // Get the column and row count
 				var	bgcolor=$(e.target).css("background-color");
				
                // Build the html
				var frameBody=$(editor.$frame[0]).contents().find("body");
				var scrTop=$(frameBody).scrollTop();
                var html = "<textarea style='position:relative;top:"+scrTop+"px;left:0px;width:100px;height:20px;background-color:"
						+bgcolor+";'></textarea>&#10;";

                // Insert the html
                if (html)
				{	
					$(frameBody).append(html);
					//editor.doc.execCommand('insertHTML',false,html);
				}
				
				//to dragable
				var x,y,ix="",iy="";
				var isDrag=false;
				//mouse down event
				$(frameBody).on("dblclick","textarea",mdown);

				//fire when mouse down
				function mdown(e) {
					isDrag=true;
					if(ix=="" && iy=="")
					{
						//get relative position
						ix=$(e.target).css("left")!="auto" ? parseInt($(e.target).css("left")) : 0;
						iy=$(e.target).css("top")!="auto" ? parseInt($(e.target).css("top")) : 0;
						x = e.pageX - ix;
						y = e.pageY - iy;
					}
					//move event
					$(frameBody).on("mousemove","textarea",mmove);
				}

				//fire when mouse move
				function mmove(e) {
					if(isDrag==true)
					{
						//prevent default event
						e.preventDefault();

						//trace mouse
						$(e.target).css({"top":e.pageY - y + "px","left":e.pageX - x + "px"});
						
						//mouse up or mouse leave event
						$(e.target).on("mouseup",mup);
						$(frameBody).on("mouseleave","textarea",mup);
					}
				}

				//fire when mouse up
				function mup(e) {
					//remove event handler
					$(frameBody).off("mousemove",mmove);
					$(frameBody).off("mouseleave",mup);
					$(e.target).off("mouseup",mup);
					isDrag=false;
					ix=iy="";
				}

				//change icon
				$(frameBody).on("dblclick","textarea",function(e){
					$(e.target).css("cursor","move");
				});
				
				$(frameBody).on("mouseleave","textarea",function(e){
					$(e.target).css("cursor","default");
					$(frameBody).css("cursor","default");
				});
				
				$(frameBody).on("click","textarea",function(e){
					if(isDrag==false)
					{
						$(e.target).css("cursor","default");
						$(frameBody).css("cursor","default");
					}
				});
				editor.hidePopups();
                // Set focus
                editor.focus();

          });

    }

}(jQuery));
