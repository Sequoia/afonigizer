<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>

  <title>Afonigizer: Pseudo-Anonymize Facebook for Screenshots</title>

  <style type="text/css">
    body {
      margin-top: 1.0em;
      background-color: #eee;
      font-family: Helvetica, Arial, FreeSans, san-serif;
      color: #000000;
    }
    #container {
      margin: 0 auto;
      width: 700px;
    }
	h1 { font-size: 3.8em; color: #000000; margin:0;
		-moz-transform:rotate(180deg);
		-webkit-transform:rotate(180deg);
		-o-transform:rotate(180deg); 
		-ms-transform:rotate(180deg);
		transform:rotate(180deg);
		text-align:center
	}
	a.marklet{
		border:solid 10px blueViolet;	
		background: lightSeaGreen;
		color: greenYellow;
		display:block;
		margin:0 auto;
		width: 240px;
		height:90px;
		font-weight:900;
		padding:5px 20px;
		font-size:72px;
		margin:50px auto;
		text-align:center;
		text-decoration:none;
	}
	a.marklet span{
		display:none;
	}
    h1 a { text-decoration: none }
    h2 { font-size: 1.5em; color: #000000; }
    h3 { text-align: center; color: #000000; }
    a { color: #000000; }
    .description { font-size: 1.2em; margin-bottom: 30px; margin-top: 30px; font-style: italic;}
    .download { float: right; }
    pre { background: #000; color: #fff; padding: 15px;}
    hr { border: 0; width: 80%; border-bottom: 1px solid #aaa}
    .footer { text-align:center; padding-top:30px; font-style: italic; }
  </style>
</head>

<body>
  <a href="https://github.com/Sequoia/afonigizer" title="Fork this project on github"><img style="position: absolute; top: 0; right: 0; border: 0;" src="assets/fork.png" alt="crude rendering of a fork" /></a>

  <div id="container">

    <h1><a title="afonigizer on github" href="https://github.com/Sequoia/afonigizer">ɹǝzıbıuoɟɐ</a></h1>

	<img style="margin:10px 0;" src="assets/trollscience.png" alt="Rage comic of the 'troll science' variety.  Trollface wants to share a screenshot of people acting stupid on facebook, but he becomes sad when faced with the prospect of having to manually scribble out the names and faces with mspaint.  Narrator suggests using the Afonigizer bookmarklet to hide the identities of facebook users in one click.  Narrator goes on to speculate that bookmarks will make millions and that mspaint will go bankrupt.  Trollface becomes lighthearted once again." />


	<a class="marklet" href='javascript:<%= marklet %>var afonigizer=afonigizer||new Afonigizer();void(afonigizer.doIt());' >AFON</a>

	<img 
		src="assets/afon_before.png" style="margin:0 auto;display:block;border:solid;"
		name="befAfter"
		onMouseOver="document.befAfter.src='assets/afon_after.png';"
		onMouseOut ="document.befAfter.src='assets/afon_before.png';"
		data-inline-styles-and-scripts-haters="https://gimmebar.com/view/4f720979300aaad10e00000e/big"
	/>
	
    <div class="footer">
			<a href="about.html">About the Project</a> <br>
      get the source code on GitHub : <a href="https://github.com/Sequoia/afonigizer">Sequoia/afonigizer</a>
    </div>

  </div>

<script type="text/javascript">
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type="text/javascript">
try {
var pageTracker = _gat._getTracker("UA-30327177-1");
pageTracker._trackPageview();
} catch(err) {}</script>
</body>
</html>
