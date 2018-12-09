# Javascript
plug-in about javascript/jQuery<br>
***
# jquery.cleditor.image.js<br>
<br>

![#f03c15](https://placehold.it/15/f03c15/000000?text=+)
<em> What is it? </em><br>

 This is simple plug-in for <a href="https://premiumsoftware.net/cleditor">jquery-cleditor</a>.
 
- Read image file by drag and drop <br>
&nbsp;&nbsp;-> Image is encoded to **base64**.[This function does'nt work at IE11]
- Paste image by clippboard <br>
&nbsp;&nbsp;-> Image is encoded to **base64**.
- Resize image <br>
&nbsp;&nbsp;-> Resize window pop up by **double click** on image.

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

***
# jquery.cleditor.textbox.js<br>
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
