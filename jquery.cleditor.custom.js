/*!
 CLEditor WYSIWYG HTML Editor v1.4.5
 http://premiumsoftware.net/CLEditor
 requires jQuery v1.4.2 or later
 Copyright 2010, Chris Landowski, Premium Software, LLC
 Dual licensed under the MIT or GPL Version 2 licenses.
*/
//modified by Y.Urita 2018.12.24 localize (Japanese) and more.
/*
 * NOTE: IE(below 10) are NOT suported in this custom.
 * modify ver.A Y.Urita 2018.12.30 The source follows HTML5. The color popup add transparent color.
 * modify ver.B Y.Urita 2019. 1. 1 Integration with jquery.cleditor.image.js, a little improvement.
 * modify ver.C Y.Urita 2019. 1. 2 Integration with jquery.cleditor.textbox.js, a littele improvement.
 * modify ver.D Y.Urita 2019. 1. 4 Integration with jquery.cleditor.table.custom.js,
 *								   Organization selection way of drag-mode to double click. and a littele improvement.
 * modify ver.E Y.Urita 2019. 1. 6 Improvement about borer & background drawing.
 * modify ver.F Y.Urita 2019. 1. 7 Bug fix (Problem not to drag)
 * modify ver.G Y.Urita 2019. 1. 8 Enable to Z-index control , choose to absolute position.
 * modify ver.H Y.Urita 2019. 1. 9 Enable to rotation
 */
 
(function ($) {

    //==============
    // jQuery Plugin
    //==============

    $.cleditor = {

        // Define the defaults used for all new cleditor instances
        defaultOptions: {
            width: 'auto', // width not including margins, borders or padding
            height: 250, // height not including margins, borders or padding
            controls:     // controls to add to the toolbar
                          "bold italic underline strikethrough subscript superscript | font size " +
                          "style | color highlight removeformat | bullets numbering | outdent " +
                          "indent | alignleft center alignright justify | undo redo | " +
                          "rule | textbox | table insertrowcol resizecell | borderstyle background rotation | " +
						  "image link unlink | cut copy paste pastetext | print | perspect bodystyle source",
            colors:       // colors in the color popup
                          "FFF FCC FC9 FF9 FFC 9F9 9FF CFF CCF FCF " +
                          "CCC F66 F96 FF6 FF3 6F9 3FF 6FF 99F F9F " +
                          "BBB F00 F90 FC6 FF0 3F3 6CC 3CF 66C C6C " +
                          "999 C00 F60 FC3 FC0 3C0 0CC 36F 63F C3C " +
                          "666 900 C60 C93 990 090 399 33F 60C 939 " +
                          "333 600 930 963 660 060 366 009 339 636 " +
                          "000 300 630 633 330 030 033 006 309 303",
            fonts:        // font names in the font popup
						  "MS PGothic,ＭＳ Ｐゴシック,Meiryo,Segoe Script,Microsoft Tai Le,メイリオ,"+
                          "Arial,Arial Black,Comic Sans MS,Courier New,Narrow,Garamond," +
                          "Georgia,Impact,Sans Serif,Serif,Tahoma,Trebuchet MS,Verdana",
            sizes:        // sizes in the font size popup
						  "8pt,10pt,12pt,14pt,16pt,24pt,32pt,48pt",
            styles:       // styles in the style popup
                          [["Paragraph", "<p>"], ["Header 1", "<h1>"], ["Header 2", "<h2>"],
                          ["Header 3", "<h3>"], ["Header 4", "<h4>"], ["Header 5", "<h5>"],
                          ["Header 6", "<h6>"]],
            useCSS: true, // use CSS to style HTML when possible (not supported in ie)
            docType:      // Document type contained within the editor
                          '<!DOCTYPE HTML>',
            docCSSFile:   // CSS file used to style the document contained within the editor
                          "",
            bodyStyle:    // style to assign to document body contained within the editor
                          "margin:4px; font:10pt Arial,Verdana; cursor:text",
			position: 'relative' //relative : When you use existed HTML in the middle of document.
							  //		   (If you choose 'absolute', draggable objects locate on left-top of document. 
							  //		   Non-draggable objects as text are left in the middle of document.)
							  //absolute : When you use existed HTML as whole document or in iframe.
        },

        // Define all usable toolbar buttons - the init string property is 
        //   expanded during initialization back into the buttons object and 
        //   separate object properties are created for each button.
        //   e.g. buttons.size.title = "Font Size"
        buttons: {
            // name,title,command,popupName (""=use name)
            init:
			  "bold,太字,bold|" +
			  "italic,斜字,italic|" +
			  "underline,下線,underline|" +
			  "strikethrough,取り消し線,strikethrough|" +
			  "subscript,下付き,subscript|" +
			  "superscript,上付き,superscript|" +
			  "font,フォント,fontname,|" +
			  "size,フォントサイズ,fontsize,|" +
			  "style,見出しスタイル,formatblock,|" +
			  "color,文字色,forecolor,|" +
			  "highlight,ハイライト色,hilitecolor,color|" +
			  "removeformat,書式のクリア,removeformat|" +
			  "bullets,箇条書き,insertunorderedlist|" +
			  "numbering,段落番号,insertorderedlist|" +
			  "outdent,アウトデント,outdent|" +
			  "indent,インデント,indent|" +
			  "alignleft,左揃え,justifyleft|" +
			  "center,中央揃え,justifycenter|" +
			  "alignright,右揃え,justifyright|" +
			  "justify,均等割り付け,justifyfull|" +
			  "undo,元に戻す,undo|" +
			  "redo,やり直し,redo|" +
			  "rule,横罫線の挿入,inserthorizontalrule|" +
			  "textbox,テキストボックスの挿入,inserthtml,color,textbox.gif|" + //replace Japanese to Insert Textbox
			  "table,表の挿入,inserthtml,table,table.gif|" + //replace Japanese to Insert Table
			  "insertrowcol,行と列の挿入,insertrowcol,insertrowcol,insertrowcol.gif|" + //replace Japanese to Insert Rows and Columns
			  "resizecell,セルの幅と高さ,resizecell,resizecell,resizecell.gif|" + //replace Japanese to Resize width and height of cell
			  "borderstyle,枠線のスタイル,borderstyle,borderstyle,borderstyle.gif|" + //replace Japanese to Border style
			  "background,背景のスタイル,background,background,cellcolor.gif|" + //replace Japanese to Border style
			  "rotation,オブジェクトの回転,rotation,rotation,rotation.gif|" + 
			  "image,画像の挿入(リンク),insertimage,url|" +
			  "link,ハイパーリンク,createlink,url|" +
			  "unlink,ハイパーリンクの解除,Remove Hyperlink,|" +
			  "cut,切り取り|" +
			  "copy,コピー|" +
			  "paste,ペースト|" +
			  "pastetext,テキストとして貼り付け,inserthtml,|" +
			  "print,印刷,print,|" +
			  "perspect,配置,perspect,perspect,perspect.gif|" +
			  "bodystyle,BodyのStyleSheet,bodystyle,bodystyle,bodystyle.gif|" +//StyleSheet of Body
			  "source,ソース表示と切り替え" 
        },

        // imagesPath - returns the path to the images folder
        imagesPath: function () { return imagesPath(); }

    };

    // cleditor - creates a new editor for each of the matched textareas
    $.fn.cleditor = function (options) {

        // Create a new jQuery object to hold the results
        var $result = $([]);

        // Loop through all matching textareas and create the editors
        this.each(function (idx, elem) {
            if (elem.tagName.toUpperCase() === "TEXTAREA") {
                var data = $.data(elem, CLEDITOR);
                if (!data) data = new cleditor(elem, options);
                $result = $result.add(data);
            }
        });

        // return the new jQuery object
        return $result;

    };

    //==================
    // Private Variables
    //==================

    var

    // Misc constants
    BACKGROUND_COLOR = "backgroundColor",
    BLURRED = "blurred",
    BUTTON = "button",
    BUTTON_NAME = "buttonName",
    CHANGE = "change",
    CLEDITOR = "cleditor",
    CLICK = "click",
    DISABLED = "disabled",
    DIV_TAG = "<div>",
    FOCUSED = "focused",
    TRANSPARENT = "transparent",
    UNSELECTABLE = "unselectable",

    // Class name constants
    MAIN_CLASS = "cleditorMain",    // main containing div
    TOOLBAR_CLASS = "cleditorToolbar", // toolbar div inside main div
    GROUP_CLASS = "cleditorGroup",   // group divs inside the toolbar div
    BUTTON_CLASS = "cleditorButton",  // button divs inside group div
    DISABLED_CLASS = "cleditorDisabled",// disabled button divs
    DIVIDER_CLASS = "cleditorDivider", // divider divs inside group div
    POPUP_CLASS = "cleditorPopup",   // popup divs inside body
    LIST_CLASS = "cleditorList",    // list popup divs inside body
    COLOR_CLASS = "cleditorColor",   // color popup div inside body
    PROMPT_CLASS = "cleditorPrompt",  // prompt popup divs inside body
    MSG_CLASS = "cleditorMsg",     // message popup div inside body

    // Browser detection
    ua = navigator.userAgent.toLowerCase(),
    iege11 = /(trident)(?:.*rv:([\w.]+))?/.test(ua),
    webkit = /webkit/.test(ua),

    // Test for iPhone/iTouch/iPad
    iOS = /iPhone|iPad|iPod/i.test(ua),

    // Popups are created once as needed and shared by all editor instances
    popups = {},

    // Used to prevent the document click event from being bound more than once
    documentClickAssigned,

    // Local copy of the buttons object
    buttons = $.cleditor.buttons;

	//image setting
	var positionX="",
		positionY="",
		x,
		y,
		isDrag=false,
		draggingFile,
		focusedObj,prevObj,
		zidx=0, //value of z-index
		sizing=$("<div class='cleditorSizing' style='background-color:#ececec;position:absolute;padding:2px'>"+
				"<b style='text-align:center;display:block'>Image resizing</b>"+
				"<label>"+
				"<input type='radio' name='sizing' value='width'>Fit with Width</input>"+
				"</label><br><label>"+
				"<input type='radio' name='sizing' value='height'>Fit with Height</input>"+
				"</label><br><label>"+
				"<input type='radio' name='sizing' value='zoom'>Zoom</input>"+
				"</label>"+
				"<input type='text' name='zoom' style='width:3em'>%<br>"+
				"<label>"+
				"<input type='radio' name='sizing' value='reset'>Reset location</input>"+
				"</label><br>"+
				
				"<input type='button' value='Apply' class='butApply'>"+ 
				"<input type='button' value='Cancel' class='butCancel'>"+ 
				"<input type='button' value='close' class='butClose'>"+ 
				"</div>");
	
    //===============
    // Initialization
    //===============

    // Expand the buttons.init string back into the buttons object
    //   and create seperate object properties for each button.
    //   e.g. buttons.size.title = "Font Size"
	var inc=0;//addintion
    $.each(buttons.init.split("|"), function (idx, button) {
        var items = button.split(","), name = items[0];
        buttons[name] = {
            stripIndex: items[4]===undefined ? inc++ : "",//change
            name: name,
            title: items[1] === "" ? name.charAt(0).toUpperCase() + name.substr(1) : items[1],
            command: items[2] === "" ? name : items[2],
            popupName: items[3] === "" ? name : items[3],
			image: items[4] === undefined ? undefined : items[4] //addition for icon image file
        };

    });
    delete buttons.init;

    //============
    // Constructor
    //============

    // cleditor - creates a new editor for the passed in textarea element
    cleditor = function (area, options) {

        var editor = this;

        // Get the defaults and override with options
        editor.options = options = $.extend({}, $.cleditor.defaultOptions, options);

        // Hide the textarea and associate it with this editor
        var $area = editor.$area = $(area)
            .css({ border: "none", margin: 0, padding: 0 }) // Needed for IE6 & 7 (won't work in CSS file)
            .hide()
            .data(CLEDITOR, editor)
            .blur(function () {
                // Update the iframe when the textarea loses focus
                updateFrame(editor, true);
            });

        // Create the main container
        var $main = editor.$main = $(DIV_TAG)
            .addClass(MAIN_CLASS)
            .width(options.width)
            .height(options.height);

        // Create the toolbar
        var $toolbar = editor.$toolbar = $(DIV_TAG)
            .addClass(TOOLBAR_CLASS)
            .appendTo($main);

        // Add the first group to the toolbar
        var $group = $(DIV_TAG)
            .addClass(GROUP_CLASS)
            .appendTo($toolbar);

        // Initialize the group width
        var groupWidth = 0;

        // Add the buttons to the toolbar
        $.each(options.controls.split(" "), function (idx, buttonName) {
            if (buttonName === "") return true;

            // Divider
            if (buttonName === "|") {

                // Add a new divider to the group
                var $div = $(DIV_TAG)
                    .addClass(DIVIDER_CLASS)
                    .appendTo($group);

                // Update the group width
                $group.width(groupWidth + 1);
                groupWidth = 0;

                // Create a new group
                $group = $(DIV_TAG)
                    .addClass(GROUP_CLASS)
                    .appendTo($toolbar);

            }

            // Button
            else {

                // Get the button definition
                var button = buttons[buttonName];

                // Add a new button to the group
                var $buttonDiv = $(DIV_TAG)
                    .data(BUTTON_NAME, button.name)
                    .addClass(BUTTON_CLASS)
                    .attr("title", button.title)
                    .on(CLICK, $.proxy(buttonClick, editor))
                    .appendTo($group)
                    .hover(hoverEnter, hoverLeave);
				
                // Update the group width
                groupWidth += 24;
                $group.width(groupWidth + 1);

                // Prepare the button image
                var map = {};
                if (button.css) map = button.css;
                else if (button.image) map.backgroundImage = imageUrl(button.image);
				if (button.stripIndex ) map.backgroundPosition = button.stripIndex * -24 ;
				$buttonDiv.css(map);

                 // Create the popup
                if (button.popupName)
                    createPopup(button.popupName, options, button.popupClass,
                      button.popupContent, button.popupHover);

            }

        });

        // Add the main div to the DOM and append the textarea
        $main.insertBefore($area)
            .append($area);

        // Bind the document click event handler
        if (!documentClickAssigned) {
            $(document).click(function (e) {
                // Dismiss all non-prompt popups
                var $target = $(e.target);
                if (!$target.add($target.parents()).is("." + PROMPT_CLASS))
                    hidePopups();
            });
            documentClickAssigned = true;
        }

        // Bind the window resize event when the width or height is auto or %
        if (/auto|%/.test("" + options.width + options.height))
            $(window).on("resize.cleditor", function () { refresh(editor); });

        // Create the iframe and resize the controls
        refresh(editor);
		
		// Add the image setting 
		$main.append(sizing);
		$(sizing).hide();
		imageToolbox(editor);

		//observe focus 
		editor.$frame.contents()
			.off("click")
			.on("click",$("body").children(),function(e)
			{
				
				if($(e.target).is("body") || $(e.taget).is("html") || $(e.target).is(document))return false;
				prevObj=focusedObj;
				focusedObj=e.target;
			});
    };

    //===============
    // Public Methods
    //===============

    var fn = cleditor.prototype,

    // Expose the following private functions as methods on the cleditor object.
    // The closure compiler will rename the private functions. However, the
    // exposed method names on the cleditor object will remain fixed.
    methods = [
        ["clear", clear],
        ["disable", disable],
        ["execCommand", execCommand],
        ["focus", focus],
		["focused", focused],
        ["hidePopups", hidePopups],
        ["sourceMode", sourceMode, true],
        ["refresh", refresh],
        ["select", select],
        ["selectedHTML", selectedHTML, true],
        ["selectedText", selectedText, true],
        ["showMessage", showMessage],
        ["updateFrame", updateFrame],
        ["updateTextArea", updateTextArea]
    ];

    $.each(methods, function (idx, method) {
        fn[method[0]] = function () {
            var editor = this, args = [editor];
            // using each here would cast booleans into objects!
            for (var x = 0; x < arguments.length; x++) { args.push(arguments[x]); }
            var result = method[1].apply(editor, args);
            if (method[2]) return result;
            return editor;
        };
    });

    // blurred - shortcut for .bind("blurred", handler) or .trigger("blurred")
    fn.blurred = function (handler) {
        var $this = $(this);
        return handler ? $this.on(BLURRED, handler) : $this.trigger(BLURRED);
    };

    // change - shortcut for .bind("change", handler) or .trigger("change")
    fn.change = function change(handler) {
        var $this = $(this);
        return handler ? $this.on(CHANGE, handler) : $this.trigger(CHANGE);
    };

    // focused - shortcut for .bind("focused", handler) or .trigger("focused")
    fn.focused = function (handler) {
        var $this = $(this);
        return handler ? $this.on(FOCUSED, handler) : $this.trigger(FOCUSED);
    };

    //===============
    // Event Handlers
    //===============

    // buttonClick - click event handler for toolbar buttons
    function buttonClick(e) {

        var editor = this,
            buttonDiv = e.target,
            buttonName = $.data(buttonDiv, BUTTON_NAME),
            button = buttons[buttonName],
            popupName = button.popupName,
            popup = popups[popupName];

        // Check if disabled
        if (editor.disabled || $(buttonDiv).attr(DISABLED) === DISABLED)
            return;

        // Fire the buttonClick event
        var data = {
            editor: editor,
            button: buttonDiv,
            buttonName: buttonName,
            popup: popup,
            popupName: popupName,
            command: button.command,
            useCSS: editor.options.useCSS
        };

        if (button.buttonClick && button.buttonClick(e, data) === false)
            return false;

        // Toggle source
        if (buttonName === "source") {
            
            // Show the iframe
            if (sourceMode(editor)) {
                delete editor.range;
                editor.$area.hide();
                editor.$frame.show();
                buttonDiv.title = button.title;
            }

            // Show the textarea
            else {
                editor.$frame.hide();
                editor.$area.show();
				editor.$main.find(".cleditorSizing").hide();
                buttonDiv.title =  "リッチテキストに切り替え";//"Show Rich Text";
            }

        }

        // Check for rich text mode
        else if (!sourceMode(editor)) {

            // Handle popups
            if (popupName) {
                var $popup = $(popup);

                // URL
                if (popupName === "url") {

                    // Check for selection before showing the link url popup
                    if (buttonName === "link" && selectedText(editor) === "") {
                        showMessage(editor, "A selection is required when inserting a link.", buttonDiv);
                        return false;
                    }

                    // Wire up the submit button click event handler
                    $popup.children(":button")
                        .off(CLICK)
                        .on(CLICK, function () {

                            // Insert the image or link if a url was entered
                            var $text = $popup.find(":text"),
                                url = $.trim($text.val());
                            if (url !== "")
                                execCommand(editor, data.command, url, null, data.button);

                            // Reset the text, hide the popup and set focus
                            $text.val("http://");
                            hidePopups();
                            focus(editor);

                        });

                }

                // Paste as Text
                else if (popupName === "pastetext") {

                    // Wire up the submit button click event handler
                    $popup.children(":button")
                        .off(CLICK)
                        .on(CLICK, function () {

                            // Insert the unformatted text replacing new lines with break tags
                            var $textarea = $popup.find("textarea"),
                                text = $textarea.val().replace(/\n/g, "<br />&#10;");
                            if (text !== "")
                                execCommand(editor, data.command, text, null, data.button);

                            // Reset the text, hide the popup and set focus
                            $textarea.val("");
                            hidePopups();
                            focus(editor);

                        });

                }

				//insert textbox
				else if(buttonName === "textbox"){

					// Wire up the submit button click event handler
                    $popup.children("div")
                        .off(CLICK)
                        .on(CLICK, function (e) {
						// Build the html
						var frameBody=editor.$frame.contents().find("body"),
							scrTop=$(frameBody).scrollTop(),
							value = $(e.target).css("background-color"),
							html = "<textarea style='position:"+editor.options.position+";top:"+scrTop
									+"px;left:0px;width:100px;height:20px;background-color:"
									+value+";'></textarea>&#10;";
						
						// Insert the html
						if (html)
						{	
							execCommand(editor,data.command,html,null,data.button);
						}

						var frameBody=editor.$frame.contents().find("body");
					
						//mouse down event
						$(frameBody).on("dblclick","textarea",function(e)
						{
							Mousedown(e,editor,"textarea");
							
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
						});
						hidePopups();
                        focus(editor);
						return false;
					});
				}

				//insert table
				else if(buttonName === "table")
				{	
					
					$(popup).children(":button")
						.off("click")
						.on("click",function(e) {

						// Get the column and row count
						var $text = $(popup).find(":text"),
							cols = parseInt($text[0].value),
							rows = parseInt($text[1].value);

						// Build the html
						var html;
						if (cols > 0 && rows > 0) {
							html="&#10;<table style='border-collapse:collapse;border:1px solid black;"
									+"background-color:white;position:"+editor.options.position+";top:0px;left:0px'>&#10;";
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
						{	
							execCommand(editor,data.command,html,null,data.button);

						}

						///to dragable
						var x,y,ix="",iy="",divX,divY,eX,eY;
						
						var isDrag=false;
						var obj;
						//mouse down event
						var frameBody=editor.$frame.contents().find("body");
						$(frameBody).off("dblclick").on("dblclick","table",tdown);

						//fire when mouse down
						function tdown(e) {
							isDrag=true;
							if(ix=="" || iy=="" )
							{
								obj=$(e.target).is("table") ? e.target : $(e.target).closest("table");
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
								$(e.target).css({"top":e.pageY - y + divY +"px","left":e.pageX - x  + divX + "px"});
								eX=e.pageX;
								eY=e.pageY;
								
								//mouse up or mouse leave event
								$(e.target).on("mouseup",tup);
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
								$(e.target).off("mouseup",tup);
								isDrag=false;
								$(obj).css({"left":eX-x+ix+"px","top":eY-y+iy+"px"});
								
								ix=iy="";
								setTimeout(function(){
									$(frameBody).find(".divTable").remove();
									
									editor.updateTextArea();//update iframe
									focusedObj=prevObj=$(obj);
								},10);
							}
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
						return false;
					});
				}
				
				//insert rows and columns in table
				else if (buttonName === "insertrowcol")
				{
					$(popup).children(":button")
						.off("click")
						.on("click",function(e) {
							// Get insert position
							var radi=$(popup).find("input[name='insertFR']:checked");
							
							// Get the column and row count
							var $text = $(popup).find(":text"),
								cols = parseInt($text[0].value),
								rows = parseInt($text[1].value);
							
							//Click event
							var frameBody=editor.$frame.contents().find("body");
							editor.$frame.contents().on("click",function(e)
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
								editor.$frame.contents().off("click");
							});
							// Reset the text
							$text.val("0");
							editor.hidePopups();
							editor.focus();
							return false;
						});
				}
				
				//resize cell
				else if (buttonName === "resizecell")
				{
					$(popup).children(":button")
						.off("click")
						.on("click",function(e) {
							// Get the column and row count
							var $text = $(popup).find(":text"),
								wid = parseInt($text[0].value),
								hei = parseInt($text[1].value);
							
							//Click event
							
							editor.$frame.contents().on("click",function(e)
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
										$(e.target).css("height",hei+"px");
										editor.updateTextArea();//update iframe
									}
									
								}
								//off event -- cancel when click except table (include td)
								editor.$frame.contents().off("click");
							});
							
							// Reset the text
							$text.val("0");	
							editor.hidePopups();
							editor.focus();
							return false;
						});
				}

				//border style
				else if (buttonName === "borderstyle")
				{
					var borderColor,bdColor,bdImage,
						cbs = $(popup).find(".appobj");
						
					$(popup).find(".colorpicker")
						.off("click")
						.on("click",function(e){

						var rgbColor=$(e.target).css("background-color")!="transparent" ?
										$(e.target).css("background-color") : "0,0,0,0";
						borderColor=$(popup).find(".bordersample").css("border-color");
						var rgb=rgbColor.replace("rgb(","").replace("rgba(","").replace(")","").split(",");
						
						$(popup).find(".rgbaColor.r").val(parseInt(rgb[0]));
						$(popup).find(".rgbaColor.g").val(parseInt(rgb[1]));
						$(popup).find(".rgbaColor.b").val(parseInt(rgb[2]));
						$(popup).find(".rgbaColor.a").val(rgb.length!=3 ? 0 : 1 );
						bdColor="rgba("+rgb[0]+","+rgb[1]+","+rgb[2]+","+ (rgb.length!=3 ? 0 : 1)+")";
						
						$(popup).find(".samplecolor").css("background-color",bdColor);				

						// Get the which positions are change
						var cb = $(popup).find("input[type=checkbox]");
						
						//switch background color visibility by checkbox
						if($(cb[0]).prop("checked")==true)
						{
							$(popup).find(".bordersample").css("border-color",bdColor);
						}
						else
						{
							$(popup).find(".bordersample").css("border-color","");
						}
						
					});

					//drag and drop
					dndImage(".sampleimage",".bordersample",popup);//sampleimage
					
					//on change RGBA number
					$(popup).find(".rgbaColor")
						.on("change input paste", function (e) {
							bdColor="rgba("+$(popup).find(".rgbaColor.r").val()+","+$(popup).find(".rgbaColor.g").val()
									+","+$(popup).find(".rgbaColor.b").val()+","+$(popup).find(".rgbaColor.a").val()+")";
						
							$(popup).find(".samplecolor").css("background-color",bdColor);
							
							if($(cbs[0]).prop("checked")==true)
								$(popup).find(".bordersample").css("border-color",bdColor);
						});
						
					//on change Select tag
					$(popup).find(".border")
						.on("change",function(e){
							// Get the which positions are ON
							var cb = $(popup).find("input[type=checkbox]");
							
							//color
							for(var i=0;i<4;i++)
							{
								if($(cbs[0]).prop("checked")==true)
								{
									$(popup).find(".bordersample").css("border-"+$(cb[i]).val()+"-style",$(popup).find(".border.Style").val());
									$(popup).find(".bordersample").css("border-"+$(cb[i]).val()+"-width",$(popup).find(".border.Width").val());
								}
								else
								{
									$(popup).find(".bordersample").css("border-"+$(cb[i]).val()+"-style","");
									$(popup).find(".bordersample").css("border-"+$(cb[i]).val()+"-width","");
								}
							}
						});
						
					//on change Check Box 
					$(popup)
						.on("change","input[type=checkbox]", function (e) {
							// Get the which positions are change
							var cb=$(popup).find("input[type=checkbox]");
							
							//switch background color or image visibility by checkbox
							
							for(var i=0;i<4;i++){
								//color
								if($(cbs[0]).prop("checked")==true)
								{
									$(popup).find(".bordersample").css("border-image","");
									$(popup).find(".bordersample").css("border-"+$(cb[i]).val()+"-color",bdColor);
								}
								else
								{
									$(popup).find(".bordersample").css("border-"+$(cb[i]).val()+"-color","");
								}
								
								//image
								if($(cbs[1]).prop("checked")==true)
								{
									$(popup).find(".bordersample").css("border-image-source","url('"+imageObj+"')");
								}
								else
								{
									$(popup).find(".bordersample").css("border-image-source","");
								}
							}
						});
					
					//on change check Box of image type 
					$(popup)
						.on("change input","input[type=radio],.imageOptions", function (e) {
							if($(cbs[1]).prop("checked")==true)
							{
								//check selection with URL or Gradient
								if($(popup).find("input[type=radio]:checked").val()=="url" 
									&& $(popup).find(".sampleimage").css("background-image").indexOf("url(")!=-1
									&& $(cbs[1]).prop("checked")==true)
								{//URL
									$(popup).find(".bordersample").css("border-image","");
									$(popup).find(".bordersample").css("border-image-source",
										$(popup).find(".sampleimage").css("background-image"));
									$(popup).find(".bordersample").css("border-image-slice",
										$(popup).find(".imageOptions[name='slice']").val());
									$(popup).find(".bordersample").css("border-image-width",
										$(popup).find(".imageOptions[name='width']").val());
									$(popup).find(".bordersample").css("border-image-outset",
										$(popup).find(".imageOptions[name='outset']").val());
									$(popup).find(".bordersample").css("border-image-repeat",
										$(popup).find(".imageOptions[name='repeat']").val());
								}
								else if($(cbs[1]).prop("checked")==true)
								{//Gradient
									$(popup).find(".bordersample").css("border-image-source","");
									$(popup).find(".bordersample").css("border-image",
										($(popup).find(".imageOptions[name='repeat']").val()=="repeat" ?
											"repeating-linear-gradient(" : "linear-gradient(") +
										$(popup).find(".imageOptions[name='angle']").val() + "deg," +
										$(popup).find(".imageOptions[name='colors']").val() +")");
										
									$(popup).find(".bordersample").css("border-image-slice",
										$(popup).find(".imageOptions[name='slice']").val());
									$(popup).find(".bordersample").css("border-image-width",
										$(popup).find(".imageOptions[name='width']").val());
									$(popup).find(".bordersample").css("border-image-outset",
										$(popup).find(".imageOptions[name='outset']").val());
									$(popup).find(".bordersample").css("border-image-repeat",
										$(popup).find(".imageOptions[name='repeat']").val());
								}
							}
						});
							
					// Wire up the submit button click event handler
					$(popup).children(":button")
						.off("click")
						.on("click", function (e) {

							// Get the which positions are change
							var cb = $(popup).find("input[type=checkbox]"),
								sl = $(popup).find("select");
							bdColor=$(popup).find(".bordersample").css("border-color");
							
							if(iege11 && bdColor=="")
							{
								bdColor="rgba("+$(popup).find(".rgbaColor.r").val()+","+$(popup).find(".rgbaColor.g").val()+","
										+$(popup).find(".rgbaColor.b").val()+","+$(popup).find(".rgbaColor.a").val()+")";
							}
							editor.$frame.contents().on("click",function(e)
							{
								if($(e.target).is("td") || $(e.target).is("hr") 
								|| $(e.target).is("img") || $(e.target).is("textarea") || $(e.target).is("input"))
								{
									//color:top,right,bottom,left
									$(cb).each(function(idx,item)
									{
										if($(item).prop("checked")==true && idx<4)
										{
											//color
											if($(cbs[0]).prop("checked")==true)
											{
												$(e.target).css("border-image","");
												$(e.target).css("border-"+$(cb[idx]).val()+"-color",bdColor);
												$(e.target).css("border-"+$(cb[idx]).val()+"-style",$(popup).find(".border.Style").val());
												$(e.target).css("border-"+$(cb[idx]).val()+"-width",$(popup).find(".border.Width").val());
											}
											else
											{
												$(e.target).css($(cb[idx]).val(),"");
											}
										}
									});	
									
									//image
									if($(popup).find("input[type=radio]:checked").val()=="url" 
										&& $(popup).find(".sampleimage").css("background-image").indexOf("url(")!=-1
										&& $(cbs[1]).prop("checked")==true)
									{//url
										$(e.target).css("border-image","");
										$(e.target).css("border-image-source",
											$(popup).find(".sampleimage").css("background-image"));
										$(e.target).css("border-image-slice",
											$(popup).find(".imageOptions[name='slice']").val());
										$(e.target).css("border-image-width",
											$(popup).find(".imageOptions[name='width']").val());
										$(e.target).css("border-image-outset",
											$(popup).find(".imageOptions[name='outset']").val());
										$(e.target).css("border-image-repeat",
											$(popup).find(".imageOptions[name='repeat']").val());
									}
									else if($(cbs[1]).prop("checked")==true)
									{//gradient
										$(e.target).css("border-image-source","");
										$(e.target).css("border-image",
											($(popup).find("input[name='repeat']:selected").val()=="repeat" ?
												"repeating-linear-gradient(" : "linear-gradient(") +
											$(popup).find(".imageOptions[name='angle']").val() + "deg," +
											$(popup).find(".imageOptions[name='colors']").val() +")");
											
										$(e.target).css("border-image-slice",
											$(popup).find(".imageOptions[name='slice']").val());
										$(e.target).css("border-image-width",
											$(popup).find(".imageOptions[name='width']").val());
										$(e.target).css("border-image-outset",
											$(popup).find(".imageOptions[name='outset']").val());
										$(e.target).css("border-image-repeat",
											$(popup).find("input[name='repeat']:selected").val());
									}

									editor.updateTextArea();//update iframe
								}
								//off event -- cancel when click except table (include td,hr,img)
								editor.$frame.contents().off("click");
							});
							editor.hidePopups();
							editor.focus();
							return false;
						});
				}

				//Changes background image and color
				else if (buttonName === "background")
				{
					var imageObj,bgColor,
						cbs = $(popup).find(".appobj");	
					
					//Get clicked color code 
					$(popup).find(".colorpicker")
						.off("click")
						.on("click", function (e) {

							//Get the background-color from color picker
							var rgbColor=$(e.target).css("background-color")!="transparent" ?
											$(e.target).css("background-color") : "0,0,0,0";
							bgColor=$(popup).find(".samplecolor").css("background-color");
							var rgb=rgbColor.replace("rgb(","").replace("rgba(","").replace(")","").split(",");
							
							$(popup).find(".rgbaColor.r").val(parseInt(rgb[0]));
							$(popup).find(".rgbaColor.g").val(parseInt(rgb[1]));
							$(popup).find(".rgbaColor.b").val(parseInt(rgb[2]));
							$(popup).find(".rgbaColor.a").val(rgb.length!=3 ? 0 : 1 );
							bgColor="rgba("+rgb[0]+","+rgb[1]+","+rgb[2]+","+ (rgb.length!=3 ? 0 : 1)+")";
							
							$(popup).find(".samplecolor").css("background-color",bgColor);
							
							// Get the which positions are change
							var cb = $(popup).find("input[type=checkbox]");
							
							//switch background color visibility by checkbox
							if($(cb[0]).prop("checked")==true)
							{
								$(popup).find(".syncBackground").css("background-color",bgColor);
							}
							else
							{
								$(popup).find(".syncBackground").css("background-color","");
							}
						});
						
					//drag and drop
					dndImage(".sampleimage",".syncBackground",$(popup));
					
					//on change RGBA number
					$(popup).find(".rgbaColor")
						.on("change", function (e) {
								bgColor="rgba("+$(popup).find(".rgbaColor.r").val()+","+$(popup).find(".rgbaColor.g").val()
										+","+$(popup).find(".rgbaColor.b").val()+","+$(popup).find(".rgbaColor.a").val()+")";
							
								$(popup).find(".samplecolor").css("background-color",bgColor);
							});
					
					//on change Check Box 
					$(popup)
						.on("change","input[type=checkbox]", function (e) {
								// Get the which positions are change
								
								//switch background color or image visibility by checkbox
								if($(cbs[0]).prop("checked")==true)
								{
									$(popup).find(".syncBackground").css("background-color",bgColor);
								}
								else
								{
									$(popup).find(".syncBackground").css("background-color","");
								}
								
								if($(cbs[1]).prop("checked")==true)
								{
									$(popup).find(".syncBackground").css("background-image","url('"+imageObj+"')");
								}
								else
								{
									$(popup).find(".syncBackground").css("background-image","");
								}
							});
							
					//on change check Box of image type 
					$(popup)
						.on("change input","input[type=radio],.imageOptions", function (e) {
								
							var imageOptions=$(popup).find(".imageOptions[name='repeat']");	
								//check selection with URL or Gradient
								if($(popup).find("input[type=radio]:checked").val()=="url" 
									&& $(popup).find(".sampleimage").css("background-image").indexOf("url(")!=-1
									&& $(cbs[1]).prop("checked")==true)
								{//url
									$(popup).find(".syncBackground").css("background","");
									$(popup).find(".syncBackground").css("background-image",
										$(popup).find(".sampleimage").css("background-image"));
									if($(imageOptions).val()=="cover" || $(imageOptions).val()=="contain")
									{
										$(popup).find(".syncBackground").css("background-size",
											$(imageOptions).val());
									}
									else
									{
										$(popup).find(".syncBackground").css("background-repeat",
											$(imageOptions).val());
									}
								}
								else if($(cbs[1]).prop("checked")==true)
								{//gradient
									$(popup).find(".syncBackground").css("background-image","");
									$(popup).find(".syncBackground").css("background",
										($(popup).find(".imageOptions[name='repeat']").val()=="repeat" ?
											"repeating-linear-gradient(" : "linear-gradient(") +
										$(popup).find(".imageOptions[name='angle']").val() + "deg," +
										$(popup).find(".imageOptions[name='colors']").val() +")");
								}
							});
							
					//Submit
					$(popup).find("input[type='button']") //children(":button")
						.off("click")
						.on("click", function (e) {
							bgColor="rgba("+$(popup).find(".rgbaColor.r").val()+","+$(popup).find(".rgbaColor.g").val()+","
									+$(popup).find(".rgbaColor.b").val()+","+$(popup).find(".rgbaColor.a").val()+")";
							
							//forced fire when button was 'Apply to body'
							if($(e.target).prop("class")==".toBody")
							{
								drawBackground(editor.$frame.contents().find("body"));
							}
							
							//Apply the image to cell
							editor.$frame.contents().on("click",function(e)
							{
								drawBackground(e.target);
							});
							
							//common draw procedure
							function drawBackground(target)
							{
								if($(target).is("td") || $(target).is("hr") || $(target).is("body")
								|| $(target).is("img") || $(target).is("textarea") || $(target).is("input"))
								{	
									if($(cbs[0]).prop("checked")==true)
									{
										$(target).css("background","");
										$(target).css("background-color",bgColor);
									}	
									
									var imageOptions=$(popup).find(".imageOptions[name='repeat']");	
									
									if($(popup).find("input[type=radio]:checked").val()=="url" 
										&& $(popup).find(".sampleimage").css("background-image").indexOf("url(")!=-1
										&& $(cbs[1]).prop("checked")==true)
									{//url
										$(target).css("background","");
										$(target).css("background-image",
											$(popup).find(".sampleimage").css("background-image"));
										if($(imageOptions).val()=="cover" || $(imageOptions).val()=="contain")
											$(target).css("background-size",$(imageOptions).val());
										else
											$(target).css("background-repeat",$(imageOptions).val());
									}
									else if($(cbs[1]).prop("checked")==true)
									{//gradient
										$(target).css("background-image","");
										$(target).css("background",
											($(popup).find(".imageOptions[name='repeat']").val()=="repeat" ?
												"repeating-linear-gradient(" : "linear-gradient(") +
											$(popup).find(".imageOptions[name='angle']").val() + "deg," +
											$(popup).find(".imageOptions[name='colors']").val() +")");

									}
									editor.updateTextArea();//update iframe
								}
								
								
								//off event -- cancel when click except table (include td)
								editor.$frame.contents().off("click");
							}
							
							editor.hidePopups();
							editor.focus();
							return false;
						});
				}
				
				//rotation
				else if (buttonName === "rotation")
				{
					var target="",defX,defY,defD;
					//target=focusedObj;// ? focusedObj : prevObj;
						if($(focusedObj)!="" && $(focusedObj)!=undefined)
							{
								console.log($(focusedObj).prop("nodeName"),$(focusedObj).prev().prop("nodeName"));
								if($(focusedObj).is("td") || $(focusedObj).is("th"))
									focusedObj=$(focusedObj).closest("table");
								var tempPos=($(focusedObj).css("transform-origin")).split(" "),
									tempD=$(focusedObj).css("transform");
								defX=parseInt(tempPos[0]);
								defY=parseInt(tempPos[1]);
								var tempH=$(focusedObj).outerHeight(),
									tempW=$(focusedObj).outerWidth();
								$(popup).find(".XPosition:nth-child("+(parseInt(defX/tempW*2)+1)+")").prop("selected",true);
								$(popup).find(".YPosition:nth-child("+(parseInt(defY/tempH*2)+1)+")").prop("selected",true);
								if(tempD=="none")
								{
									defD=0;
								}
								else
								{
									tempD=tempD.replace("matrix(","");
									var aryD=tempD.split(",");
									defD=Math.atan2(parseFloat(aryD[1]),parseFloat(aryD[0]))*180/Math.PI;
								}
								$(popup).find(".deg").val(defD);
							}
					$(popup)
						.on("change input",".deg,.XPosition,.YPosition",function(e)
						{
							if($(focusedObj)!="" && $(focusedObj)!=undefined &&	!$(focusedObj).is("html") )
							{	
								var x=$(popup).find(".XPosition").val(),
									y=$(popup).find(".YPosition").val(),
									deg=$(popup).find(".deg").val();
								$(focusedObj).css({"transform-origin":x+" "+y,
									"transform":"rotate("+deg+"deg)"});
							}
							else
							{
								alert("Select object");
							}
						});
					$(popup).find("input[type='button']")
						.off("click")
						.on("click",function(e) {
							if($(e.target).attr("class")!="apply")
							{
								$(focusedObj).css({"transform-origin":defX+" "+defY,
									"transform":"rotate("+defD+"deg)"});
								editor.updateTextArea();//update iframe
							}
							editor.hidePopups();
							editor.focus();
							return false;
						});
				}
				
				//perspect
				else if (buttonName === "perspect")
				{
					$(popup).find(":button")
						.off("click")
						.on("click",function(e) {
							var perspect=$(e.target).attr("class");
							
							//Apply
							editor.$frame.contents().on("click",function(e)
							{
								perspective(e.target,perspect);
							});
							
							editor.hidePopups();
							editor.focus();
							return false;
						});
						
					//perspective control
					function perspective(target,perspect)
					{
						var children=editor.$frame.contents().find("body").children(),
							maxid;
						zidx=0;
						$(children).each(function(idx,item)
						{
							if($(item).css("z-index")!="auto")
							{
								if(zidx <= parseInt($(item).css("z-index")))
								{
									zidx=parseInt($(item).css("z-index"));
									maxid=idx;
								}
							}
							else
							{
								$(item).css("z-index",$(children).index(item));
								if(zidx < parseInt($(children).index(item)))
								{
									zidx=parseInt($(children).index(item));
									maxid=idx;
								}
							}
						});
						if(perspect =="toFront")
						{
							var z=parseInt($(target).css("z-index"));
							var dz= (zidx - z) < 0 ? 0 : zidx -z ;
							var pair=maxid;	
							//check if same value as z was existed
							if(dz!=0)
							{
								$(children).each(function(idx,item)
								{
									if(idx != $(children).index(target))
									{
										var c = parseInt($(item).css("z-index"));
										if(dz>c-z && c-z > 0)
										{
											dz=c-z;
											pair=idx;
										}
									}
								});
								//convert
								$(target).css("z-index",z+dz);
								$($(children).get(pair)).css("z-index",z);
							}
						}
						else if(perspect == "toBack")
						{
							var z=parseInt($(target).css("z-index"));
							var dz= z,
								pair=parseInt($(children).index(target));
								
							//check if same value as z was existed
							if(dz>0)
							{
								$(children).each(function(idx,item)
								{
									if(idx != $(children).index(target))
									{
										var c = parseInt($(item).css("z-index"));
										if(dz>=z-c && z-c >= 0)
										{
											dz=z-c;
											pair=idx;
											console.log(z,c,idx);
										}
									}
								});
								//convert
								$(target).css("z-index",z - dz);
								$($(children).get(pair)).css("z-index",z);
							}
						}
						else if(perspect == "toMostFront")
						{
							zidx++;
							$(target).css("z-index",zidx);
						}
						else if(perspect == "toMostBack")
						{
							$(target).css("z-index",0);
							
							$(children).each(function(idx,item)
							{
								if(idx != $(children).index(target))
								{
									var zz=parseInt($(item).css("z-index"));
									zz++;
									$(item).css("z-index",zz);
								}
							});
						}
						editor.updateTextArea();//update iframe
						editor.$frame.contents().off("click");
					}
				}
				
				//body style
				else if (buttonName === "bodystyle")
				{
					//insert style of body
					$(popup).find("textarea").val(editor.$frame.contents().find("body").attr("style"));
					//Submit
					$(popup).find("input[type='button']") //children(":button")
						.off("click")
						.on("click", function (e) {
							editor.hidePopups();
							editor.focus();
							return false;				
						});
				}

                // Show the popup if not already showing for this button
                if (buttonDiv !== $.data(popup, BUTTON)) {
                    showPopup(editor, popup, buttonDiv);
                    return false; // stop propagination to document click
                }

                // propaginate to document click
                return;

            }
			
			
            // Print
            else if (buttonName === "print")
                editor.$frame[0].contentWindow.print();

            // All other buttons
            else if (!execCommand(editor, data.command, data.value, data.useCSS, buttonDiv))
                return false;

        }

        // Focus the editor
        focus(editor);

    }

    // hoverEnter - mouseenter event handler for buttons and popup items
    function hoverEnter(e) {
        var $div = $(e.target).closest("div");
        $div.css(BACKGROUND_COLOR, $div.data(BUTTON_NAME) ? "#FFF" : "#FFC");
    }

    // hoverLeave - mouseleave event handler for buttons and popup items
    function hoverLeave(e) {
        $(e.target).closest("div").css(BACKGROUND_COLOR, "transparent");
    }

    // popupClick - click event handler for popup items
    function popupClick(e) {

        var editor = this,
            popup = e.data.popup,
            target = e.target;
	
        // Check for message and prompt popups
        if (popup === popups.msg || $(popup).hasClass(PROMPT_CLASS))
            return;
		
        // Get the button info
        var buttonDiv = $.data(popup, BUTTON),
            buttonName = $.data(buttonDiv, BUTTON_NAME),
            button = buttons[buttonName],
            command = button.command,
            value,
            useCSS = editor.options.useCSS;

        // Get the command value
        if (buttonName === "font")
            // Opera returns the fontfamily wrapped in quotes
            value = target.style.fontFamily.replace(/"/g, "");
        else if (buttonName === "size") {
            if (target.tagName.toUpperCase() === "DIV")
                target = target.children[0];
            value = target.innerHTML;
        }
        else if (buttonName === "style")
            value = "<" + target.tagName + ">";
        else if (buttonName === "color")
            value = hex(target.style.backgroundColor);
        else if (buttonName === "highlight") {
            value = hex(target.style.backgroundColor);
            //if (ie) command = 'backcolor';
            //else useCSS = true;
            useCSS = true;
        }

        // Fire the popupClick event
        var data = {
            editor: editor,
            button: buttonDiv,
            buttonName: buttonName,
            popup: popup,
            popupName: button.popupName,
            command: command,
            value: value,
            useCSS: useCSS
        };
	
        if (button.popupClick && button.popupClick(e, data) === false)
			return;
        // Execute the command
        else if (data.command && !execCommand(editor, data.command, data.value, data.useCSS, buttonDiv))
			return false;

        // Hide the popup and focus the editor
        hidePopups();
        focus(editor);
		
    }
	
	//
	//for draggable resize window
	//

	//fire when mouse down
	function mdown(e,editor) {
		//get position
		var imgSizing=$(editor.$main).find(".cleditorSizing");

		x = e.pageX - $(imgSizing).get(0).offsetLeft;
		y = e.pageY - $(imgSizing).get(0).offsetTop;
		
		//move event
		$(editor.$main).off("mousemove").on("mousemove",imgSizing,function(e){mmove(e,editor)});
	}
	
	//fire when mouse move
	function mmove(e,editor) {
		//prevent default event
		e.preventDefault();
		
		var imgSizing=$(editor.$main).find(".cleditorSizing");
		//trace mouse
		$(imgSizing).css({"top":e.pageY - y + "px","left":e.pageX - x + "px"});
		
		//mouse up or mouse leave event
		$(editor.$main).off("mouseup").on("mouseup",imgSizing,function(e){mup(e,editor)});
		$(editor.$main).off("mouseleave").on("mouseleave",imgSizing,function(e){mup(e,editor)});
	}
	
	//fire when mouse up
	function mup(e,editor) {
		//remove event handler
		$(editor.$main).off("mousemove");
		$(editor.$main).off("mouseleave");
		$(editor.$main).off("mouseup");
	}
	
	//fire when mouse down
	function Mousedown(e,editor,target) {
		isDrag=true;
		var frameDocument=editor.$frame.contents().find("body");

		if(positionX=="" && positionY=="")
		{
			//get position
			positionX=$(e.target).css("left")!="auto" ? parseFloat($(e.target).css("left")) : 0;
			positionY=$(e.target).css("top")!="auto" ? parseFloat($(e.target).css("top")) : 0;
			x = e.pageX - positionX;
			y = e.pageY - positionY;
		}
		//move event
		$(frameDocument).on("mousemove",target,function(ev){Mousemove(ev,editor,target)});
	}
	
	//fire when mouse move
	function Mousemove(e,editor,target) {
		if(isDrag==true)
		{
			var frameDocument=editor.$frame.contents().find("body");
			//prevent default event
			e.preventDefault();

			//trace mouse
			$(e.target).css({"top":e.pageY - y + "px","left":e.pageX - x + "px"});
			
			//mouse up or mouse leave event
			$(frameDocument).on("mouseup",e.target,function(ev){Mouseup(ev,editor,target)});
			$(frameDocument).on("mouseleave",target,function(ev){Mouseup(ev,editor,target)});
		}
	}

	//fire when mouse up
	function Mouseup(e,editor,target) {
		var frameDocument=editor.$frame.contents().find("body");
		//remove event handler
		$(frameDocument).off("mousemove",Mousemove);
		$(frameDocument).off("mouseleave",Mouseup);
		$(e.target).off("mouseup",Mouseup);
		isDrag=false;
		positionX=positionY="";
	}
	
	
    //==================
    // Private Functions
    //==================

    // checksum - returns a checksum using the Adler-32 method
    function checksum(text) {
        var a = 1, b = 0;
        for (var index = 0; index < text.length; ++index) {
            a = (a + text.charCodeAt(index)) % 65521;
            b = (b + a) % 65521;
        }
        return (b << 16) | a;
    }

    // clear - clears the contents of the editor
    function clear(editor) {
        editor.$area.val("");
        updateFrame(editor);
    }

    // createPopup - creates a popup and adds it to the body
    function createPopup(popupName, options, popupTypeClass, popupContent, popupHover) {

        // Check if popup already exists
        if (popups[popupName])
            return popups[popupName];

        // Create the popup
        var $popup = $(DIV_TAG)
            .hide()
            .addClass(POPUP_CLASS)
            .appendTo("body");

        // Add the content

        // Custom popup
        if (popupContent)
            $popup.html(popupContent);

        // Color
        else if (popupName === "color") {
            var colors = options.colors.split(" ");
            if (colors.length < 10)
                $popup.width("auto");
            $.each(colors, function (idx, color) {
                $(DIV_TAG).appendTo($popup)
                    .css(BACKGROUND_COLOR, "#" + color);
            });
			$($popup).append(
				'<div style="text-align:center;width:140px;height:14px;background-color:transparent">Transparent</div>'
				);//add transparent color
            popupTypeClass = COLOR_CLASS;
        }

        // Font
        else if (popupName === "font")
            $.each(options.fonts.split(","), function (idx, font) {
                $(DIV_TAG).appendTo($popup)
                    .css("fontFamily", font)
                    .html(font);
            });

        // Size
        else if (popupName === "size")
            $.each(options.sizes.split(","), function (idx, size) {
                $(DIV_TAG).appendTo($popup)
					.html('<span style="font-size:' + size + '">' + size + '</span>');// 
            });

        // Style
        else if (popupName === "style")
            $.each(options.styles, function (idx, style) {
                $(DIV_TAG).appendTo($popup)
                    .html(style[1] + style[0] + style[1].replace("<", "</"));
            });

        // URL
        else if (popupName === "url") {
            $popup.html('<label>Enter URL:<br /><input type="text" value="http://" style="width:200px" /></label><br /><input type="button" value="Submit" />');
            popupTypeClass = PROMPT_CLASS;
        }

        // Paste as Text
        else if (popupName === "pastetext") {
            $popup.html('<label>Paste your content here:<br /><textarea rows="3" style="width:200px"></textarea></label><br /><input type="button" value="Submit" />');
            popupTypeClass = PROMPT_CLASS;
        }

		//Insert table
		else if (popupName === "table") {
			$popup.html(
				'<label>Columns:<input type="text" value="4" style="width:40px"></label>&nbsp;&nbsp;' +//columns
				'<label>Rows:<input type="text" value="4" style="width:40px"></label>' +//rows
				'<br /><input type="button" value="Submit">'
			);
			//popupTypeClass = PROMPT_CLASS;
		}

		//Insert rows and columns in table
		else if (popupName === "insertrowcol") {
			$popup.html(
				'<label><input type="radio" value="front" name="insertFR" checked>Insert in front of object.</label><br>'+//insert in front of element
				'<label><input type="radio" value="rear" name="insertFR">Insert in back of object.</label><br>'+//insert in rear of element'
				'<label><input type="text" class="insertRC" value="0" style="width:40px">Insert columns</label>&nbsp;&nbsp;' +//insert columns
				'<label><input type="text" class="insertRC" value="0" style="width:40px">Insert rows</label>' +//insert rows
				'<br>Submit後にセルをクリック<br>Click taget cell after `Submit` press'+
				'<br /><input type="button" value="Submit">'
			);
			$($popup).css({"word-braek":"break-word","width":"150px"});
			popupTypeClass = PROMPT_CLASS;
		}

		//Resize cell in table
		else if (popupName === "resizecell") {
			$popup.html(
				'変更しない場合は0<br>Input `0` if you don\'t want.<br>'+//0 is no change
				'<label>Width<input type="text" class="resizeWH" value="0" style="width:40px">px</label>&nbsp;&nbsp;' +//width
				'<label>Height<input type="text" class="resizeWH" value="0" style="width:40px">px</label>' +//height
				'<br>Submit後にセルをクリック<br>Click taget cell after `Submit` press' +
				'<br /><input type="button" value="Submit">'
			);
			$($popup).css({"word-braek":"break-word","width":"150px"});
			popupTypeClass = PROMPT_CLASS;
		}

		// Custom Color for border
        else if (popupName === "borderstyle") {
			$popup.html('<label><input type="checkbox" name="bordertop" value="top" checked>Top</label>&nbsp;'+//top
				'<label><input type="checkbox" name="borderbottom" value="bottom" checked>Bottom</label><br>'+//bottom
				'<label><input type="checkbox" name="borderleft" value="left" checked>Left</label>&nbsp;'+//left
				'<label><input type="checkbox" name="borderright" value="right" checked>Right</label><br>'+//right
				
				'<label>Line style<select class="border Style" ><br>' +//line type
				'<option value="solid" selected>Solid</option>' +//solid
				'<option value="dotted">Dotted</option>' +//dotted
				'<option value="dashed">Dashed</option>' +//dashed
				'<option value="double">Double</option>' +//double
				
				'</select></label><br>' +
				'<label>Line weight<select class="border Width">' +//line width
				'<option value="1px" selected>1px</option>' +
				'<option value="2px">2px</option>' +
				'<option value="3px">3px</option>' +
				'<option value="4px">4px</option>' +
				'<option value="6px">6px</option>' +
				'<option value="10px">10px</option>' +
				'<option value="15px">15px</option>' +
				'</select></label><br>');
            var colors = options.colors.split(" ");
            if (colors.length < 10)
                $popup.width("auto");
			var colorDiv = $('<div class="cleditorColor" ></div>');
			$.each(colors, function (idx, color) {
                $(DIV_TAG).appendTo($(colorDiv))
                    .css(BACKGROUND_COLOR, "#" + color)
					.addClass("colorpicker");
            });
			$(colorDiv).append('<div class="colorpicker" style="text-align:center;width:148px;height:14px;background-color:transparent;border:1px solid black">Transparent</div>' );
			$($popup).append($(colorDiv));
			$($popup).append(
				'R<input type="number" class="rgbaColor r" min=0 max=255 style="width:4em">&nbsp;&nbsp;' +
				'G<input type="number" class="rgbaColor g" min=0 max=255 style="width:4em"><br>' +
				'B<input type="number" class="rgbaColor b" min=0 max=255 style="width:4em">&nbsp;&nbsp;' +
				'A<input type="number" class="rgbaColor a" min=0 max=1 step=0.01 style="width:4em"><br>' +
				
				'Border Color<br>' +
				'<div class="samplecolor" style="text-align:center;width:140px;height:14px;border:1px solid black"></div>' +
				'Border Image<br>' +
				'<div class="sampleimage" style="text-align:center;width:140px;height:14px;border:1px solid black;color:gray;font-size:9pt" title="Drop Image file">Drop image file to window</div>' +
				
				'<label><input type="checkbox" class="appobj" value="background-color" title="Use border-color instead of image which was invalid value." checked>Border color ON</label><br>' + //Enable background color 
				'<label><input type="checkbox" class="appobj" value="background-image" onclick="$(\'.div_image\').toggle()">' +
				'Border image ON</label><br>' + //Enable background image 

				'<div class="div_image" style="border-width:1px;border-color:green;border-style:solid;width:150px;display:none">' +
				'<div style="width:150px;padding-left:10px">' +
				'<label><input type="radio" name="imagetype" value="url" checked>ByURL</label>' +
				'<label><input type="radio" name="imagetype" value="gradient">ByGradation</label></div>' +
				
				'Slice<input type="text" class="imageOptions" name="slice" style="width:30px" value="1" title="In gradient case set 1 usually. In URL case specify slice width for nine regions."><br>' +
				'Width<input type="text" class="imageOptions" name="width" style="width:90px" title="Top Right Bottom Left[px]" value="1px 1px 1px 1px"><br>' +
				'Outset<input type="text" class="imageOptions" name="outset" style="width:90px" title="Top Right Bottom Left[px]" value="0px 0px 0px 0px"><br>' + 
				'Repeat<select name="repeat" class="imageOptions" value="repeat" style="width:90px"><option value="repeat" selected>Repeat</option>' +
				'<option value="no-repeat">No repeat</option>' +
				'<option value="round">Round</option>' +
				'<option value="stretch">Stretch</option>' +
				'<option value="space">Space</option></select><br>' +
				
				'<div style="background-image:linear-gradient(0deg,rgba(255,0,0,0.5),rgba(0,255,0,0.5))">' +
				'Angle(Gradient only)<input type="number" name="angle" min="-360" max="360" step=1 class="imageOptions" ' +
				'value="0" title="The gradation angle.[Clockwise] 0 deg is bottom to top." style="width:60px">degrees<br>' +
				'Colors(Gradient only)<input type="text" name="colors" class="imageOptions" value="red,green,blue"><br>' +
				'</div></div>' +
				
				//'<label style="display:block">Sample&nbsp;<hr class="bordersample" style="display:inline-block;border-style:solid;border-width:0px;border-top-width:1px;border-color:black;width:50px"></label>' +
				//'<label style="display:block">Sample&nbsp;<table class="bordersample" '+
				'Sample<br><table style="border-collapse:border-collapse;"><tr><td class="bordersample" '+
				'style="border-style:solid;border-width:1px;border-color:black;width:90px;height:10px">' +
				'</td></tr></table>' +
				'<br>Submit後に対象をクリック<br>Click taget object after `Submit` press.'+
				'<br /><input type="button" value="Submit">'				
				 );
			$($popup).css({"word-braek":"break-word","width":"150px"});
            popupTypeClass = PROMPT_CLASS;
        }
		
		//Custom color for background
		else if (popupName === "background") {
			var colors = options.colors.split(" ");
            if (colors.length < 10)
                $popup.width("auto");
			var colorDiv = $('<div class="cleditorColor" ></div>');
			$.each(colors, function (idx, color) {
                $(DIV_TAG).appendTo($(colorDiv))
                    .css(BACKGROUND_COLOR, "#" + color)
					.addClass("colorpicker");
            });
			$(colorDiv).append('<div class="colorpicker" style="text-align:center;width:148px;height:14px;background-color:transparent;border:1px solid black">Transparent</div>' );
			$($popup).append($(colorDiv));
			$($popup).append(
				'R<input type="number" class="rgbaColor r" min=0 max=255 style="width:4em">&nbsp;&nbsp;' +
				'G<input type="number" class="rgbaColor g" min=0 max=255 style="width:4em"><br>' +
				'B<input type="number" class="rgbaColor b" min=0 max=255 style="width:4em">&nbsp;&nbsp;' +
				'A<input type="number" class="rgbaColor a" min=0 max=1 step=0.01 style="width:4em"><br>' +
				'Background Color<br>' +
				'<div class="samplecolor" style="text-align:center;width:140px;height:14px;border:1px solid black"></div>' +
				'Background Image<br>' +
				'<div class="sampleimage" style="text-align:center;width:140px;height:14px;border:1px solid black;color:gray;font-size:9pt" title="Drop Image file">Drop image file to window</div>' +
				'<label><input type="checkbox" class="appobj" value="background-color" checked>Background color ON</label><br>' + //Enable background color 
				'<label><input type="checkbox" class="appobj" value="background-image" onclick="$(\'.div_image\').toggle()">' +
				'Background image ON</label><br>' + //Enable background image 
				'<div class="div_image" style="border-width:1px;border-color:green;border-style:solid;width:150px;display:none">' +
				'<div style="width:150px;padding-left:10px"><label><input type="radio" name="imagetype" value="url" checked>ByURL</label>' +
				'<label><input type="radio" name="imagetype" value="gradient">ByGradation</label></div>' + //Enable background image 
				'Repeat/Zoom<select name="repeat" class="imageOptions" value="repeat" style="width:90px"><option value="repeat" selected>Repeat</option>' +
				'<option value="no-repeat">No repeat</option>' +
				'<option value="repeat-x">Repeat only X direction</option>' +
				'<option value="repeat-y">Repeat only Y direction</option>' +
				'<option value="cover">[Cover]Fit with no margin, but image will be cut.(URL only)</option>' +
				'<option value="contain">[Contain]Fit with any margin, but image is flawless.(URL only)</select>' +
				//'<div style="border-width:1px;border-image:linear-gradient(0deg,red,blue);border-image-slice:1;border-style:solid;width:146px">' +
				'Angle(Gradient only)<input type="number" name="angle" min="-360" max="360" step=1 class="imageOptions" ' +
				'value="0" title="The gradation angle.[Clockwise] 0 deg is bottom to top." style="width:60px">degrees<br>' +
				'Colors(Gradient only)<input type="text" name="colors" class="imageOptions" value="red,green,blue"><br>' +
				'</div>' +
				
				'Smaple<br>' +
				'<div class="syncBackground" style="text-align:center;width:140px;height:14px;border:1px solid black"></div>' +
				'<br>Submit後に対象をクリック<br>Click taget object after `Submit` press.'+
				'<br><input type="button" value="Submit" class="submit"><input type="button" value="Apply to body" class=".toBody">');
			$($popup).css({"word-braek":"break-word","width":"150px"});
				popupTypeClass = PROMPT_CLASS;
		}
		
		//rotation
		else if (popupName === "rotation")
		{
			$($popup).append('X-position<br><select class="XPosition">' +
				'<option value="left">Left</option>' +
				'<option value="center" selected>Center</option>' +
				'<option value="right">Right</option></select><br>' +
				'Y-position<br><select class="YPosition">' +
				'<option value="top">Top</option>' +
				'<option value="center" selected>Center</option>' +
				'<option value="bottom">Bottom</option></select><br>' +
				'rotate(Clockwise)<br><input type="number" class="deg" value="0">[deg]<br>' +
				'<input type="button" class="apply" value="Apply">&nbsp;&nbsp;' +
				'<input type="button" class="cancel" value="Cancel">');
			$($popup).css({"background-color":"#F6F7F9","width":"150px"});
			popupTypeClass = PROMPT_CLASS;
		}
		
		//perspect
		else if (popupName === "perspect")
		{
			$($popup).append('<li style="list-style-type:none">' +
							'<ul style="padding-left:0px"><input type="button" class="toMostFront" value="To the most front"></ul>' +
							'<ul style="padding-left:0px"><input type="button" class="toFront" value="To the front"></ul>'+
							'<ul style="padding-left:0px"><input type="button" class="toBack" value="To the back"></ul>' +
							'<ul style="padding-left:0px"><input type="button" class="toMostBack" value="To the most back"></ul></li>');
		}
		
		//display body style sheet
		else if (popupName === "bodystyle") {
			$($popup).append('<textarea style="min-width:150px;height:100px" readonly></textarea><br><input type="button" value="Close">');
			popupTypeClass = PROMPT_CLASS;
		}
		
		
        // Add the popup type class name
        if (!popupTypeClass && !popupContent)
            popupTypeClass = LIST_CLASS;
        $popup.addClass(popupTypeClass);

        // Add the unselectable attribute to all items
        //if (ie) {
        //    $popup.attr(UNSELECTABLE, "on")
        //        .find("div,font,p,h1,h2,h3,h4,h5,h6")
        //        .attr(UNSELECTABLE, "on");
       // }

        // Add the hover effect to all items
        if ($popup.hasClass(LIST_CLASS) || popupHover === true)
            $popup.children().hover(hoverEnter, hoverLeave);

        // Add the popup to the array and return it
        popups[popupName] = $popup[0];
        return $popup[0];

    }

    // disable - enables or disables the editor
    function disable(editor, disabled) {

        // Update the textarea and save the state
        if (disabled) {
            editor.$area.attr(DISABLED, DISABLED);
            editor.disabled = true;
        }
        else {
            editor.$area.removeAttr(DISABLED);
            delete editor.disabled;
        }

        // Switch the iframe into design mode.
        try {
              editor.doc.designMode = !disabled ? "on" : "off";
        }
        // Firefox 1.5 throws an exception that can be ignored
        // when toggling designMode from off to on.
        catch (err) { }

        // Enable or disable the toolbar buttons
        refreshButtons(editor);

    }

    // execCommand - executes a designMode command
    function execCommand(editor, command, value, useCSS, button) {
		
        // Restore the current ie selection
        restoreRange(editor);

        // Set the styling method
		if (useCSS === undefined || useCSS === null)
			useCSS = editor.options.useCSS;
            editor.doc.execCommand("styleWithCSS", 0, useCSS.toString());
		
		var execFontSize = function (editor, size) {
			if(iege11)
			{//ie11
				editor.doc.execCommand('italic', 0, size);//dummy style
				editor.$frame.contents().find("body").html(
					editor.$frame.contents().find("body").html()
					.replace(/\<em/,'<span style="font-size:'+size+'"').replace(/em\>/,"span>"));
			}
			else
			{//chrome
				//refer from https://stackoverflow.com/questions/5868295/document-execcommand-fontsize-in-pixels
				editor.doc.execCommand('fontSize', 0, size);
				editor.$frame.contents()
					.find('[style*="font-size: -webkit-xxx-large"],font[size]').css("font-size", size);
			}

		};
				
        // Execute the command and check for error
        var inserthtml = command.toLowerCase() === "inserthtml";
		

		if (iege11 && inserthtml) {
            var selection = getSelection(editor),
			//if(selection.rangeCount!=0)
			//{
				range = selection.getRangeAt(0);
				//range.deleteContents();
				range.insertNode(range.createContextualFragment(value));
				//selection.removeAllRanges();
				selection.addRange(range);
			//}
        }
        
		//BOLD in IE11 to compatible with HTML5
		else if(iege11 && command == "bold"){
			editor.doc.execCommand(command, 0, true);
			
			editor.$frame.contents().find("body").html(
				editor.$frame.contents().find("body").html()
				.replace(/\<strong/,'<span style="font-weight: bold;"').replace(/strong\>/,"span>"));
		}
		//ITALIC in IE11 to compatible with HTML5
		else if(iege11 && command =="italic" ){
			editor.doc.execCommand(command, 0, true);
			
			editor.$frame.contents().find("body").html(
				editor.$frame.contents().find("body").html()
				.replace(/\<em/,'<span style="font-style: italic;"').replace(/em\>/,"span>"));
		}
		//STRIKE in IE11 to compatible with HTML5
		else if(iege11 && command == "strikethrough"){
			editor.doc.execCommand(command, 0, true); //selected range seems to have bug?
			
			editor.$frame.contents().find("body").html(
				editor.$frame.contents().find("body").html()
				.replace(/\<strike"/,'<s').replace(/strike\>/,"s>"));
		}
		//FONTNAME in IE11 to compatible with HTML5
		else if(iege11 && command == "fontname"){
			editor.doc.execCommand(command, 0, true);
			
			editor.$frame.contents().find("body").html(
				editor.$frame.contents().find("body").html()
				.replace(/\<font face=\"/,'<span style="font-family: ').replace(/font\>/,"span>"));
		}
		//FORECOLOR in IE11 to compatible with HTML5
		else if(iege11 && command == "forecolor"){
			editor.doc.execCommand(command, 0, true);
			
			editor.$frame.contents().find("body").html(
				editor.$frame.contents().find("body").html()
				.replace(/\<font color=\"/,'<span style="color: ').replace(/font\>/,"span>"));
		}
		//HILITECOLOR in IE11 to compatible with HTML5
		else if(iege11 && command == "hilitecolor"){
			editor.doc.execCommand(command, 0, true);
			
			editor.$frame.contents().find("body").html(
				editor.$frame.contents().find("body").html()
				.replace(/\<font/,'<span').replace(/font\>/,"span>"));
		}
		//ALIGN LEFT in IE11 to compatible with HTML5
		else if(iege11 && command == "justifyleft"){
			editor.doc.execCommand(command, 0, true);
			
			editor.$frame.contents().find("body").html(
				editor.$frame.contents().find("body").html()
				.replace(/\<p align\=\"/,'<span style="text-align:').replace(/p\>/,"span>"));
		}
		//ALIGN CENTER in IE11 to compatible with HTML5
		else if(iege11 && command == "justifycenter"){
			editor.doc.execCommand(command, 0, true);
			
			editor.$frame.contents().find("body").html(
				editor.$frame.contents().find("body").html()
				.replace(/\<p align\=\"/,'<div style="text-align:').replace(/p\>/,"span>"));
		}
		//ALIGN RIGHT in IE11 to compatible with HTML5
		else if(iege11 && command == "justifyright"){
			editor.doc.execCommand(command, 0, true);
			
			editor.$frame.contents().find("body").html(
				editor.$frame.contents().find("body").html()
				.replace(/\<p align\=\"/,'<div style="text-align:').replace(/p\>/,"span>"));
		}
		//ALIGN JUSTFY in IE11 to compatible with HTML5
		else if(iege11 && command == "justifyfull"){
			editor.doc.execCommand(command, 0, true);
			
			editor.$frame.contents().find("body").html(
				editor.$frame.contents().find("body").html()
				.replace(/\<p align\=\"/,'<div style="text-align:').replace(/p\>/,"span>"));
		}
		
		//remove format
		//refer from https://stackoverflow.com/questions/14028773/javascript-execcommandremoveformat-doesnt-strip-h2-tag
		else if(command == "removeformat"){
			editor.doc.execCommand(command, false, null);
			//for reset h1
			var select = getSelection(editor),
				container = null;
			if (select.rangeCount > 0)
				container = select.getRangeAt(0).startContainer.parentNode;
			$(container).contents().unwrap();
		}
		

        else {
            var success = true, message;
            //try { success = editor.doc.execCommand(command, 0, value || null); }
            //catch (err) { message = err.message; success = false; }
			if(command == 'fontsize') {
			  execFontSize(editor, value);
			}
			else {
			  success = editor.doc.execCommand(command, 0, value || null);
			}
			
            if (!success) {
                if ("cutcopypaste".indexOf(command) > -1)
                    showMessage(editor, "For security reasons, your browser does not support the " +
                        command + " command. Try using the keyboard shortcut or context menu instead.",
                        button);
                else
                    showMessage(editor,
                        (message ? message : "Error executing the " + command + " command."),
                        button);
            }
        }

        // Enable the buttons and update the textarea
        refreshButtons(editor);
        updateTextArea(editor, true);
        return success;

    }

	//focused -previous focus object
	function focused(editor)
	{
        return focusObj;
    }

    // focus - sets focus to either the textarea or iframe
    function focus(editor) {
        setTimeout(function () {
            if (sourceMode(editor)) editor.$area.focus();
            else editor.$frame[0].contentWindow.focus();
            refreshButtons(editor);
        }, 0);
    }

    // getRange - gets the current text range object
    function getRange(editor) {
		if (iege11)
		{
			if(getSelection(editor).rangeCount!=0)
			{
				return getSelection(editor).getRangeAt(0);
			}
			else
			{
				return false;
			}
		}
        return getSelection(editor).getRangeAt(0);
    }

    // getSelection - gets the current text range object
    function getSelection(editor) {
        //if (ie) return editor.doc.selection;
        return editor.$frame[0].contentWindow.getSelection();
    }

    // hex - returns the hex value for the passed in color string
    function hex(s) {

        // hex("rgb(255, 0, 0)") returns #FF0000
        var m = /rgba?\((\d+), (\d+), (\d+)/.exec(s);
        if (m) {
            s = (m[1] << 16 | m[2] << 8 | m[3]).toString(16);
            while (s.length < 6)
                s = "0" + s;
            return "#" + s;
        }

        // hex("#F00") returns #FF0000
        var c = s.split("");
        if (s.length === 4)
            return "#" + c[1] + c[1] + c[2] + c[2] + c[3] + c[3];

        // hex("#FF0000") returns #FF0000
        return s;

    }

    // hidePopups - hides all popups
    function hidePopups() {
        $.each(popups, function (idx, popup) {
            $(popup)
                .hide()
                .off(CLICK)
                .removeData(BUTTON);
        });
    }

    // imagesPath - returns the path to the images folder
    function imagesPath() {
        var href = $("link[href*=cleditor]").attr("href");
        return href.replace(/^(.*\/)[^\/]+$/, '$1') + "images/";
    }

    // imageUrl - Returns the css url string for a filemane
    function imageUrl(filename) {
        return "url(" + imagesPath() + filename + ")";
    }

    // refresh - creates the iframe and resizes the controls
    function refresh(editor) {

        var $main = editor.$main,
            options = editor.options;

        // Remove the old iframe
        if (editor.$frame)
            editor.$frame.remove();

        // Create a new iframe
        var $frame = editor.$frame = $('<iframe frameborder="0" src="javascript:true;" />')
            .hide()
            .appendTo($main);

        // Load the iframe document content
        var contentWindow = $frame[0].contentWindow,
          doc = editor.doc = contentWindow.document,
          $doc = $(doc);

        doc.open();
        doc.write(
            options.docType +
            '<html>' +
            ((options.docCSSFile === '') ? '' : '<head><link rel="stylesheet" type="text/css" href="' + options.docCSSFile + '" /></head>') +
            '<body style="' + options.bodyStyle + '"></body></html>'
        );
        doc.close();

        // Work around for bug in IE which causes the editor to lose
        // focus when clicking below the end of the document.
        if (iege11)
            $doc.click(function () { focus(editor); });

        // Load the content
        updateFrame(editor);

        // Bind the ie specific iframe event handlers
        if (iege11) {

            // Save the current user selection. This code is needed since IE will
            // reset the selection just after the beforedeactivate event and just
            // before the beforeactivate event.
            $doc.on("beforedeactivate beforeactivate selectionchange keypress keyup", function (e) {

                // Flag the editor as inactive
                if (e.type === "beforedeactivate")
                    editor.inactive = true;

                // Get rid of the bogus selection and flag the editor as active
                else if (e.type === "beforeactivate") {
                    if (!editor.inactive && editor.range && editor.range.length > 1)
                        editor.range.shift();
                    delete editor.inactive;
                }

                // Save the selection when the editor is active
                else if (!editor.inactive) {
                    if (!editor.range)
                        editor.range = [];
                    editor.range.unshift(getRange(editor));

                    // We only need the last 2 selections
                    while (editor.range.length > 2)
                        editor.range.pop();
                }

            });

            // Restore the text range and trigger focused event when the iframe gains focus
            $frame.focus(function () {
                restoreRange(editor);
                $(editor).triggerHandler(FOCUSED);
            });

            // Trigger blurred event when the iframe looses focus
            $frame.blur(function () {
                $(editor).triggerHandler(BLURRED);
            });

        }

        // Trigger focused and blurred events for all other browsers
        else {
            $($frame[0].contentWindow)
                .focus(function () { $(editor).triggerHandler(FOCUSED); })
                .blur(function () { $(editor).triggerHandler(BLURRED); });
        }

        // Enable the toolbar buttons and update the textarea as the user types or clicks
        $doc.click(hidePopups)
            .keydown(function (e) {
                // Prevent Internet Explorer from going to prior page when an image 
                // is selected and the backspace key is pressed.
            })
            .on("keyup mouseup", function () {
                refreshButtons(editor);
                updateTextArea(editor, true);
            });

        // Show the textarea for iPhone/iTouch/iPad or
        // the iframe when design mode is supported.
        if (iOS) editor.$area.show();
        else $frame.show();

        // Wait for the layout to finish - shortcut for $(document).ready()
        $(function () {

            var $toolbar = editor.$toolbar,
                $group = $toolbar.children("div:last"),
                wid = $main.width();

            // Resize the toolbar
            var hgt = $group.offset().top + $group.outerHeight() - $toolbar.offset().top + 1;
            $toolbar.height(hgt);

            // Resize the iframe
            hgt = (/%/.test("" + options.height) ? $main.height() : parseInt(options.height, 10)) - hgt;
            $frame.width(wid).height(hgt);

            // Resize the textarea. IE6 textareas have a 1px top
            // & bottom margin that cannot be removed using css.
            editor.$area.width(wid).height(hgt);

            // Switch the iframe into design mode if enabled
            disable(editor, editor.disabled);

            // Enable or disable the toolbar buttons
            refreshButtons(editor);

        });

    }

    // refreshButtons - enables or disables buttons based on availability
    function refreshButtons(editor) {

        // Webkit requires focus before queryCommandEnabled will return anything but false
        if (!iOS && webkit && !editor.focused) {
            editor.$frame[0].contentWindow.focus();
            window.focus();
            editor.focused = true;
        }

        // Get the object used for checking queryCommandEnabled
        var queryObj = editor.doc;

        // Loop through each button
        var inSourceMode = sourceMode(editor);
        $.each(editor.$toolbar.find("." + BUTTON_CLASS), function (idx, elem) {

            var $elem = $(elem),
                button = $.cleditor.buttons[$.data(elem, BUTTON_NAME)],
                command = button.command,
                enabled = true;
			
            // Determine the state
            if (editor.disabled)
                enabled = false;
            else if (button.getEnabled) {
                var data = {
                    editor: editor,
                    button: elem,
                    buttonName: button.name,
                    popup: popups[button.popupName],
                    popupName: button.popupName,
                    command: button.command,
                    useCSS: editor.options.useCSS
                };
                enabled = button.getEnabled(data);
                if (enabled === undefined)
                    enabled = true;
            }
            else if ((inSourceMode || iOS) && button.name !== "source") 
                enabled = false;
            else if (command && command !== "print" 
						&& command !=="textbox" && command !=="table" 
						&& command !=="insertrowcol" && command !== "resizecell" 
						&& command !=="borderstyle" && command !== "background" 
						&& command !=="bodystyle" && command !== "perspect"
						&& command !=="rotation" ) { //change
				if ((!iege11)  || command !== "inserthtml") {
                    try { enabled = queryObj.queryCommandEnabled(command); }
                    catch (err) { enabled = false; }
                }
            }
			
            // Enable or disable the button
            if (enabled) {
                $elem.removeClass(DISABLED_CLASS);
                $elem.removeAttr(DISABLED);
            }
            else {
                $elem.addClass(DISABLED_CLASS);
                $elem.attr(DISABLED, DISABLED);
            }

        });
    }

    // restoreRange - restores the current ie selection
    function restoreRange(editor) {
        if (editor.range) {
            if (iege11)
                getSelection(editor).addRange(editor.range[0]);
        }
    }

    // select - selects all the text in either the textarea or iframe
    function select(editor) {
        setTimeout(function () {
            if (sourceMode(editor)) editor.$area.select();
            else execCommand(editor, "selectall");
        }, 0);
    }

    // selectedHTML - returns the current HTML selection or and empty string
    function selectedHTML(editor) {
        restoreRange(editor);
        var range = getRange(editor);
        var layer = $("<div>")[0];
        layer.appendChild(range.cloneContents());
        var html = layer.innerHTML;
        layer = null;
        return html;
    }

    // selectedText - returns the current text selection or and empty string
    function selectedText(editor) {
        restoreRange(editor);
        return getSelection(editor).toString();
    }

    // showMessage - alert replacement
    function showMessage(editor, message, button) {
        var popup = createPopup("msg", editor.options, MSG_CLASS);
        popup.innerHTML = message;
        showPopup(editor, popup, button);
    }

    // showPopup - shows a popup
    function showPopup(editor, popup, button) {

        var offset, left, top, $popup = $(popup);

        // Determine the popup location
        if (button) {
            var $button = $(button);
            offset = $button.offset();
            left = --offset.left;
            top = offset.top + $button.height();
        }
        else {
            var $toolbar = editor.$toolbar;
            offset = $toolbar.offset();
            left = Math.floor(($toolbar.width() - $popup.width()) / 2) + offset.left;
            top = offset.top + $toolbar.height() - 2;
        }

        // Position and show the popup
        hidePopups();
        $popup.css({ left: left, top: top })
            .show();

        // Assign the popup button and click event handler
        if (button) {
            $.data(popup, BUTTON, button);
            $popup.on(CLICK, { popup: popup }, $.proxy(popupClick, editor));
        }

        // Focus the first input element if any
        setTimeout(function () {
            $popup.find(":text,textarea").eq(0).focus().select();
        }, 100);

    }

    // sourceMode - returns true if the textarea is showing
    function sourceMode(editor) {
        return editor.$area.is(":visible");
    }

    // updateFrame - updates the iframe with the textarea contents
    function updateFrame(editor, checkForChange) {

        var code = editor.$area.val(),
            options = editor.options,
            updateFrameCallback = options.updateFrame,
            $body = $(editor.doc.body);

        // Check for textarea change to avoid unnecessary firing
        // of potentially heavy updateFrame callbacks.
        if (updateFrameCallback) {
            var sum = checksum(code);
            if (checkForChange && editor.areaChecksum === sum)
                return;
            editor.areaChecksum = sum;
        }

        // Convert the textarea source code into iframe html
        var html = updateFrameCallback ? updateFrameCallback(code) : code;

        // Prevent script injection attacks by html encoding script tags
        html = html.replace(/<(?=\/?script)/ig, "&lt;");

        // Update the iframe checksum
        if (options.updateTextArea)
            editor.frameChecksum = checksum(html);

        // Update the iframe and trigger the change event
        if (html !== $body.html()) {
            $body.html(html);
            $(editor).triggerHandler(CHANGE);
        }

    }

    // updateTextArea - updates the textarea with the iframe contents
    function updateTextArea(editor, checkForChange) {

        var html = $(editor.doc.body).html(),
            options = editor.options,
            updateTextAreaCallback = options.updateTextArea,
            $area = editor.$area;

        // Check for iframe change to avoid unnecessary firing
        // of potentially heavy updateTextArea callbacks.
        if (updateTextAreaCallback) {
            var sum = checksum(html);
            if (checkForChange && editor.frameChecksum === sum)
                return;
            editor.frameChecksum = sum;
        }

        // Convert the iframe html into textarea source code
        var code = updateTextAreaCallback ? updateTextAreaCallback(html) : html;

		// insert enter code for readable
		code.replace("&#10;<br>&#10;","<br>").replace("&#10;<br />&#10;","<br>")
			.replace("<br>","&#10;<br>&#10;").replace("<br>","&#10;<br />&#10;");
		
        // Update the textarea checksum
        if (options.updateFrame)
            editor.areaChecksum = checksum(code);

        // Update the textarea and trigger the change event
        if (code !== $area.val()) {
            $area.val(code);
            $(editor).triggerHandler(CHANGE);
        }

    }
	
	//refer from 
	//https://ourcodeworld.com/articles/read/491/how-to-retrieve-images-from-the-clipboard-with-javascript-in-the-browser
	function retrieveImageFromClipboardAsBlob(pasteEvent, callback){
		if(pasteEvent.originalEvent.clipboardData == false){
			if(typeof(callback) == "function"){
				callback(undefined);
			}
		};
		
		var items=pasteEvent.originalEvent.clipboardData.items ;
		
		if(items == undefined){
			if(typeof(callback) == "function"){
				callback(undefined);
			}
		};

		// Check if image or not
		var blob;
		// Retrieve image on clipboard as blob
		if (items[0].type.indexOf("image") == -1 ) return;
		blob= items[0].getAsFile() ;
		
		if(typeof(callback) == "function"){
			callback(blob);
		}
	}
	
	//for extension command with image
	function imageToolbox(editor)
	{
		var targetImg,
			doneAry=[],
			imgSizing=editor.$main.find(".cleditorSizing");
		
		//change icon when mouse enter and leave 
		$("body").off("mouseenter").on("mouseenter",$(imgSizing),function(e){
			$(imgSizing).css("cursor","move");
			$(imgSizing).find("label").css("cursor","default");//label,radio
			$(imgSizing).find("input").css("cursor","default");//button
		})
		
		$("body").off("mouseleave").on("mouseleave",$(imgSizing),function(e){
			$(imgSizing).css("cursor","default");
			$("body").css("cursor","default");
		});
		
		//change icon on image in dragging
		editor.$frame.contents().find("body").on("dblclick","img",function(e){
			editor.$frame.contents().find("img").css("cursor","move");
		});
		
		editor.$frame.contents().find("body").on("mouseleave","img",function(e){
			editor.$frame.contents().find("img").css("cursor","default");
		});
				
		//Event:double click --- pop up resize image window 
		editor.$frame.contents().find("body").on("click","img",function(e)
		{
			if(e.originalEvent.ctrlKey==true)//ctrl
			{
				isDrag=false;//stop image dragging
				targetImg=this;
				if(positionX=="")positionX=editor.$frame.width()/2+editor.$frame.position().left;
				if(positionY=="")positionY=editor.$frame.height()/2+editor.$frame.position().top;
				$(imgSizing).css({"top":positionY+"px","left":positionY+"px"}).show();
				doneAry=[];
				$(imgSizing).find(".butCancel").prop("disabled",true);
			}
		});

		//prevent keep dragging
		editor.$main.off("mousedown")
					.on("mousedown",".cleditorSizing input,.cleditorSizing label",function(e){mup(e,editor)});

		//mouse down event to drag start
		editor.$main.find(".cleditorSizing").on("mousedown",function(e){mdown(e,editor)});

		//click apply button
		editor.$main.on("click",".butApply",function()
		{
			//memorize for cancelation
			doneAry.push($(targetImg).attr("style"));

			var radioVal=$(".cleditorSizing input[name=sizing]:checked",editor.$main).val();
			
			if(radioVal=="width")
			{
				var w=editor.$frame.contents().find("body").width();
				$(targetImg).css({"width":w+"px","height":"","zoom":""});
			}
			else if(radioVal=="height")
			{
				var h=editor.$frame.contents().find("body").height();
				$(targetImg).css({"width":"","height":h+"px","zoom":""});
			}
			else if(radioVal=="zoom")
			{
				var rate=parseFloat(editor.$main.find("input[name=zoom]").val())/100;
				
				$(targetImg).css({"width":"","height":"","-ms-zoom":rate,"zoom":rate});
			}
			else if(radioVal=="reset")
			{
				$(targetImg).css({"left":"0px","top":"0px"});
			}
			$(imgSizing).find(".butCancel").prop("disabled",false);

		});
		
		//click cancel button
		editor.$main.on("click",".butCancel",function()
		{
			var i=doneAry.length;
			$(targetImg).attr("style",doneAry[i-1]);

			if(i==1)
			{
				doneAry=[];
				$(imgSizing).find(".butCancel").prop("disabled",true);
			}
			else
			{
				doneAry.pop();
			}
		});
		
		//click close
		editor.$main.on("click",".butClose",function(){$(imgSizing).hide()});
		
		//Event:paste
		editor.$frame.contents().find("body").on('paste',function(e)
		{
			if(window.navigator.userAgent.indexOf("rv:11")==-1)
			{//chrome
				//prevent default procedure when except text/plain case
				if(e.originalEvent.clipboardData.items[0].type!="text/plain") 
				{
					e.preventDefault();
				}
				//when text/html type (already data is encoded to base64)
				if(e.originalEvent.clipboardData.items[0].type=="text/html")
				{
					var parsehtml=$.parseHTML(e.originalEvent.clipboardData.getData("text/html"));
					var base64;
					$(parsehtml).each(function(idx,item){
							if(item.nodeName=="IMG")
							{
								base64=item.src;
							}
						});
					var scrTop=editor.$frame.contents().find("body").scrollTop(),
					html='<img style="top:'+scrTop+':left:0px;position:'+editor.options.position+';zoom:1.0;" src="'+base64+'">&#10;';
					editor.doc.execCommand("inserthtml", true, html);
					return;
				}
		
				// Handle the event
				retrieveImageFromClipboardAsBlob(e, function(imageBlob){
					// If there's an image, display it in the canvas
					if(imageBlob){
						var img = new Image();
						
						//encoding by base64 via CANVAS
						var Canvas=$("<canvas></canvas>");
						var context=Canvas[0].getContext('2d');
						img.onload = function(){
							
							context.canvas.width=img.width;
							context.canvas.height=img.height;
							context.drawImage(img,0,0);
							
							var scrTop=editor.$frame.contents().find("body").scrollTop(),
								html='<img style="left:0px;top:'+scrTop+'px;zoom:1.0;position:'+editor.options.position+'" src="'
									+Canvas[0].toDataURL('image/png')+'">&#10;';
								
								editor.doc.execCommand("inserthtml", true, html);
						};
						
						var URLObj = window.URL || window.webkitURL;
						img.src = URLObj.createObjectURL(imageBlob);
					}
				})
			}
			else
			{//ie11
				//using initial IE11's clipboard event
				//callback to seek img elements
				var seek=function(){
					setTimeout(function(){
						var boolExist=false;
						editor.$frame.contents().find("img").each(function(idx,elem)
						{
							//apply style to img
							if($(elem).css("position")!="absolute")
							{
								var scrTop=editor.$frame.contents().find("body").scrollTop();
								$(elem).css({'position':editor.options.position,'top':scrTop+'px','zoom':1});
								boolExist=true;
							}
						});
						if(boolExist==false) seek();
					},100);
				}
				seek();//call
				editor.updateTextArea();//update iframe
			}
		});
		
		//Drag and Drop
		if(window.navigator.userAgent.indexOf("rv:11")==-1)
		{//chrome
			
			var frameDocument=editor.$frame.contents();
			var frameBody=editor.$frame.contents().find("body");
			//Event:drag start ---- pass to dataTransfer
			$(frameBody).on("dragstart","img",function(e)
			{
				if(e.originalEvent.dataTransfer.files.length!=0)
				{//drag image file
					draggingFile=e.originalEvent.dataTransfer;//need 'originalEvent' when use jQuery
				}
				else
				{//move image(Not file)
					//imgmdown(e);
				}
			});
			
			$(frameBody).on("dragover","img",function(e)
			{
				e.preventDefault();
				if(e.originalEvent.dataTransfer.files.length==0)
				{//move image
					//imgmmove(e);
				}
			});
			
			//Event:drop
			$(frameDocument).on("drop",function(e)
			{
				e.preventDefault();
				e.stopPropagation();
				
				if(e.originalEvent.dataTransfer.files.length!=0)
				{
					//get from dataTransfer
					var file=e.originalEvent.dataTransfer.files[0];
					var file_reader = new FileReader();//API
					
					//ater file read
					file_reader.onloadend = function(e){

						// when error occured
						if(file_reader.error) return;
						
						var scrTop=editor.$frame.contents().find("body").scrollTop(),

						html='<img style="'+scrTop+'px;left:0px;position:'+editor.options.position+';zoom:1.0" src="'+file_reader.result+'">&#10';
						editor.doc.execCommand("inserthtml", true,html);//, data.button);
						
						editor.updateTextArea();//update iframe
					}
					file_reader.readAsDataURL(file);
				}
				else
				{
					imgmup(e);
				}
			});
			
			//Event:drop and drag end 
			$(frameDocument).on("dragend",function(e)
			{
				//update source
				editor.updateTextArea();
			});
			
			///to dragable///
			
			var imgx,imgy,orimX,orimY;
			
			//mouse down event
			$(frameDocument).on("dblclick","img",imgmdown);
						
			//fire when mouse down on image
			function imgmdown(e) {
				isDrag=true;//drag flag on
				
				//get global position
				imgx=$(e.target).css("left")!="auto" ? parseInt($(e.target).css("left")) : 0;
				imgy=$(e.target).css("top")!="auto" ? parseInt($(e.target).css("top")) : 0;
				orimX=e.pageX;
				orimY=e.pageY;
				
				//move event
				$(frameDocument).off("mousemove").on("mousemove","img",imgmmove);
			}

			//fire when mouse move
			function imgmmove(e) {
				if(isDrag==true)//prevent move when double click event fire
				{
					//prevent default event
					e.preventDefault();
					
					//trace mouse
					var zoom=$(e.target).css("zoom");
					var Ximg=(e.pageX-orimX)/parseFloat(zoom)+imgx;
					var Yimg=(e.pageY-orimY)/parseFloat(zoom)+imgy;
					$(e.target).css({"top":Yimg + "px","left":Ximg + "px"});
					
					//mouse up or mouse leave event
					$(frameDocument).off("mouseup").on("mouseup",e.target,imgmup);
					$(frameDocument).off("mouseleave").on("mouseleave","img",imgmup);
				}
			}

			//fire when mouse up
			function imgmup(e) {
				//remove event handler
				$(frameDocument).off("mousemove");
				$(frameDocument).off("mouseleave");
				$(frameDocument).off("mouseup");
			}

		}
		else
		{//IE11
			//I don't know why appended iframe's body ignore drag event listener in IE11 on cleditor.
			//So,my idea are as below.
			//1. make new layer on cleditor as catch dragging file.
			//2. hide catcher's layer until dragging file enter.
			//3. after draggin file enter, prevent default event and write image on html by base64endocing.
			//4. hide catcher's layer again as NINJA.
			$(document).ready(function(e)
			{
				//waiting until DOM is ready
				var frameDocument=editor.$frame.contents(),
					frameBody=editor.$frame.contents().find("body");
				
				//make catcher layer (div element)
				var ww=editor.$main.width(),
					hh=editor.$main.height(),
					left=editor.$main.offset().left,
					top=editor.$main.offset().top;
				var divhtml="<div class='cleditorCatcher' style='position:absolute;left:"+left+"px;top:"+top+
					"px;width:"+ww+"px;height:"+hh+"px;border:red 1px solid'></div>";
				$("body").append(divhtml);
				$(".cleditorCatcher").hide();
				
				//Event:dragstart
				$(frameDocument).on("dragstart",function(e)
				{
					e.preventDefault();
					e.stopPropagation();
					if(e.originalEvent.dataTransfer.files.length!=0)
					{
						draggingFile=e.originalEvent.dataTransfer;//need 'originalEvent' when use JQuery
					}
					else
					{
						imgmdown(e);
					}
				});
				
				//Event:dragover on catcher's layer
				$(document).on("dragover",".cleditorCatcher",function(e)
				{
					e.preventDefault();
				});
				
				//Event:drop on cacher's layer
				$(document).on("drop",".cleditorCatcher",function(e)
				{
					e.preventDefault();
					e.stopPropagation();
					if(e.originalEvent.dataTransfer.files.length!=0)
					{
						//get from dataTransfer
						var file=e.originalEvent.dataTransfer.files[0];
						var file_reader = new FileReader();//API
						
						//ater file read
						file_reader.onloadend = function(e){

							// when error occur
							if(file_reader.error) return;
							
							var scrTop=$(frameBody).scrollTop();
							$(frameBody)
								.append('<img style="position:'+editor.options.position+';top:'+scrTop
									+'px;zoom:1.0" src="'+file_reader.result+'">');
							var currentHtml=$(frameBody).html();
							editor.$area.val(currentHtml);//writting textarea
							editor.updateTextArea();//update iframe
						}
						file_reader.readAsDataURL(file);
					}	
					else
					{
						imgmup(e);
					}
					$(".cleditorCatcher").hide();
				});
				
				//Event:dragenter on cleditor area
				$(document).on("dragenter",editor.$main,function(e)
				{
					$(".cleditorCatcher").show();
				});
				
				///to dragable///
				var imgx="",imgy="",orimX,orimY;
				
				//mouse down event
				$(frameDocument).on("dblclick","img",imgmdown);
							
				//fire when mouse down on image
				function imgmdown(e) {
					
					isDrag=true;//drag flag on
					if(imgx=="" && imgy=="")
					{
						imgx=$(e.target).css("left")!="auto" ? parseInt($(e.target).css("left")) : 0;
						imgy=$(e.target).css("top")!="auto" ? parseInt($(e.target).css("top")) : 0;
						orimX=e.pageX;
						orimY=e.pageY;
					}
					
					//move event
					$(frameDocument).on("mousemove","img",imgmmove);
					
				}

				//fire when mouse move
				function imgmmove(e) {
					if(isDrag==true)//prevent move when double click event fire
					{
						//prevent default event
						e.preventDefault();
						
						//trace mouse
						var Ximg=e.pageX-orimX+imgx;
						var Yimg=e.pageY-orimY+imgy;
						$(e.target).css("left",Ximg+"px");
						$(e.target).css("top",Yimg+"px");
						
						//mouse up or mouse leave event
						$(e.target).on("mouseup",imgmup);
						$(frameDocument).on("mouseleave","img",imgmup);
					}
				}

				//fire when mouse up
				function imgmup(e) {
					//remove event handler
					$(frameDocument).off("mousemove",imgmmove);
					$(frameDocument).off("mouseleave",imgmup);
					$(e.target).off("mouseup",imgmup);
					isDrag=false;
					imgx=imgy="";
				}

			});
		}
	}
	//common function when drag and drop image file for background or border.
	function dndImage(targetName,targetSample,popup)
	{
		//Drag and Drop
		var draggingFile;

		//Event:drag start ---- pass to dataTransfer
		$(document).on("dragstart",$(popup).find(".colorpicker"),function(e)
		{
			if(e.originalEvent.dataTransfer.files.length!=0)
			{//drag image file
				draggingFile=e.originalEvent.dataTransfer;//need 'originalEvent' when use JQuery
			}
		});
		
		$(document).on("dragover",$(popup).find(".colorpicker"),function(e)
		{
			e.preventDefault();
		});
		
		//Event:drop
		$(document).on("drop",popup,function(e)
		{
			e.preventDefault();
			e.stopPropagation();
			if(e.originalEvent.dataTransfer.files.length!=0)
			{	
				//get from dataTransfer
				var file=e.originalEvent.dataTransfer.files[0];
				var file_reader = new FileReader();//API
				
				//ater file read
				file_reader.onloadend = function(e){

					// when error occur
					if(file_reader.error) return;

					//hide div tag used in image drop
					if(window.navigator.userAgent.indexOf("rv:11")!=-1)$(".cleditorCatcher").hide();
					
					var imageObj=file_reader.result;
					
					//apply image to sample 
					$(popup).find(targetName).css("background-image","url('"+imageObj+"')");
					
					// Get the which positions are change
					var cb = $(popup).find(".appobj")//find("input[type=checkbox]");
				
					//switch background image visibility by checkbox
					if($(cb[1]).prop("checked")==true)
					{
						if($(popup).find(targetSample).is("table"))
							$(popup).find(targetSample).css("border-image-source","url('"+imageObj+"')");
						else
							$(popup).find(targetSample).css("background-image","url('"+imageObj+"')");
					}
					else
					{
						if($(popup).find(targetSample).is("table"))
							$(popup).find(targetSample).css("border-image-source","");
						else
							$(popup).find(targetSample).css("background-image","");
					}
				}
				file_reader.readAsDataURL(file);
			}
		});
	}

})(jQuery);
