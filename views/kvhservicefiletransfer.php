<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="icon" type="image/bmp" href="/images/favicon.ico.bmp" />
<title>KVH TVHUB Text Only - File Transfer</title>
<style>
.hideField {
    display:none;
}
</style>

<?php if(isset($extrahead)) echo $extrahead ?>

</head>

<body>
<center>
<table border="1" width="70%">
	<tr>
      <td align="center" valign="top" colspan="2" bgcolor="red" style="font-size:12pt;color:white;">
        <strong>Improper use of this tool can directly impact the system.<br />
            Only KVH-authorized technicians should use this interface.
        </strong>
      </td>
    </tr>
    <tr>
      <td align="left" valign="top" style="font-size:12pt;">
        <strong>Fetch File</strong>
      </td>
      <td style="font-size:12pt; padding-left:5px" valign="top">
	  	<div style="float:left; width:80%; height:20px">
        	<input type="text" style="width:95%" id="fileToDownload" name="fileToDownload" value="<?php echo isset($filename) ? $filename: "" ?>" />&nbsp;&nbsp;</div>
		<div style="float:left; vertical-align:auto"><input type="button" id="getFile" name="getFile" value="GET" /></div>
      </td>
    </tr>
    <tr>
      <td align="left" valign="top" style="font-size:12pt; height:40px;">
        <strong>Upload File</strong>
      </td>
      <td valign="middle" style="font-size:12pt; padding-left:5px">
        <input type="file" id="fileToUpload" name="fileToUpload" /><input type="button" id="setFile" name="setFile" value="SET" />
      </td>
    </tr>
    <tr>
      <td align="center" valign="top" colspan="3" id="response" style="font-size:12pt; height:20px;">
		<?php echo isset($response) ? $response: "" ?>
      </td>
    </tr>
    <tr id="updateOption" class="hideField">
      <td align="center" valign="top" colspan="3" style="font-size:12pt; height:20px;">
         Flash All:
        <select id="fdinYesNo">
        <option value="N">NO</option>
            <option value="Y">YES</option>
        </select>
        <input type="button" id="install_software" value="install_software" title="Click only after uploading a NEW satallite file." />
      </td>
    </tr>
</table>
</center>
<input type="hidden" id="fname" />
</body>
</html>