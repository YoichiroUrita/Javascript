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
                          "rule image link unlink | cut copy paste pastetext | print source",
            colors:       // colors in the color popup
                          "FFF FCC FC9 FF9 FFC 9F9 9FF CFF CCF FCF " +
                          "CCC F66 F96 FF6 FF3 6F9 3FF 6FF 99F F9F " +
                          "BBB F00 F90 FC6 FF0 3F3 6CC 3CF 66C C6C " +
                          "999 C00 F60 FC3 FC0 3C0 0CC 36F 63F C3C " +
                          "666 900 C60 C93 990 090 399 33F 60C 939 " +
                          "333 600 930 963 660 060 366 009 339 636 " +
                          "000 300 630 633 330 030 033 006 309 303",
            fonts:        // font names in the font popup
						  "MS PGothic,ＭＳ Ｐゴシック,Meiryo"+
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
                          "margin:4px; font:10pt Arial,Verdana; cursor:text"
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
			  "highlight,ハイライト色,hilitecolor,color,|" +
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
			  "image,画像の挿入(リンク),insertimage,url|" +
			  "link,ハイパーリンク,createlink,url|" +
			  "unlink,ハイパーリンクの解除,Remove Hyperlink,|" +
			  "cut,切り取り|" +
			  "copy,コピー|" +
			  "paste,ペースト|" +
			  "pastetext,テキストとして貼り付け,inserthtml,|" +
			  "print,印刷,print|" +
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
		sizing=$("<div id='sizing' style='background-color:#ececec;position:absolute;padding:2px'>"+
				"<b style='text-align:center;display:block'>Image resizing</b>"+
				"<label>"+
				"<input type='radio' name='sizing' value='width'>Fit with Width</input>"+
				"</label><br><label>"+
				"<input type='radio' name='sizing' value='height'>Fit with Height</input>"+
				"</label><br><label>"+
				"<input type='radio' name='sizing' value='zoom'>Zoom</input>"+
				"</label>"+
				"<input type='text' id='zoom' style='width:3em'>%<br>"+
				"<label>"+
				"<input type='radio' name='sizing' value='reset'>Reset location</input>"+
				"</label><br>"+
				
				"<input type='button' value='Apply' id='butApply'>"+ 
				"<input type='button' value='Cancel' id='butCancel'>"+ 
				"<input type='button' value='close' id='butClose'>"+ 
				"</div>");
	
    //===============
    // Initialization
    //===============

    // Expand the buttons.init string back into the buttons object
    //   and create seperate object properties for each button.
    //   e.g. buttons.size.title = "Font Size"
    $.each(buttons.init.split("|"), function (idx, button) {
        var items = button.split(","), name = items[0];
        buttons[name] = {
            stripIndex: idx,
            name: name,
            title: items[1] === "" ? name.charAt(0).toUpperCase() + name.substr(1) : items[1],
            command: items[2] === "" ? name : items[2],
            popupName: items[3] === "" ? name : items[3]
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
                if (button.stripIndex) map.backgroundPosition = button.stripIndex * -24;
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
				$("#sizing").hide();
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
        if (data.command && !execCommand(editor, data.command, data.value, data.useCSS, buttonDiv))
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
		//get relative position
		x = e.pageX - $("#sizing").get(0).offsetLeft;
		y = e.pageY - $("#sizing").get(0).offsetTop;
		
		//move event
		$(editor).off("mousemove").on("mousemove","#sizing",function(e){mmove(e,editor)});
	}
	
	//fire when mouse move
	function mmove(e,editor) {
		//prevent default event
		e.preventDefault();
		
		//trace mouse
		$("#sizing").css({"top":e.pageY - y + "px","left":e.pageX - x + "px"});
		
		//mouse up or mouse leave event
		$(editor).off("mouseup").on("mouseup","#sizing",function(e){mup(e,editor)});
		$(editor).off("mouseleave").on("mouseleave","#sizing",function(e){mup(e,editor)});
	}
	
	//fire when mouse up
	function mup(e,editor) {

		//remove event handler
		$(editor).off("mousemove","#sizing");
		$(editor).off("mouseleave","#sizing");
		$(editor).off("mouseup","#sizing");
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
				console.log(command);
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
            else if (command && command !== "print") {
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
        var layer = $("<layer>")[0];
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
		var targetImg;
		var doneAry=[];
	
		//change icon when mouse enter and leave 
		$("body").off("mouseenter").on("mouseenter","#sizing",function(e){
			$("#sizing").css("cursor","move");
			$("#sizing").find("label").css("cursor","default");//label,radio
			$("#sizing").find("input").css("cursor","default");//button
		})
		
		$("body").off("mouseleave").on("mouseleave","#sizing",function(e){
			$("#sizing").css("cursor","default");
			$("body").css("cursor","default");
		});

		editor.$frame.contents().find("body").on("mouseenter","img",function(e){
			editor.$frame.contents().find("img").css("cursor","move");
		})
		
		editor.$frame.contents().find("body").on("mouseleave","img",function(e){
			editor.$frame.contents().find("img").css("cursor","default");
		});
				
		//Event:double click --- pop up resize image window 
		editor.$frame.contents().find("body").on("dblclick","img",function(e)
		{
			isDrag=false;//stop image dragging
			targetImg=this;
			if(positionX=="")positionX=editor.$frame.width()/2+editor.$frame.position().left;
			if(positionY=="")positionY=editor.$frame.height()/2+editor.$frame.position().top;
			$("#sizing").css({"top":positionY+"px","left":positionY+"px"}).show();
			doneAry=[];
			$("#sizing").find("#butCancel").prop("disabled",true);
		});

		//prevent keep dragging
		$(document).off("mousedown")
					.on("mousedown","#sizing>input,#sizing>label",function(e){mup(e,"body")});

		//mouse down event to drag start
		$("#sizing").on("mousedown",function(e){mdown(e,"body")});

		//click apply button
		$(document).on("click","#butApply",function()		
		{
			//memorize for cancelation
			doneAry.push($(targetImg).attr("style"));

			var radioVal=$("#sizing input[name=sizing]:checked").val();
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
				var rate=parseFloat($("#zoom").val())/100;
				$(targetImg).css({"width":"","height":"","zoom":rate});
			}
			else if(radioVal=="reset")
			{
				$(targetImg).css({"left":"0px","top":"0px"});
			}
			$("#sizing").find("#butCancel").prop("disabled",false);

		});
		
		//click cancel button
		$(document).on("click","#butCancel",function()
		{
			var i=doneAry.length;
			$(targetImg).attr("style",doneAry[i-1]);

			if(i==1)
			{
				doneAry=[];
				$("#sizing").find("#butCancel").prop("disabled",true);
			}
			else
			{
				doneAry.pop();
			}
		});
		
		//click close
		$(document).on("click","#butClose",function(){$(sizing).hide()});
		
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
					html='<img style="top:'+scrTop+':left:0px;position:relative;zoom:1.0;" src="'+base64+'">&#10;';
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
								html='<img style="left:0px;top:'+scrTop+'px;zoom:1.0;position:relative" src="'
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
								$(elem).css({'position':'relative','top':scrTop+'px','zoom':1});
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
					imgmdown(e);
				}
			});
			
			$(frameBody).on("dragover","img",function(e)
			{
				e.preventDefault();
				if(e.originalEvent.dataTransfer.files.length==0)
				{//move image
					imgmmove(e);
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

						html='<img style="'+scrTop+'px;left:0px;position:relative;zoom:1.0" src="'+file_reader.result+'">&#10';
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
			$(frameBody).on("mousedown","img",imgmdown);
						
			//fire when mouse down on image
			function imgmdown(e) {
				isDrag=true;//drag flag on
				
				//get global position
				imgx=$(e.target).css("left")!="auto" ? parseInt($(e.target).css("left")) : 0;
				imgy=$(e.target).css("top")!="auto" ? parseInt($(e.target).css("top")) : 0;
				orimX=e.pageX;
				orimY=e.pageY;
				
				//move event
				$(frameBody).off("mousemove").on("mousemove","img",imgmmove);
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
					$(frameBody).off("mouseup").on("mouseup",e.target,imgmup);
					$(frameBody).off("mouseleave").on("mouseleave","img",imgmup);
				}
			}

			//fire when mouse up
			function imgmup(e) {
				//remove event handler
				$(frameBody).off("mousemove");
				$(frameBody).off("mouseleave");
				$(frameBody).off("mouseup");
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
				$(frameBody).on("dragstart",function(e)
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
				$("body").on("dragover",".cleditorCatcher",function(e)
				{
					e.preventDefault();
				});
				
				//Event:drop on cacher's layer
				$("body").on("drop",".cleditorCatcher",function(e)
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
								.append('<img style="position:relative;top:'+scrTop
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
				$("body").on("dragenter",editor.$main,function(e)
				{
					$(".cleditorCatcher").show();
				});
				
				///to dragable///
				var imgx="",imgy="",orimX,orimY;
				
				//mouse down event
				$(frameBody).on("mousedown","img",imgmdown);
							
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
					$(frameBody).on("mousemove","img",imgmmove);
					
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
						$(frameBody).on("mouseleave","img",imgmup);
					}
				}

				//fire when mouse up
				function imgmup(e) {
					//remove event handler
					$(frameBody).off("mousemove",imgmmove);
					$(frameBody).off("mouseleave",imgmup);
					$(e.target).off("mouseup",imgmup);
					isDrag=false;
					imgx=imgy="";
				}

			});
		}
	}
})(jQuery);

