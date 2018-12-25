/*!
 CLEditor Table Plugin v1.0.4
 http://premiumsoftware.net/cleditor
 requires CLEditor v1.2.2 or later
 
 Copyright 2010, Chris Landowski, Premium Software, LLC
 Dual licensed under the MIT or GPL Version 2 licenses.
*/
//modified by Y.Urita 2018.12.21 enable to drag table
//modified by Y.Urita 2018.12.22 enable to insert rows and column
//modified by Y.Urita 2018.12.23 eneble to resize cell
//modified by Y.Urita 2018.12.24 enable to change border style
//modified by Y.Urita 2018.12.25 enable to change color of cell, bug fix in drag  //[ie11] faint table when add new table.

(function ($) {

	var colorPickerHtml = 
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
			'<div class="colorpicker" style="float:left;width:14px;height:14px;margin:0;background-color: rgb(51, 0, 51);margin:0 1px 1px 0;"></div>'+
			'<div class="colorpicker" style="text-align:center;width:140px;height:14px;background-color:transparent">Transparent</div>';

    // Define the table button
    $.cleditor.buttons.table = {
        name: "table",
        image: "table.gif",
        title: "表の挿入",//"Insert Table", //Replace Japanese to Original words, if you want.
        command: "inserthtml",
        popupName: "table",
        popupClass: "cleditorPrompt",
        popupContent:
            '<label>列:<input type="text" value="4" style="width:40px"></label>&nbsp;&nbsp;' +//columns
            '<label>行:<input type="text" value="4" style="width:40px"></label>' +//rows
            '<br /><input type="button" value="Submit">',
        buttonClick: tableButtonClick
    };
	// Define the insert row and columns button
    $.cleditor.buttons.insertrowcol = {
        name: "insertrowcol",
        image: "insertrowcol.gif",
        title: "行列の挿入",//"Insert Rows and Columns", //Replace Japanese to English, if you want.
        command: "inserthtml",
        popupName: "insertrowcol",
        popupClass: "cleditorPrompt",
        popupContent:
			'<label><input type="radio" value="front" name="insertFR" checked>前に挿入</label>'+//insert in front of element
			'<label><input type="radio" value="rear" name="insertFR">後に挿入</label><br>'+//insert in rear of element'
            '<label><input type="text" class="insertRC" value="0" style="width:40px">列を挿入</label>&nbsp;&nbsp;' +//insert columns
            '<label><input type="text" class="insertRC" value="0" style="width:40px">行を挿入</label>' +//insert rows
            '<br>Submit押下後にセルをクリック'+//Click taget cell after `Submit` press.
			'<br /><input type="button" value="Submit">',
        buttonClick: insertrowcolButtonClick
    };
	// Define the resize cell button
    $.cleditor.buttons.resizecell = {
        name: "resizecell",
        image: "resizecell.gif",
        title: "セルの幅と高さ",//"Resize width and height of cell", //Replace Japanese to English, if you want.
        command: "inserthtml",
        popupName: "resizecell",
        popupClass: "cleditorPrompt",
        popupContent:
			'変更しない場合は0<br>'+//0 is no change
            '<label>幅<input type="text" class="resizeWH" value="0" style="width:40px">px</label>&nbsp;&nbsp;' +//width
            '<label>高さ<input type="text" class="resizeWH" value="0" style="width:40px">px</label>' +//height
            '<br>Submit押下後にセルをクリック'+//Click taget cell after `Submit` press.
			'<br /><input type="button" value="Submit">',
        buttonClick: resizecellButtonClick
    };
	// Define the table border style button
    $.cleditor.buttons.borderstyle = {
        name: "borderstyle",
        image: "borderstyle.gif",
        title: "セルの枠線",//"border style of cell", //Replace Japanese to English, if you want.
        command: "inserthtml",
        popupName: "borderstyle",
        popupClass: "cleditorPrompt",
        popupContent:
			'<label><input type="checkbox" name="bordertop" value="border-top" checked>上</label>&nbsp;&nbsp;'+//top
			'<label><input type="checkbox" name="borderleft" value="border-left" checked>左</label>&nbsp;&nbsp;'+//left
			'<label><input type="checkbox" name="borderright" value="border-right" checked>右</label>&nbsp;&nbsp;'+//right
			'<label><input type="checkbox" name="borderbottom" value="border-bottom" checked>下</label><br>'+//bottom
			'<label style="display:block">Sample<hr class="bordersample" style="display:inline-block;border-style:solid;border-width:0px;border-top-width:1px;border-color:black;width:50px"></label>' +
            '<label>線種<select class="borderStyle" onchange="$(\'.bordersample\').css(\'border-style\',$(this).val())"><br>' +//line type
			'<option value="solid" selected>実線</option>' +//solid
			'<option value="dotted">点線</option>' +//dotted
			'<option value="dashed">破線</option>' +//dashed
			'<option value="double">二重線</option>' +//double
			
			'</select></label>' +
            '<label>太さ<select class="borderWidth"  onchange="$(\'.bordersample\').css(\'border-top-width\',$(this).val())">' +//line width
			'<option value="1px" selected>1px</option>' +
			'<option value="2px">2px</option>' +
			'<option value="3px">3px</option>' +
			'<option value="4px">4px</option>' +
			'<option value="6px">6px</option>' +
			'</select></label><br>' + 
			
			'<div style="width:150px;height:120px;background-color:white;margin-left:auto;margin-right:auto">' +
			colorPickerHtml+'</div>'+

            '<br>Submit押下後にセルをクリック'+//Click taget cell after `Submit` press.
			'<br /><input type="button" value="Submit">',
        buttonClick: borderstyleButtonClick
    };
	// Define the table border style button
    $.cleditor.buttons.cellcolor = {
        name: "cellcolor",
        image: "cellcolor.gif",
        title: "セルの背景色",//"background color of cell", //Replace Japanese to English, if you want.
        command: "inserthtml",
        popupName: "cellcolor",
        popupClass: "cleditorPrompt",
        popupContent:
			'<div style="width:150px;height:120px;background-color:white;">' +
			colorPickerHtml+'</div>',
        buttonClick: cellcolorButtonClick
    };
    // Add the button to the default controls
    $.cleditor.defaultOptions.controls = $.cleditor.defaultOptions.controls
        .replace("rule ", "rule table insertrowcol resizecell borderstyle cellcolor ");

    // Table button click event handler
    function tableButtonClick(e, data) {

        // Wire up the submit button click event handler
        $(data.popup).children(":button")
            .off("click")
            .on("click", function (e) {

                // Get the editor
                var editor = data.editor;

                // Get the column and row count
                var $text = $(data.popup).find(":text"),
                    cols = parseInt($text[0].value),
                    rows = parseInt($text[1].value);

                // Build the html
                var html;
                if (cols > 0 && rows > 0) {
					html="<table style='border-collapse:collapse;border:1px solid black;background-color:white;position:relative;top:0px;left:0px'>&#10;";
                    for (y = 0; y < rows; y++) {
                        html += "&#09;<tr>";
                        for (x = 0; x < cols; x++)
                            html += "<td style='border:1px solid black;min-width:30px;height:15px'></td>";
                        html += "</tr>&#10;";
                    }
                    html += "</table>&#10;<br />&#10;";
                } 

                // Insert the html
                if (html)
                    editor.execCommand(data.command, html, null, data.button);

				//to dragable
				var x,y,ix="",iy="",divX,divY,eX,eY;
				
				var isDrag=false;
				var obj;
				//mouse down event
				var frameBody=$(editor.$frame[0]).contents().find("body");
				$(frameBody).off("dblclick").on("dblclick","table",tdown);

				//fire when mouse down
				function tdown(e) {
					isDrag=true;
					if(ix=="" || iy=="" )//&& isDrag==false)
					{
						obj=$(this).is("table") ? this : $(this).closest("table");
						divX=$(obj).offset().left;
						divY=$(obj).offset().top;
						var divW=$(obj).width();
						var divH=$(obj).height();
						var html="<div class='divTable' style='position:absolute;top:"+divY+"px;left:"+divX+"px;width:"
							+divW+"px;height:"+divH+"px;border:2px solid blue;opacity:0.6;background-color:blue'></div>";
						$(frameBody).append(html);
						
						//get relative position
						ix=$(obj).css("left")!="auto" ? parseInt($(obj).css("left")) : 0;
						iy=$(obj).css("top")!="auto" ? parseInt($(obj).css("top")) : 0;
						x = e.pageX;
						y = e.pageY;
						
					}
					//move event
					$(frameBody).on("mousemove",".divTable",tmove);
					
				}

				//fire when mouse move
				function tmove(e) {
					if(isDrag==true)
					{
						//prevent default event
						e.preventDefault();
						
						//to prevent display error dialog in ie11
						if(window.navigator.userAgent.indexOf("rv:11")!=-1)$(obj).trigger('mouseup');
						
						//trace mouse
						$(this).css({"top":e.pageY - y + divY +"px","left":e.pageX - x  + divX + "px"});
						eX=e.pageX;
						eY=e.pageY;
						
						//mouse up or mouse leave event
						$(this).on("mouseup",tup);
						$(frameBody).on("mouseleave",".divTable",tup);
					}
				}

				//fire when mouse up
				function tup(e) {
					if(isDrag==true)
					{
						//remove event handler
						$(frameBody).off("mousemove",tmove);
						$(frameBody).off("mouseleave",tup);
						$(this).off("mouseup",tup);
						isDrag=false;
						$(obj).css({"left":eX-x+ix+"px","top":eY-y+iy+"px"});
						
						ix=iy="";
						setTimeout(function(){
							$(frameBody).find(".divTable").remove();
							editor.updateTextArea();//update iframe
						},10);
					}
				}

				//change icon
				$(frameBody).on("dblclick","table",function(e){
					$(this).css("cursor","move");
				});
				
				$(frameBody).on("mouseleave","table",function(e){
					$(this).css("cursor","default");
					$(frameBody).css("cursor","default");
				});
				
				$(frameBody).on("click","table",function(e){
					if(isDrag==false)
					{
						$(this).css("cursor","default");
						$(frameBody).css("cursor","default");
					}
				});
				
                // Reset the text, hide the popup and set focus
                $text.val("4");
                editor.hidePopups();
                editor.focus();

          });

    }
	
	// Table button click event handler
    function insertrowcolButtonClick(e, data) {

        // Wire up the submit button click event handler
        $(data.popup).children(":button")
            .off("click")
            .on("click", function (e) {

                // Get the editor
                var editor = data.editor;
				
				// Get insert position
				var radi=$(data.popup).find("input[name='insertFR']:checked");
				
                // Get the column and row count
                var $text = $(data.popup).find(":text"),
                    cols = parseInt($text[0].value),
                    rows = parseInt($text[1].value);
				
				//Click event
				var frameBody=$(editor.$frame[0]).contents().find("body");
				$($(editor.$frame[0]).contents()).on("click",function(e)
				{
					if($(e.target).closest("table").length==1)
					{
						var html;
						//insert columns part
						if(cols>0)
						{
							html="<td style='"+$(e.target).attr("style")+";min-width:2em'></td>";
							
							//Get current column index
							var c=parseInt($(e.target).closest("tr").children().index(e.target));
							
							//loop each tr
							var targetTable=$(e.target).closest("table");
							
							$(targetTable).find("tr").each(function(idx,elem)
							{
								if($(radi).val()==="front")
								{//front
									//insert columns
									for(var i=0;i<cols;i++)
									{									
										$(elem).find("td:nth-child("+(1+c)+")").before(html);
									}
								}
								else
								{//rear
									//insert columns
									for(var i=0;i<cols;i++)
									{
										$(elem).find("td:nth-child("+(1+c)+")").after(html);
									}
								}	
							});
						}
						
						//insert rows part
						if(rows>0)
						{
							//Get current row
							var thisTr=$(e.target).closest("tr");
							var r=parseInt($(thisTr).closest("table").find("tr").index());
							
							//Get column number
							var cs=$(thisTr).find("td").length;
							html="&#09;<tr style='"+$(thisTr).attr("style")+"'>";
							$(thisTr).find("td").each(function(idx,elem)
							{
								html+="<td style='"+$(elem).attr("style")+";min-height:1em'></td>";
							});
							html+="</tr>&#10;";
							
							if($(radi).val()==="front")
							{//front
								//insert columns
								for(var i=0;i<rows;i++)
								{
									$(thisTr).before(html);
								}
							}
							else
							{//rear
								//insert columns
								for(var i=0;i<rows;i++)
								{
									$(thisTr).after(html);
								}
							}
						}
						
					}
					//off event -- cancel when click except table (include td)
					$($(editor.$frame[0]).contents()).off("click");
				});
				
				// Reset the text, hide the popup and set focus
                $text.val("0");
                editor.hidePopups();
                editor.focus();
				
			});
	}
	
	// Table button click event handler
    function resizecellButtonClick(e, data) {

        // Wire up the submit button click event handler
        $(data.popup).children(":button")
            .off("click")
            .on("click", function (e) {

                // Get the editor
                var editor = data.editor;
				
                // Get the column and row count
                var $text = $(data.popup).find(":text"),
                    wid = parseInt($text[0].value),
                    hei = parseInt($text[1].value);
				
				//Click event
				
				$($(editor.$frame[0]).contents()).on("click",function(e)
				{
					if($(e.target).is("td"))
					{
						//change width size
						if(wid>0)
						{
							$(e.target).css("min-width",wid+"px");
							editor.updateTextArea();//update iframe
						}
						//change height size
						if(hei>0)
						{
							//$(e.target).css("min-height",hei+"px");
							$(e.target).css("height",hei+"px");
							editor.updateTextArea();//update iframe
						}
						
					}
					//off event -- cancel when click except table (include td)
					$($(editor.$frame[0]).contents()).off("click");
				});
				
				// Reset the text, hide the popup and set focus
                $text.val("0");
                editor.hidePopups();
                editor.focus();
				
			});
	}	

	// Table button click event handler
    function borderstyleButtonClick(e, data) {
		// Get the editor
        var editor = data.editor;
		var borderColor=$(data.popup).find(".bordersample").css("border-color");
		
		//Get clicked color code 
		$(data.popup).find(".colorpicker")
            .off("click")
            .on("click", function (e) {
				
				// Get the border color from color picker
				borderColor=$(e.target).css("background-color");
				
				$(".bordersample").css("border-color",borderColor);
			});
				
        // Wire up the submit button click event handler
        $(data.popup).children(":button")
            .off("click")
            .on("click", function (e) {

                // Get the which positions are change
                var cb = $(data.popup).find("input[type=checkbox]"),
					sl = $(data.popup).find("select");
				
				$($(editor.$frame[0]).contents()).on("click",function(e)
				{
					if($(e.target).is("td"))
					{
						var	baseStyle=$(sl[0]).val()+" "+$(sl[1]).val()+" "+borderColor;
						
						$(cb).each(function(idx,item){
							if($(item).prop("checked")==true)
								$(e.target).css($(item).val(),baseStyle);
						});	
						editor.updateTextArea();//update iframe
					}
					//off event -- cancel when click except table (include td)
					$($(editor.$frame[0]).contents()).off("click");
				});
				editor.hidePopups();
                editor.focus();
			});
	}
	
	// Table button click event handler
    function cellcolorButtonClick(e, data) {
		// Get the editor
        var editor = data.editor;
		
		//Get clicked color code 
		$(data.popup).find(".colorpicker")
            .off("click")
            .on("click", function (e) {

				//Get the background-color from color picker
				var cellColor=$(e.target).css("background-color");
				
				//Apply the color to cell
				$($(editor.$frame[0]).contents()).on("click",function(e)
				{
					if($(e.target).is("td"))
					{
						$(e.target).css("background-color",cellColor);
						
						editor.updateTextArea();//update iframe
					}
					//off event -- cancel when click except table (include td)
					$($(editor.$frame[0]).contents()).off("click");
				});
				editor.hidePopups();
                editor.focus();
			});
	}
	
})(jQuery);
