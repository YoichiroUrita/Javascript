/*!
 CLEditor Table Plugin v1.0.4
 http://premiumsoftware.net/cleditor
 requires CLEditor v1.2.2 or later
 
 Copyright 2010, Chris Landowski, Premium Software, LLC
 Dual licensed under the MIT or GPL Version 2 licenses.
*/
//modify by Y.Urita 2018.12.21 draggable table
//modify by Y.Urita 2018.12.22 insert rows and column

(function ($) {

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
	// Define the table style button
    $.cleditor.buttons.insertrowcol = {
        name: "insertrowcol",
        image: "insertrowcol.gif",
        title: "行列の挿入",//"Insert Rows and Columns", //Replace Japanese to English, if you want.
        command: "inserthtml",
        popupName: "insertrowcol",
        popupClass: "cleditorPrompt",
        popupContent:
			'<label><input type="radio" value="front" name="insertFR">前に挿入</label>'+//insert in front of element
			'<label><input type="radio" value="rear" name="insertFR">後に挿入</label><br>'+//insert in rear of element'
            '<label><input type="text" class="insertRC" value="0" style="width:40px">列を挿入</label>&nbsp;&nbsp;' +//insert columns
            '<label><input type="text" class="insertRC" value="0" style="width:40px">行を挿入</label>' +//insert rows
            '<br>Submit押下後にセルをクリック'+//Click taget cell after `Submit` press.
			'<br /><input type="button" value="Submit">',
        buttonClick: insertrowcolButtonClick
    };
    // Add the button to the default controls
    $.cleditor.defaultOptions.controls = $.cleditor.defaultOptions.controls
        .replace("rule ", "rule table insertrowcol ");

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
					html="<table style='border-collapse:collapse;border:1px solid black;background-color:white;position:relative;top:0px;left:0px'>";
                    for (y = 0; y < rows; y++) {
                        html += "<tr>";
                        for (x = 0; x < cols; x++)
                            html += "<td style='border:1px solid black'>" + x + "," + y + "</td>";
                        html += "</tr>";
                    }
                    html += "</table><br />";
                } 

                // Insert the html
                if (html)
                    editor.execCommand(data.command, html, null, data.button);

				//to dragable
				var x,y,ix="",iy="";
				
				var isDrag=false;
				var obj;
				//mouse down event
				var frameBody=$(editor.$frame[0]).contents().find("body");
				$(frameBody).on("dblclick","table",tdown);

				//fire when mouse down
				function tdown(e) {
					isDrag=true;
					if(ix=="" && iy=="" )//&& isDrag==false)
					{
						obj=this;
						var divX=$(e.target).closest("table").offset().left;
						var divY=$(e.target).closest("table").offset().top;
						var divW=$(e.target).closest("table").width();
						var divH=$(e.target).closest("table").height();
						var html="<div class='divTable' style='position:absolute;top:"+divY+"px;left:"+divX+"px;width:"
							+divW+"px;height:"+divH+"px;border:2px solid blue;opacity:0.6;background-color:blue'></div>";
						$(frameBody).append(html);
						
						//get relative position
						ix=$(e.target).closest("table").css("left")!="auto" ? parseInt($(e.target).closest("table").css("left")) : 0;
						iy=$(e.target).closest("table").css("top")!="auto" ? parseInt($(e.target).closest("table").css("top")) : 0;
						x = e.pageX - ix;
						y = e.pageY - iy;
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
						$(e.target).css({"top":e.pageY - y + "px","left":e.pageX - x + "px"});
						
						//mouse up or mouse leave event
						$(e.target).on("mouseup",tup);
						$(frameBody).on("mouseleave",".divTable",tup);
					}
				}

				//fire when mouse up
				function tup(e) {
					//remove event handler
					$(frameBody).off("mousemove",tmove);
					$(frameBody).off("mouseleave",tup);
					$(e.target).off("mouseup",tup);
					isDrag=false;
					$(obj).css({"left":$(this).offset().left+"px","top":$(this).offset().top});
					
					ix=iy="";
					setTimeout(function(){
						$(frameBody).find(".divTable").remove();
					},10);
				}

				//change icon
				$(frameBody).on("dblclick","table",function(e){
					$(e.target).css("cursor","move");
				});
				
				$(frameBody).on("mouseleave","table",function(e){
					$(e.target).css("cursor","default");
					$(frameBody).css("cursor","default");
				});
				
				$(frameBody).on("click","table",function(e){
					if(isDrag==false)
					{
						$(e.target).css("cursor","default");
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
							html="<tr style='"+$(thisTr).attr("style")+"'>";
							$(thisTr).find("td").each(function(idx,elem)
							{
								html+="<td style='"+$(elem).attr("style")+";min-height:1em'></td>";
							});
							html+="</tr>";
							
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
})(jQuery);

