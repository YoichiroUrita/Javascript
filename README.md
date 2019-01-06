# Javascript
plug-in about javascript/jQuery<br>
***

# <a href="http://uritajp.wixsite.com/cleditor-custom">Demonstration for customized jQuery CLEditor is here.</a>

***

# <a href="jquery.cleditor.custom.js">jquery.cleditor.custom.js</a><br>

![#f03c15](https://placehold.it/15/f03c15/000000?text=+)
<i> How different? </i>

Ver.E
<ul>
	<li> Enable to apply image to border/background with textbox, HR(border only) & body.
	<li> Enable to apply gradational color to border/background with textbox,HR(border only) ,image(border only) & body.
	<li> Enable to apply solid color to background with body.
	<li> Note:HR is hard to click. Please try few times.
</ul>

Ver.D
<ul>
	<li> Integration with <a href="#cleditor_tablecustom">jquery.cleditor.table.custom.js</a>.</li>
	<li> Unification of changing  drag-mode by double click. (<a href="#operation">See this</a>)
	<li> Enable to apply image to background with textbox.
	<li> Enable to apply color to background with textbox and image.
	<li> Enable to apply color to border with textbox and image.
	<li> Note: Application border image is still disabled.
</ul>
Ver.C
<ul>
	<li> Integration with <a href="#cleditor_textbox">jquery.cleditor.textbox.js</a>.</li>

</ul>
Ver.B
<ul>
	<li> Integration with <a href="#cleditor_image">jquery.cleditor.image.js</a>.</li>
	<li> Enable to cancel in image zooming.</li>
	<li> Enbale to reset image location.</li>
</ul>
Ver.A
<ul>
	<li> Exsisting source supports HTML5 in IE11. (Chrome already supported) <br>
		<b>IE(below 10) are NOT suported in this custom file.</b>
	</li>
	<li> Font size is selectable by pt unit. </li>
	<li> Transparent color is selectable by color pallette. </li>
	<li> Button titles are translated Japanese. (Please replace it to original word, if you want.) </li>
</ul>

![#008c15](https://placehold.it/15/008c15/000000?text=+)
<i> How to use?</i><br>
- HTML

```HTML
<script src="jquery.js"></script>
<script src="jquery.cleditor.custom.js"></script>  //put after jquery instead of original cleditor
```

- Javascript/jQuery 

```javascript
$( id of same textarea as cleditor).cleditor();  
```

<a name="operation"> - Operation </a>
  
  To draggable mode 
  - Double click turns draggable mode on object.
  - Valid objects are image, textbox and table.
  
  (This change is for simplify and prevents unexpected action)
  
  To show resize window
  - CTRL + click on image.

- Image file <br>
  put icon files on image folder as below.<br>
  
\------ jquery.cleditor.js<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- jquery.cleditor.textbox.js<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- images<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- <em>(all gif files in images folder on this repo.)</em><br>

<a href="cleditor.demo.html">Sample is here.</a>

![#ffff00](https://placehold.it/15/ffff00/000000?text=+)
<i>My environment</i>
- Windows10 
- Chrome ver.71.0.3578.98 (at 2019.1.2)
- InternetExplorer11 ver.11.472.17134.0 (Why IE11? Because of same as my office env.)
- jquery 2.2.4

![#1010ff](https://placehold.it/15/1010ff/000000?text=+)
<i> Have you any plan? </i>

I have only few ideas in this time.

<ul>
	<li> <s>Integration with below files.</s> </li>
	<li> Selectable border style with ruler <s>(HR tag)</s>. </li>
	<li> Selective way of element from 'past setting' to 'previous setting' in images and tables. </li>
</ul>


***
# <a href="jquery.cleditor.image.js" name="cleditor_image">jquery.cleditor.image.js</a><br>
<br>

![#f03c15](https://placehold.it/15/f03c15/000000?text=+)
<em> What is it? </em><br>

 This is simple plug-in for <a href="https://premiumsoftware.net/cleditor">jquery-CLEditor</a>.
 
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
# <a href="jquery.cleditor.textbox.js" name="cleditor_textbox">jquery.cleditor.textbox.js</a><br>
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
around line 770 (IE11 only) in CLEditor1.4.4<br>
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
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- images<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- <em>textbox.gif</em><br>
***
# <a href="jquery.cleditor.table.custom.js" name="cleditor_tablecustom">jquery.cleditor.table.custom.js</a><br>
<br>

![#f03c15](https://placehold.it/15/f03c15/000000?text=+)
<em> What is it? </em><br>

 The original file is genuine plug-in for <a href="https://premiumsoftware.net/cleditor">jquery-cleditor</a>.
- Custumize point <br>

1)Enable to drag. (Pseudo draggable)<br>
&nbsp;&nbsp;-> Double click on table turns drag mode on. Mouse up (or single click) turns drag mode off.

2)Enable to insert rows and columns<br>
&nbsp;&nbsp;-> Click the target cell after press submit button on pupup mini-window.

3)Enable to resize cell<br>
&nbsp;&nbsp;-> Click the target cell after press submit button on pupup mini-window.

4)Enable to change border style<br>
&nbsp;&nbsp;-> Click the target cell after press submit button on pupup mini-window.

5)Enable to change background image and color of cell<br>
&nbsp;&nbsp;-> Click the target cell after press click color or drop image file on pupup mini-window.<br>

![#008c15](https://placehold.it/15/008c15/000000?text=+)
<em> How to use?</em><br>
- HTML

```HTML
<script src="jquery.cleditor.js"></script>
<script src="jquery.cleditor.table.custom.js"></script>  //put after cleditor
```
<s>Note:IE11 display error dialog in usual drag operation.
Click after double click (keep mouse-up), and mouse-move makes error dialog not display. -- temporary correspondence</s><br>
<s>Fixed by updating jquery-2.2.3 to 2.2.4 in my enviorment.</s> -- Still unstable. Error occurs rarely. XD<br>
<s>Note:In IE11, current table vanishes when add new table. I try fix, if I could.....</s>I HATE IE11 !!!!

around line 736 (IE11 only) in CLEditor1.4.5 \[Temporaly bug fix]<br>
Inserthtml method cause this problem. So, `Paste As Text` button has same problem.<br>
Why M$ often does NOT follow W3C Standards ?

Original code

```javascript
	else if (iege11 && inserthtml) {
            var selection = getSelection(editor),
                range = selection.getRangeAt(0);
            range.deleteContents();
            range.insertNode(range.createContextualFragment(value));
            selection.removeAllRanges();
            selection.addRange(range);
        }
```

Modify code (Comment out for 2 rows)

```javascript
	else if (iege11 && inserthtml) {
            var selection = getSelection(editor),
                range = selection.getRangeAt(0);
            //range.deleteContents();
            range.insertNode(range.createContextualFragment(value));
            //selection.removeAllRanges();
            selection.addRange(range);
        }
```
- Image file <br>
  put icon files on image folder as below.<br>
  
\------ jquery.cleditor.js<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- jquery.cleditor.textbox.js<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- images<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- <em>insertrowcol.gif</em><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- <em>resizecell.gif</em><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- <em>borderstyle.gif</em><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- <em>cellcolor.gif</em><br>
