# Javascript
plug-in about javascript/jQuery<br>
***
# <a href="jquery.cleditor.image.js">jquery.cleditor.image.js</a><br>
<br>

![#f03c15](https://placehold.it/15/f03c15/000000?text=+)
<em> What is it? </em><br>

 This is simple plug-in for <a href="https://premiumsoftware.net/cleditor">jquery-cleditor</a>.
 
1) Read image file by drag and drop<br>
	-> Image is encoded to **base64**. <s> [This function doesn't work at IE11] </s><br>
	<ul>
		<li>
			<i> In IE11, Border of target flame turns red, then you can drop.</i><br>
			<i> If it's still black, then recross border line. (Almost fail to drop file if border is black)</i><br>
		</li>
		<li>
			<i> In IE11, Do NOT use jQuery-UI ,because of conflict with this. </i>
		</li>
	</ul>
2) Paste image by clippboard<br>
	-> Image is encoded to **base64**.
3) Resize image <br>
	-> Resize window pop up by **double click** on image.
4) Drag and Drop image <br>
	-> Just mouse down and move mouse on image. But, Not smooth at IE11.
		
![#008c15](https://placehold.it/15/008c15/000000?text=+)
<em> How to use?</em><br>
- HTML

```HTML
<script src="jquery.cleditor.js"></script>
<script src="jquery.cleditor.image.js"></script>  //put after cleditor
```

- Javascript/jQuery 

```javascript
$( id of same textarea as cleditor).cleditorXP();  //put after declaration of cleditor
```

Well...M$, Thanks for reduce my weekend..so, 「敢えて言おう、カスであると！(If it is dare say you scum)」by Gihren Zabi
***
# <a href="jquery.cleditor.textbox.js">jquery.cleditor.textbox.js</a><br>
<br>

![#f03c15](https://placehold.it/15/f03c15/000000?text=+)
<em> What is it? </em><br>

 This is simple plug-in for <a href="https://premiumsoftware.net/cleditor">jquery-cleditor</a>.
- Put draggabe and colorful textbox <br>
&nbsp;&nbsp;-> Double click on textbox turns drag mode on.

![#008c15](https://placehold.it/15/008c15/000000?text=+)
<em> How to use?</em><br>
- HTML

```HTML
<script src="jquery.cleditor.js"></script>
<script src="jquery.cleditor.textbox.js"></script>  //put after cleditor
```

- Javascript/jQuery <br>
~ If your browser is Internet Explorer11, then you should edit 'jquery.cleditor.js' as below OR THROW IE11 AWAY.
<br>
around line 770 (IE11 only)<br>
Original code

```javascript
  // getRange - gets the current text range object
  function getRange(editor) {
    if (ie) return getSelection(editor).createRange();
    return getSelection(editor).getRangeAt(0);
  }
```

Modify code

```javascript
  // getRange - gets the current text range object
  function getRange(editor) {
    if (ie) return getSelection(editor).createRange();
	if (iege11)                                                 // addtion (start)
	{
		if(getSelection(editor).rangeCount!=0)
		{
			return getSelection(editor).getRangeAt(0);
		}
		else
		{
			return false;
		}
	}                                                           // addtion (end)
    return getSelection(editor).getRangeAt(0);
  }
```

- Image file <br>
  put textbox.gif on image folder as below.<br>
  
\------ jquery.cleditor.js<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- jquery.cleditor.textbox.js<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- image<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- <em>textbox.gif</em><br>
***
# <a href="jquery.cleditor.table.custom.js">jquery.cleditor.table.custom.js</a><br>
<br>

![#f03c15](https://placehold.it/15/f03c15/000000?text=+)
<em> What is it? </em><br>

 The original file is genuine plug-in for <a href="https://premiumsoftware.net/cleditor">jquery-cleditor</a>.
- Custumize point <br>

1)Enable to drag. (Pseudo draggable)<br>
&nbsp;&nbsp;-> Double click on table turns drag mode on.

2)Enable to insert rows and columns<br>
&nbsp;&nbsp;-> Click the target cell after press submit button on pupup mini-window.

3)Enable to resize cell<br>
&nbsp;&nbsp;-> Click the target cell after press submit button on pupup mini-window.

![#008c15](https://placehold.it/15/008c15/000000?text=+)
<em> How to use?</em><br>
- HTML

```HTML
<script src="jquery.cleditor.js"></script>
<script src="jquery.cleditor.table.custom.js"></script>  //put after cleditor
```
<s>Note:IE11 display error dialog in usual drag operation.
Click after double click (keep mouse-up), and mouse-move makes error dialog not display. -- temporary correspondence</s><br>
<s>Fixed by updating jquery-2.2.3 to 2.2.4 in my enviorment.</s> -- Still unstable. Error occurs rarely. XD

- Image file <br>
  put icon files on image folder as below.<br>
  
\------ jquery.cleditor.js<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- jquery.cleditor.textbox.js<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- image<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- <em>insertrowcol.gif</em><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- <em>resizecell.gif</em><br>
