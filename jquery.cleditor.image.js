/*********************************************************************************************
 * cleditor plug-in
 * You can drop image file and paste image by base64 on cleditor iframe
 *
 * #How to use.
 * $("#sample").cleditor({ //write options here// });//declaration of cleditor 
 * $("#sample").cleditorXP();//declaration of this plugin
 *
 * Licensed under the MIT or GPL Version 2
 * Y.Urita 2018.12.2	ver.0.0.0
 * Y.Urita 2018.12.4    ver.0.0.1 draggable to resize window
 * Y.Urita 2018.12.5    ver.0.0.2 fixed drag problem when click buttons on resize window 
 * Y.Urita 2018.12.15   ver.0.0.3 enable to drag and drop image file in IE11
 ********************************************************************************************/
 
(function ($) {
	
	$.fn.cleditorXP=function(){
		var cled=$(this).cleditor()[0];
		cled.$frame.contents().find("body").attr("draggable",true);
		
		var targetImg;//image what you resize
		var positionX="";
		var positionY="";
		var sizing=$("<div id='sizing' style='background-color:#ececec;position:absolute;padding:2px'>"+
					"<b style='text-align:center;display:block'>Image resizing</b>"+
					"<label>"+
					"<input type='radio' name='sizing' value='width'>Fit with Width</input>"+
					"</label><br><label>"+
					"<input type='radio' name='sizing' value='height'>Fit with Height</input>"+
					"</label><br><label>"+
					"<input type='radio' name='sizing' value='zoom'>Zoom</input>"+
					"</label>"+
					"<input type='text' id='zoom' style='width:3em'>%<br>"+
					"<label style='text-align:right;display:block'>"+
					"<input type='button' value='Apply' id='butApply'>"+ 
					"<input type='button' value='close' id='butClose'>"+ 
					"</label></div>");
		$("body").append(sizing);
		$(sizing).hide();
		
		//to dragable resize window
		var x;
		var y;
		
		//mouse down event
		$("#sizing").on("mousedown",mdown);

		//fire when mouse down
		function mdown(e) {
			//get relative position
			x = e.pageX - this.offsetLeft;
			y = e.pageY - this.offsetTop;

			//move event
			$("body").on("mousemove",mmove);
		}

		//fire when mouse move
		function mmove(e) {
			//prevent default event
			e.preventDefault();

			//trace mouse
			$("#sizing").css({"top":e.pageY - y + "px","left":e.pageX - x + "px"});
			
			//mouse up or mouse leave event
			$("#sizing").on("mouseup",mup);
			$("body").on("mouseleave",mup);
		}

		//fire when mouse up
		function mup(e) {
			//remove event handler
			$("body").off("mousemove",mmove);
			$("body").off("mouseleave",mup);
			$("#sizing").off("mouseup",mup);
		}

		//change icon
		$(document).on("mouseenter","#sizing",function(e){
			$("#sizing").css("cursor","pointer");
		});
		
		$(document).on("mouseleave","#sizing",function(e){
			$("#sizing").css("cursor","default");
			$(document).css("cursor","default");
		});
		
		//prevent keep draging 
		$("#sizing").on("click","input",function(e){
			mup(e);
		});

		//Event:double click --- resize image
		cled.$frame.contents().find("body").on("dblclick","img",function(e)
		{
			targetImg=this;
			if(positionX=="")positionX=cled.$frame.width()/2+cled.$frame.position().left;
			if(positionY=="")positionY=cled.$frame.height()/2+cled.$frame.position().top;
			$(sizing).css({"top":positionY+"px","left":positionY+"px"}).show();
		});
				
		//click apply button
		$(document).on("click","#butApply",function()		
		{
			var radioVal=$("#sizing input[name=sizing]:checked").val();
			if(radioVal=="width")
			{
				var w=cled.$frame.contents().find("body").width();
				$(targetImg).css({"width":w+"px","height":"","zoom":""});
			}
			else if(radioVal=="height")
			{
				var h=cled.$frame.contents().find("body").height();
				$(targetImg).css({"width":"","height":h+"px","zoom":""});
			}
			else if(radioVal=="zoom")
			{
				var rate=parseFloat($("#zoom").val())/100;
				$(targetImg).css({"width":"","height":"","zoom":rate});
			}
		});
		
		//click close
		$(document).on("click","#butClose",function()
		{
			$(sizing).hide();
		});
		
		//Event:paste
		cled.$frame.contents().find("body").on('paste',function(e)
		{
			// Handle the event
			retrieveImageFromClipboardAsBlob(e, function(imageBlob){
				// If there's an image, display it in the canvas
				if(imageBlob){
			
					var img = new Image();

					var Canvas=$("<canvas></canvas>");
					var context=Canvas[0].getContext('2d');
					img.onload = function(){
			
						context.canvas.width=img.width;
						context.canvas.height=img.height;
						context.drawImage(img,0,0);
						
						var thisImg=cled.$frame.contents().find("body").append('<img src="'+Canvas[0].toDataURL('image/png')+'" draggable=true>');
						
						var curHtml=cled.$frame.contents().find("body").html();
						cled.$area.val(curHtml);//write textarea
						cled.updateTextArea();//update iframe
					};
					
					var URLObj = window.URL || window.webkitURL;
					img.src = URLObj.createObjectURL(imageBlob);
				}
			})	
		});
		
		//Drag and Drop
		if(window.navigator.userAgent.indexOf("rv:11")==-1)
		{//chrome
			//Event:drag start ---- pass to dataTransfer
			cled.$frame.contents().find("body").on("dragstart",function(e)
			{
				draggingFile=e.originalEvent.dataTransfer;//need 'originalEvent' when use JQuery
			});
			
			cled.$frame.contents().find("body").on("dragover",function(e)
			{
				e.preventDefault();
				console.log("dragover in iframe");
			});
			
			//Event:drop
			cled.$frame.contents().on("drop",function(e)
			{
				//get from dataTransfer
				var file=e.originalEvent.dataTransfer.files[0];
				var file_reader = new FileReader();//API
				
				//ater file read
				file_reader.onloadend = function(e){

					// when error occur
					if(file_reader.error) return;
					
					var thisImg=cled.$frame.contents().find("body").append('<img src="'+file_reader.result+'" draggable=true>');
					var currentHtml=cled.$frame.contents().find("body").html();
					cled.$area.val(currentHtml);//writting textarea
					cled.updateTextArea();//update iframe
				}
				file_reader.readAsDataURL(file);
			});
			
			//Event:drag end
			cled.$frame.contents().on("dragend",
			function(e)
			{
				//update source
				cled.updateTextArea();
			});
		}
		else
		{//horrible IE11
			//TOO LONG PAINFUL JOURNEY
			//I don't know why appended iframe's body ignore drag event listener in IE11 on cleditor.
			//So,my idea are as below.
			//1. make new layer on cleditor as catch dragging file.
			//2. hide catcher's layer until dragging file enter.
			//3. after draggin file enter, prevent default event and write image on html by base64endocing.
			//4. hide catcher's layer again as NINJA.
			$(document).ready(function(e)
			{
				
				//waiting until DOM is ready
				var frmDocument=cled.$frame.contents();
				
				//make catcher layer (div element)
				var ww=cled.$main.width();
				var hh=cled.$main.height();
				var left=cled.$main.offset().left;
				var top=cled.$main.offset().top;
				var divhtml="<div class='cleditorCatcher' style='position:absolute;left:"+left+"px;top:"+top+
					"px;width:"+ww+"px;height:"+hh+"px'></div>";
				$("body").append(divhtml);
				$(".cleditorCatcher").hide();
				
				//Event:dragover on catcher's layer
				$("body").on("dragover",".cleditorCatcher",function(e)
				{
					e.preventDefault();
				});
				
				//Event:drop on cacher's layer
				$("body").on("drop",".cleditorCatcher",function(e)
				{
					e.preventDefault();
					e.stopPropagation();
					//get from dataTransfer
					var file=e.originalEvent.dataTransfer.files[0];
					var file_reader = new FileReader();//API
					
					//ater file read
					file_reader.onloadend = function(e){

						// when error occur
						if(file_reader.error) return;
						
						var thisImg=cled.$frame.contents().find("body").append('<img src="'+file_reader.result+'" draggable=true>');
						var currentHtml=cled.$frame.contents().find("body").html();
						cled.$area.val(currentHtml);//writting textarea
						cled.updateTextArea();//update iframe
					}
					file_reader.readAsDataURL(file);
					
					$(".cleditorCatcher").hide();
				});
				
				//Event:dragenter on cleditor area
				$("body").on("dragenter",cled.$main,function(e)
				{
					$(".cleditorCatcher").show();
				});
			});
		}
		
		//refer from 
		//https://ourcodeworld.com/articles/read/491/how-to-retrieve-images-from-the-clipboard-with-javascript-in-the-browser
		function retrieveImageFromClipboardAsBlob(pasteEvent, callback){
			if(pasteEvent.originalEvent.clipboardData == false){
				if(typeof(callback) == "function"){
					callback(undefined);
				}
			};

			var items = pasteEvent.originalEvent.clipboardData.items;

			if(items == undefined){
				if(typeof(callback) == "function"){
					callback(undefined);
				}
			};

			for (var i = 0; i < items.length; i++) {
				// Skip content if not image
				if (items[i].type.indexOf("image") == -1) continue;
				// Retrieve image on clipboard as blob
				var blob = items[i].getAsFile();

				if(typeof(callback) == "function"){
					callback(blob);
				}
			}
		}
	};
	
}(jQuery));
